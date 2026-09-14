/* ===== Gestão da Matriz de Exigência — lógica (mockup Fase 1) ===== */
(function () {
  const D = window.DADOS, $ = id => document.getElementById(id);
  const nivelLabel = { Estrategico:'Estratégico', Tatico:'Tático', Operacional:'Operacional' };
  // nomes curtos para os cabeçalhos das colunas
  const CURTO = {
    c1:'Manut. c/ Cessão MO', c2:'Transp. Subcontr.', c3:'Oper. Log. Equip.',
    c4:'Fabr./Manut. Ext.', c5:'Adm. sem Cessão', c6:'Adm. com Cessão'
  };
  // cópia de trabalho (mock: edições ficam em memória)
  const cats = D.matriz.categorias.map(c => ({...c}));
  const docs = D.matriz.documentos.map(d => ({...d, categorias:[...d.categorias]}));
  let grupos = [...D.matriz.grupos];
  let filtro = '';

  function fillGrupoFilter(){
    const sel = $('fgrupo');
    grupos.forEach(g => { const o=document.createElement('option'); o.value=g; o.textContent=g; sel.appendChild(o); });
    sel.addEventListener('change', () => { filtro = sel.value; render(); });
  }

  function render(){
    const tbl = $('matrix');
    const gruposView = grupos.filter(g => (!filtro || g===filtro) && docs.some(d => d.grupo===g));

    // cabeçalho
    let head = '<thead><tr>' +
      '<th class="doc-h">Documento</th>' +
      '<th class="info-h">Departamento</th>' +
      '<th class="info-h">Vigência</th>';
    cats.forEach(c => {
      head += '<th class="cat-h" title="' + c.nome + '"><span class="cn" contenteditable data-cat="' + c.id + '">' + (CURTO[c.id]||c.nome) + '</span>' +
        '<span class="nivmini ' + c.nivel + '">' + nivelLabel[c.nivel] + '</span></th>';
    });
    head += '<th class="info-h" style="min-width:60px"></th></tr></thead>';

    // corpo
    let body = '<tbody>';
    gruposView.forEach(g => {
      body += '<tr class="grp-h"><td colspan="' + (3+cats.length+1) + '">' + g + '</td></tr>';
      docs.filter(d => d.grupo===g).forEach(d => {
        body += '<tr data-doc="' + d.id + '">' +
          '<td class="doc-c"><div class="dn edit" contenteditable data-f="nome" data-doc="' + d.id + '">' + d.nome + '</div>' +
            (d.obs ? '<div class="obs">' + d.obs + '</div>' : '') + '</td>' +
          '<td class="info-c"><span class="edit" contenteditable data-f="departamento" data-doc="' + d.id + '">' + d.departamento + '</span></td>' +
          '<td class="info-c vig-c"><span class="edit" contenteditable data-f="vigencia" data-doc="' + d.id + '">' + d.vigencia + '</span></td>';
        cats.forEach(c => {
          const on = d.categorias.indexOf(c.id) >= 0;
          body += '<td class="cell"><button class="tgl ' + (on?'on':'') + '" data-doc="' + d.id + '" data-cat="' + c.id + '">✓</button></td>';
        });
        body += '<td class="cell"><button class="icon-btn" title="Remover documento" data-del="' + d.id + '">✕</button></td>';
      });
    });
    // totais
    body += '<tr class="tot-r"><td class="doc-c">Total obrigatórios</td><td></td><td></td>';
    cats.forEach(c => {
      const n = docs.filter(d => d.categorias.indexOf(c.id)>=0).length;
      body += '<td>' + n + '</td>';
    });
    body += '<td></td></tr></tbody>';

    tbl.innerHTML = head + body;
    wire();
  }

  function wire(){
    document.querySelectorAll('.tgl').forEach(b => b.addEventListener('click', () => {
      const d = docs.find(x => x.id===b.dataset.doc);
      const i = d.categorias.indexOf(b.dataset.cat);
      if(i>=0) d.categorias.splice(i,1); else d.categorias.push(b.dataset.cat);
      render();
    }));
    document.querySelectorAll('.edit').forEach(el => el.addEventListener('blur', () => {
      const d = docs.find(x => x.id===el.dataset.doc);
      if(d){ d[el.dataset.f] = el.textContent.trim(); toast('Alteração registrada (mock).'); }
    }));
    document.querySelectorAll('.cn[contenteditable]').forEach(el => el.addEventListener('blur', () => {
      const c = cats.find(x => x.id===el.dataset.cat);
      if(c){ CURTO[c.id] = el.textContent.trim(); toast('Categoria renomeada (mock).'); }
    }));
    document.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
      const idx = docs.findIndex(x => x.id===b.dataset.del);
      if(idx>=0 && confirm('Remover "' + docs[idx].nome + '" da matriz?')){ docs.splice(idx,1); render(); toast('Documento removido (mock).'); }
    }));
  }

  // ---------- modal novo documento ----------
  function openDocModal(){
    const opGrupos = grupos.map(g => '<option>'+g+'</option>').join('');
    const opCats = cats.map(c => '<label><input type="checkbox" value="'+c.id+'"> '+(CURTO[c.id]||c.nome)+'</label>').join('');
    $('modalMount').innerHTML =
      '<div class="modal-bg"><div class="modal">' +
        '<div class="hd">Novo tipo de documento</div>' +
        '<div class="bd">' +
          '<div class="full"><label>Nome do documento</label><input id="m_nome" placeholder="Ex.: Certidão XYZ"></div>' +
          '<div><label>Grupo / família</label><select id="m_grupo">'+opGrupos+'</select></div>' +
          '<div><label>Departamento responsável</label><select id="m_dep"><option>Fiscal</option><option>Departamento Pessoal (DP)</option><option>SESMT/Segurança do Trabalho</option><option>Suprimentos</option><option>Engenharia</option></select></div>' +
          '<div><label>Vigência</label><input id="m_vig" placeholder="Ex.: 90 dias / 12 meses"></div>' +
          '<div><label>Observações</label><input id="m_obs" placeholder="Opcional"></div>' +
          '<div class="cats"><span style="width:100%;font-size:.8rem;font-weight:700">Obrigatório para as categorias:</span>'+opCats+'</div>' +
        '</div>' +
        '<div class="ft"><button class="btn-ghost" id="m_cancel">Cancelar</button><button class="btn-primary" id="m_save">Adicionar</button></div>' +
      '</div></div>';
    $('m_cancel').addEventListener('click', closeModal);
    $('m_save').addEventListener('click', () => {
      const nome = $('m_nome').value.trim();
      if(!nome){ toast('Informe o nome do documento.'); return; }
      const sel = [...document.querySelectorAll('.modal .cats input:checked')].map(i=>i.value);
      const grupo = $('m_grupo').value;
      docs.push({ id:'d'+Date.now(), grupo, nome, departamento:$('m_dep').value, vigencia:$('m_vig').value||'—', obs:$('m_obs').value.trim(), categorias:sel });
      if(grupos.indexOf(grupo)<0) grupos.push(grupo);
      closeModal(); render(); toast('Documento <b>'+nome+'</b> adicionado à matriz (mock).');
    });
  }
  function closeModal(){ $('modalMount').innerHTML=''; }

  $('btnDoc').addEventListener('click', openDocModal);
  $('btnCat').addEventListener('click', () => toast('Mockup: aqui abre o cadastro de nova categoria (nome + nível).'));

  // ---------- toast ----------
  let tt; function toast(m){ const t=$('toast'); t.innerHTML=m; t.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('show'),3000); }

  fillGrupoFilter(); render();
})();
