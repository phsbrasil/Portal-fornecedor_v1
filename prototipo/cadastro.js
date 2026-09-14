/* ===== Cadastro de Fornecedor — lógica (mockup Fase 1) ===== */
(function () {
  const D = window.DADOS;
  const $ = id => document.getElementById(id);
  const nivelLabel = { Estrategico:'Estratégico', Tatico:'Tático', Operacional:'Operacional' };

  // ---------- stepper de aprovação ----------
  function renderStepper(){
    const steps = [
      ['Etapa 1','Cadastro','current'],
      ['Etapa 2','Análise Fiscal',''],
      ['Etapa 3','Análise Financeira',''],
      ['Etapa 4','Aprovado / Habilitado','']
    ];
    $('stepper').innerHTML = steps.map(s =>
      '<div class="step ' + s[2] + '"><div class="k">' + s[0] + '</div><div class="v">' + s[1] + '</div></div>').join('');
  }

  // ---------- TOTVS: carregar fornecedor existente ----------
  function fillTotvsSelect(){
    const sel = $('totvsSel');
    D.fornecedores.forEach(f => {
      const o = document.createElement('option');
      o.value = f.cod; o.textContent = f.cod + ' — ' + f.nomeFantasia;
      sel.appendChild(o);
    });
    sel.addEventListener('change', () => {
      const f = D.fornecedores.find(x => x.cod === sel.value);
      if(!f){ $('org1').textContent = 'Complemento 365'; $('org1').className = 'origem o365'; return; }
      $('fantasia').value = f.nomeFantasia;
      $('razao').value = f.nomeFantasia;
      $('municipio').value = f.municipio;
      $('ddd').value = f.ddd; $('tel').value = f.telefone; $('email').value = f.email;
      $('simples').value = /sim/i.test(f.simplesNacional) ? 'Sim' : 'Não';
      $('porte').value = porteMap(f.porte);
      $('org1').textContent = 'Dados TOTVS (leitura) + 365'; $('org1').className = 'origem totvs';
      toast('Fornecedor <b>' + f.nomeFantasia + '</b> carregado do TOTVS (SA2).');
    });
  }
  function porteMap(p){
    p = (p||'').toUpperCase();
    if(p.indexOf('MICRO')>=0) return 'Micro empresa';
    if(p.indexOf('PEQUENO')>=0) return 'Empresa de pequeno porte';
    if(p.indexOf('NAO OPTANTE')>=0) return 'Não optante';
    return 'Não informado';
  }

  // ---------- autofill Receita / CEP (mock) ----------
  $('btnCnpj').addEventListener('click', () => {
    if(!$('razao').value) $('razao').value = 'FORNECEDOR EXEMPLO LTDA';
    if(!$('fantasia').value) $('fantasia').value = 'Fornecedor Exemplo';
    $('logradouro').value = $('logradouro').value || 'Av. das Indústrias';
    $('bairro').value = $('bairro').value || 'Distrito Industrial';
    $('municipio').value = $('municipio').value || 'Serra';
    $('estado').value = $('estado').value || 'ES';
    toast('Dados básicos obtidos da <b>Receita</b> (consulta pública — mock).');
  });
  $('btnCep').addEventListener('click', () => {
    $('logradouro').value = 'Rodovia do Contorno';
    $('bairro').value = 'Civit II';
    $('municipio').value = 'Serra';
    $('estado').value = 'ES';
    toast('Endereço preenchido pelo <b>CEP</b> (mock).');
  });

  // ---------- categoria -> documentos condicionais ----------
  function fillCategorias(){
    const sel = $('categoria');
    D.matriz.categorias.forEach(c => {
      const o = document.createElement('option');
      o.value = c.id; o.textContent = c.nome + ' (' + nivelLabel[c.nivel] + ')';
      sel.appendChild(o);
    });
    sel.addEventListener('change', () => {
      const c = D.matriz.categorias.find(x => x.id === sel.value);
      $('nivel').value = c ? nivelLabel[c.nivel] : '';
      renderReqDocs(c);
    });
  }

  function renderReqDocs(cat){
    const box = $('reqbox');
    if(!cat){ box.innerHTML = '<div class="empty">Selecione uma <b>categoria</b> na seção 4 para ver os documentos exigidos e suas vigências.</div>'; return; }
    const docs = D.matriz.documentos.filter(d => d.categorias.indexOf(cat.id) >= 0);
    let html = '<div class="reqhead"><div class="count">' + docs.length + ' documentos obrigatórios</div>' +
      '<span class="hint">Gerado automaticamente pela matriz — o fornecedor verá estes itens no portal.</span></div>';
    D.matriz.grupos.filter(g => docs.some(d => d.grupo===g)).forEach(g => {
      html += '<div class="reqgrp"><span class="gt">' + g + '</span>';
      docs.filter(d => d.grupo===g).forEach(d => {
        html += '<div class="reqitem"><div><div class="nm">' + d.nome + '</div>' +
          '<div class="mt">' + d.departamento + (d.obs ? ' · ' + d.obs : '') + '</div></div>' +
          '<span class="vig">' + d.vigencia + '</span></div>';
      });
      html += '</div>';
    });
    box.innerHTML = html;
  }

  // ---------- ações ----------
  $('btnRascunho').addEventListener('click', () => toast('Rascunho salvo (mock).'));
  $('btnEnviar').addEventListener('click', () => {
    if(!$('categoria').value){ toast('Selecione a <b>categoria</b> antes de enviar.'); return; }
    toast('Cadastro enviado para <b>Análise Fiscal</b> (mock). O fornecedor receberá e-mail.');
  });

  // ---------- toast ----------
  let toastTimer;
  function toast(msg){
    const t = $('toast'); t.innerHTML = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }

  renderStepper(); fillTotvsSelect(); fillCategorias();
})();
