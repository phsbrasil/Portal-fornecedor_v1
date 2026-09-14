/* ===== Painel do Gestor — lógica (mockup Fase 1) ===== */
(function () {
  const D = window.DADOS, $ = id => document.getElementById(id);
  const catNome = id => (D.matriz.categorias.find(c => c.id === id) || {}).nome || '—';

  // mock: categoria + situação por fornecedor
  const linhas = [
    { cod:'000005', catId:'c6', conf:24, venc:3, aVencer:4, pend:11 },
    { cod:'000003', catId:'c4', conf:71, venc:0, aVencer:1, pend:1 },
    { cod:'000006', catId:'c6', conf:88, venc:0, aVencer:2, pend:1 },
    { cod:'000004', catId:'c4', conf:57, venc:1, aVencer:0, pend:2 },
    { cod:'000007', catId:'c5', conf:90, venc:0, aVencer:1, pend:0 },
    { cod:'000008', catId:'c3', conf:40, venc:2, aVencer:1, pend:3 },
    { cod:'000002', catId:'c5', conf:100, venc:0, aVencer:0, pend:0 }
  ].map(l => ({ ...l, forn: D.fornecedores.find(f => f.cod === l.cod) }));

  const aprovacoes = [
    ['Órion Facilities','GFIP / eSocial','Documento','Departamento Pessoal (DP)'],
    ['Sigma Lubrificantes','CRLV do equipamento','Documento','Suprimentos'],
    ['Vega Inspeções','NF-e 004512','Nota fiscal','Fiscal'],
    ['Órion Facilities','NF-e 004512','Nota fiscal','Fiscal'],
    ['Delta Ferragens','ART do responsável técnico','Documento','Engenharia']
  ];
  const contratos = [
    ['Órion Facilities','CT-2024-018','30/09/2026','A vencer'],
    ['Sigma Lubrificantes','CT-2025-004','12/10/2026','A vencer'],
    ['Vega Inspeções','CT-2023-051','05/08/2026','Vencido']
  ];

  // KPIs
  const totVenc = linhas.reduce((s,l)=>s+l.venc,0);
  const totAVencer = linhas.reduce((s,l)=>s+l.aVencer,0);
  const kpi = (cls,n,l)=>'<div class="kpi '+cls+'"><span class="bar"></span><div class="n">'+n+'</div><div class="l">'+l+'</div></div>';
  $('kpis').innerHTML =
    kpi('info', linhas.length, 'Fornecedores ativos') +
    kpi('warn', totAVencer, 'Documentos a vencer (30d)') +
    kpi('danger', totVenc, 'Documentos vencidos') +
    kpi('neutral', aprovacoes.length, 'Aprovações pendentes') +
    kpi('danger', contratos.filter(c=>c[3]==='Vencido').length, 'Contratos vencidos');

  // Conformidade por fornecedor
  $('tbConf').innerHTML =
    '<thead><tr><th>Fornecedor</th><th>Categoria</th><th>Conformidade</th><th>Vencidos</th><th>A vencer</th><th>Pendentes</th></tr></thead><tbody>' +
    linhas.map(l => {
      const cls = l.conf>=80?'':(l.conf>=50?'warn':'danger');
      return '<tr><td class="doc">'+l.forn.nomeFantasia+'<div class="obs">Cód. '+l.cod+' · '+l.forn.municipio+'</div></td>' +
        '<td>'+catNome(l.catId)+'</td>' +
        '<td><div style="display:flex;align-items:center;gap:.5rem"><div class="mini-bar '+cls+'"><i style="width:'+l.conf+'%"></i></div><b>'+l.conf+'%</b></div></td>' +
        '<td>'+(l.venc?'<span class="badge b-danger">'+l.venc+'</span>':'0')+'</td>' +
        '<td>'+(l.aVencer?'<span class="badge b-warn">'+l.aVencer+'</span>':'0')+'</td>' +
        '<td>'+(l.pend?'<span class="badge b-neutral">'+l.pend+'</span>':'0')+'</td></tr>';
    }).join('') + '</tbody>';

  $('tbAprov').innerHTML =
    '<thead><tr><th>Fornecedor</th><th>Item</th><th>Área</th></tr></thead><tbody>' +
    aprovacoes.map(a => '<tr><td class="doc">'+a[0]+'</td><td>'+a[1]+'<div class="obs">'+a[2]+'</div></td><td>'+a[3]+'</td></tr>').join('') + '</tbody>';

  $('tbContr').innerHTML =
    '<thead><tr><th>Fornecedor</th><th>Contrato</th><th>Vigência até</th><th>Situação</th></tr></thead><tbody>' +
    contratos.map(c => '<tr><td class="doc">'+c[0]+'</td><td>'+c[1]+'</td><td>'+c[2]+'</td><td>'+(c[3]==='Vencido'?'<span class="badge b-danger">Vencido</span>':'<span class="badge b-warn">A vencer</span>')+'</td></tr>').join('') + '</tbody>';
})();
