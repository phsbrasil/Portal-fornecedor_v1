/* ===== Portal do Fornecedor Multitex — lógica (mockup Fase 1) =====
   No porte SPFx: a parte "DataService" vira leitura ao vivo via SPHttpClient;
   a parte "render/eventos" vira render.ts dentro do shadow root. */
(function () {
  const D = window.DADOS, T = window.TPL;
  const app = document.getElementById('app');

  // ---------- DataService (mock a partir do snapshot) ----------
  const HOJE = new Date(D.portalDemo.hoje + 'T00:00:00');
  const fornecedor = D.fornecedores.find(f => f.cod === D.portalDemo.fornecedorCod);
  const categoria = D.matriz.categorias.find(c => c.id === D.portalDemo.categoriaId);

  function daysUntil(iso){ return Math.round((new Date(iso+'T00:00:00') - HOJE)/86400000); }
  function fmt(iso){ if(!iso) return '—'; const [a,m,d]=iso.split('-'); return d+'/'+m+'/'+a; }

  function statusOf(env){
    if(!env) return 'Pendente';
    if(env.status === 'Em análise') return 'Em análise';
    if(env.validade){
      const d = daysUntil(env.validade);
      if(d < 0) return 'Vencido';
      if(d <= 30) return 'A vencer';
    }
    return 'Validado';
  }

  function docRows(){
    return D.matriz.documentos
      .filter(doc => doc.categorias.indexOf(categoria.id) >= 0)
      .map(doc => {
        const env = D.portalDemo.enviados[doc.id] || null;
        return {
          id:doc.id, grupo:doc.grupo, nome:doc.nome, dep:doc.departamento,
          vigencia:doc.vigencia, obs:doc.obs,
          dataEnvio: env ? env.dataEnvio : null,
          validade: env ? env.validade : null,
          status: statusOf(env)
        };
      });
  }

  function tally(rows){
    const c = {'Validado':0,'A vencer':0,'Vencido':0,'Em análise':0,'Pendente':0};
    rows.forEach(r => c[r.status]++);
    return c;
  }

  // ---------- estado da UI ----------
  const state = { view:'login', tab:'inicio', fGrupo:'', fStatus:'', busca:'' };

  // ---------- render ----------
  function render(){
    if(state.view === 'login'){ app.innerHTML = T.loginView(); wireLogin(); return; }
    renderPortal();
  }

  function renderPortal(){
    const iniciais = (fornecedor.nomeFantasia||'?').split(' ').slice(0,2).map(s=>s[0]).join('');
    app.innerHTML = '' +
    '<div class="portal">' +
      '<div class="topbar">' +
        '<div class="left">' + T.logo(true) + '<span class="ttl">Portal do Fornecedor</span></div>' +
        '<div class="right"><div class="who"><div class="nm">' + fornecedor.nomeFantasia + '</div>' +
          '<div class="rl">Acesso do fornecedor · leitura</div></div>' +
          '<div class="avatar">' + iniciais + '</div>' +
          '<button class="btn-sair" data-action="logout">Sair</button></div>' +
      '</div>' +
      '<div class="subbar"><div class="co"><div>' +
        '<div class="nm">' + fornecedor.nomeFantasia + '</div>' +
        '<div class="meta">Cód. ' + fornecedor.cod + ' · ' + fornecedor.municipio + ' · ' + fornecedor.email + '</div>' +
      '</div></div>' +
      '<div style="text-align:right"><div class="meta" style="margin-bottom:.3rem">Categoria do fornecedor</div>' +
        '<span class="pill nivel-' + categoria.nivel + '">' + categoria.nome + ' · ' + nivelLabel(categoria.nivel) + '</span></div>' +
      '</div>' +
      tabsHtml() +
      '<div class="content" id="content"></div>' +
      '<div class="foot">© 2026 Multitex Logística · Portal do Fornecedor</div>' +
    '</div>' +
    '<div class="mock-tag">MOCKUP — validação</div>';
    renderTab();
    wirePortal();
  }

  function nivelLabel(n){ return {Estrategico:'Estratégico',Tatico:'Tático',Operacional:'Operacional'}[n]||n; }

  function tabsHtml(){
    const tabs = [['inicio','Início'],['docs','Meus Documentos'],['nf','Notas Fiscais / Medição'],['dados','Meus Dados']];
    return '<div class="tabs">' + tabs.map(t =>
      '<button class="tab ' + (state.tab===t[0]?'active':'') + '" data-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>';
  }

  function renderTab(){
    const el = document.getElementById('content');
    if(state.tab==='inicio') el.innerHTML = viewInicio();
    else if(state.tab==='docs') el.innerHTML = viewDocs();
    else if(state.tab==='nf') el.innerHTML = viewNF();
    else el.innerHTML = viewDados();
  }

  // ----- Início -----
  function viewInicio(){
    const rows = docRows(), c = tally(rows), total = rows.length;
    const conf = Math.round((c['Validado']/total)*100);
    const alertas = rows.filter(r => r.status==='Vencido' || r.status==='A vencer' || r.status==='Pendente')
      .sort((a,b)=>ord(a.status)-ord(b.status)).slice(0,8);
    return '' +
      '<div class="kpis">' +
        T.kpi('ok', c['Validado'], 'Validados') +
        T.kpi('warn', c['A vencer'], 'A vencer (30 dias)') +
        T.kpi('danger', c['Vencido'], 'Vencidos') +
        T.kpi('info', c['Em análise'], 'Em análise') +
        T.kpi('neutral', c['Pendente'], 'Pendentes de envio') +
      '</div>' +
      '<div class="card"><div class="conf">' +
        '<div class="ring" style="--p:' + conf + '" data-p="' + conf + '%"></div>' +
        '<div class="txt"><div style="font-weight:800;font-size:1.05rem">Nível de conformidade documental</div>' +
        '<small>' + c['Validado'] + ' de ' + total + ' documentos exigidos para a categoria <b>' + categoria.nome + '</b> estão validados e vigentes.</small></div>' +
      '</div></div>' +
      '<div class="card"><div class="hd"><h3>Pendências e próximos vencimentos</h3>' +
        '<button class="btn-sm primary" data-tab="docs">Ver todos os documentos</button></div>' +
        '<div class="bd"><table class="tbl"><thead><tr><th>Documento</th><th>Departamento</th><th>Validade</th><th>Situação</th><th></th></tr></thead><tbody>' +
        (alertas.length ? alertas.map(r =>
          '<tr><td class="doc">' + r.nome + '</td><td>' + r.dep + '</td><td>' + fmt(r.validade) + '</td><td>' + T.badge(r.status) + '</td>' +
          '<td class="act"><button class="btn-sm primary" data-action="enviar">' + T.ICON.upload + ' Enviar</button></td></tr>').join('')
          : '<tr><td colspan="5" style="text-align:center;color:var(--mtx-muted);padding:1.4rem">Nenhuma pendência 🎉</td></tr>') +
        '</tbody></table></div></div>';
  }
  function ord(s){ return {'Vencido':0,'A vencer':1,'Pendente':2}[s] ?? 9; }

  // ----- Documentos -----
  function viewDocs(){
    let rows = docRows();
    if(state.fStatus) rows = rows.filter(r => r.status === state.fStatus);
    if(state.fGrupo) rows = rows.filter(r => r.grupo === state.fGrupo);
    if(state.busca){ const q = state.busca.toLowerCase(); rows = rows.filter(r => r.nome.toLowerCase().indexOf(q)>=0); }

    const grupos = D.matriz.grupos.filter(g => rows.some(r => r.grupo===g));
    let body = '';
    grupos.forEach(g => {
      body += '<tr class="grp-row"><td colspan="6">' + g + '</td></tr>';
      rows.filter(r => r.grupo===g).forEach(r => {
        const podeBaixar = r.status!=='Pendente';
        body += '<tr><td><div class="doc">' + r.nome + '</div>' + (r.obs?'<div class="obs">'+r.obs+'</div>':'') + '</td>' +
          '<td>' + r.dep + '</td>' +
          '<td>' + r.vigencia + '</td>' +
          '<td>' + fmt(r.dataEnvio) + '</td>' +
          '<td>' + fmt(r.validade) + '</td>' +
          '<td>' + T.badge(r.status) + '</td></tr>';
      });
    });

    const optsGrupo = ['<option value="">Todos os grupos</option>'].concat(D.matriz.grupos.map(g=>'<option '+(state.fGrupo===g?'selected':'')+'>'+g+'</option>')).join('');
    const optsStatus = ['Validado','A vencer','Vencido','Em análise','Pendente']
      .map(s=>'<option '+(state.fStatus===s?'selected':'')+'>'+s+'</option>').join('');

    return '<div class="card"><div class="hd"><h3>Documentos exigidos — ' + categoria.nome + '</h3>' +
      '<div class="filters">' +
        '<input id="q" placeholder="Buscar documento…" value="' + esc(state.busca) + '">' +
        '<select id="fg">' + optsGrupo + '</select>' +
        '<select id="fs"><option value="">Todos os status</option>' + optsStatus + '</select>' +
      '</div></div>' +
      '<div class="bd"><table class="tbl"><thead><tr>' +
        '<th>Documento</th><th>Departamento</th><th>Vigência</th><th>Enviado em</th><th>Validade</th><th>Status</th>' +
      '</tr></thead><tbody>' + (body || '<tr><td colspan="6" style="text-align:center;color:var(--mtx-muted);padding:1.4rem">Nenhum documento para o filtro.</td></tr>') + '</tbody></table></div></div>';
  }

  // ----- Notas Fiscais / Medição -----
  function viewNF(){
    const notas = [
      ['NF-e 004512','Set/2026','R$ 18.400,00','Em análise'],
      ['NF-e 004488','Ago/2026','R$ 18.400,00','Validado'],
      ['NF-e 004455','Jul/2026','R$ 17.900,00','Validado'],
      ['NF-e 004430','Jun/2026','R$ 18.400,00','Vencido']
    ];
    return '<div class="card"><div class="hd"><h3>Envio de nota fiscal e medição do serviço</h3></div>' +
      '<div class="nf-actions"><button class="btn-amber" data-action="enviar">' + T.ICON.upload + ' Enviar nova nota fiscal</button>' +
      '<span class="meta" style="color:var(--mtx-muted);font-size:.85rem">Ao enviar, a nota passa por validação fiscal (conferência de impostos). Você recebe a resposta aqui e por e-mail.</span></div>' +
      '<div class="bd"><table class="tbl"><thead><tr><th>Nota</th><th>Competência</th><th>Valor</th><th>Situação</th></tr></thead><tbody>' +
      notas.map(n=>'<tr><td class="doc">'+n[0]+'</td><td>'+n[1]+'</td><td>'+n[2]+'</td><td>'+({'Validado':T.badge('Validado'),'Em análise':T.badge('Em análise'),'Vencido':'<span class="badge b-danger">Rejeitada</span>'}[n[3]])+'</td></tr>').join('') +
      '</tbody></table></div></div>';
  }

  // ----- Meus Dados -----
  function viewDados(){
    const f = fornecedor;
    const item = (dt,dd)=>'<div class="dl"><dt>'+dt+'</dt><dd>'+(dd||'—')+'</dd></div>';
    return '<div class="card"><div class="hd"><h3>Dados cadastrais</h3><span class="meta" style="color:var(--mtx-muted);font-size:.82rem">Origem: TOTVS (SA2) + complementos 365</span></div>' +
      '<div class="bd"><div class="grid2">' +
        item('Código', f.cod) + item('Nome fantasia', f.nomeFantasia) +
        item('Município', f.municipio) + item('Telefone', '('+f.ddd+') '+f.telefone) +
        item('E-mail', f.email) + item('Tipo pessoal', f.tipoPessoal) +
        item('Optante Simples Nacional', f.simplesNacional) + item('Porte / Tipo de empresa', f.porte) +
        item('Categoria', categoria.nome) + item('Nível', nivelLabel(categoria.nivel)) +
        item('Gestor responsável', D.portalDemo.gestorResponsavel) +
      '</div></div></div>';
  }

  function esc(s){ return (s||'').replace(/"/g,'&quot;'); }

  // ---------- eventos ----------
  function wireLogin(){
    document.getElementById('f-entrar').addEventListener('click', () => { state.view='portal'; state.tab='inicio'; render(); });
    const eye = document.getElementById('f-eye');
    eye.addEventListener('click', () => {
      const p = document.getElementById('f-pass'); p.type = p.type==='password' ? 'text' : 'password';
    });
  }

  function wirePortal(){
    app.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => { state.tab = b.getAttribute('data-tab'); state.fGrupo=''; state.fStatus=''; state.busca=''; renderTabAndTabs(); }));
    const logout = app.querySelector('[data-action=logout]');
    if(logout) logout.addEventListener('click', () => { state.view='login'; render(); });
    bindDocFilters();
    app.querySelectorAll('[data-action=enviar]').forEach(b => b.addEventListener('click', () => {
      alert('Mockup: aqui abre o envio de arquivo (upload para a biblioteca do fornecedor no SharePoint).');
    }));
  }

  function renderTabAndTabs(){
    // atualiza barra de abas (classe active) e conteúdo
    const bar = app.querySelector('.tabs');
    bar.outerHTML = tabsHtml();
    renderTab();
    wirePortal();
  }

  function bindDocFilters(){
    const q = document.getElementById('q'), fg = document.getElementById('fg'), fs = document.getElementById('fs');
    if(fg) fg.addEventListener('change', () => { state.fGrupo = fg.value; renderTab(); wirePortal(); });
    if(fs) fs.addEventListener('change', () => { state.fStatus = fs.value; renderTab(); wirePortal(); });
    if(q) q.addEventListener('input', () => {
      state.busca = q.value; renderTab(); wirePortal();
      const nq = document.getElementById('q'); if(nq){ nq.focus(); nq.setSelectionRange(nq.value.length,nq.value.length); }
    });
  }

  render();
})();
