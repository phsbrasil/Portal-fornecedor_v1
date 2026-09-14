/* ===== Contratos — lógica (mockup Fase 1) ===== */
(function () {
  const $ = id => document.getElementById(id);
  const contratos = [
    { n:'CT-2024-018', forn:'Órion Facilities', objeto:'Locação e higienização de uniformes', ini:'01/10/2024', fim:'30/09/2026', valor:'R$ 18.400,00/mês', adit:1, status:'A vencer' },
    { n:'CT-2025-004', forn:'Sigma Lubrificantes', objeto:'Lubrificação e manutenção de equipamentos', ini:'12/10/2025', fim:'12/10/2026', valor:'R$ 9.200,00/mês', adit:0, status:'A vencer' },
    { n:'CT-2023-051', forn:'Vega Inspeções', objeto:'Inspeção técnica de equipamentos', ini:'05/08/2023', fim:'05/08/2026', valor:'R$ 6.750,00/mês', adit:2, status:'Vencido' },
    { n:'CT-2025-022', forn:'Delta Ferragens', objeto:'Fornecimento de ferramentas e EPIs', ini:'01/03/2025', fim:'01/03/2027', valor:'R$ 4.100,00/mês', adit:0, status:'Vigente' },
    { n:'CT-2024-090', forn:'Contábil Prima', objeto:'Serviços contábeis e fiscais', ini:'01/01/2025', fim:'31/12/2027', valor:'R$ 3.500,00/mês', adit:1, status:'Vigente' },
    { n:'CT-2025-031', forn:'Órion Facilities BH', objeto:'Locação de enxoval — filial BH', ini:'01/06/2025', fim:'01/06/2027', valor:'R$ 12.900,00/mês', adit:0, status:'Vigente' }
  ];
  const badge = s => s==='Vigente' ? '<span class="badge b-ok">Vigente</span>' : s==='A vencer' ? '<span class="badge b-warn">A vencer</span>' : '<span class="badge b-danger">Vencido</span>';

  const kpi=(cls,n,l)=>'<div class="kpi '+cls+'"><span class="bar"></span><div class="n">'+n+'</div><div class="l">'+l+'</div></div>';
  $('kpis').innerHTML =
    kpi('ok', contratos.filter(c=>c.status==='Vigente').length, 'Vigentes') +
    kpi('warn', contratos.filter(c=>c.status==='A vencer').length, 'A vencer') +
    kpi('danger', contratos.filter(c=>c.status==='Vencido').length, 'Vencidos') +
    kpi('info', contratos.length, 'Total de contratos');

  function render(){
    const fs=$('fstatus').value, q=$('q').value.toLowerCase();
    const rows = contratos.filter(c => (!fs||c.status===fs) && (!q || (c.forn+' '+c.n).toLowerCase().indexOf(q)>=0));
    $('tb').innerHTML =
      '<thead><tr><th>Contrato</th><th>Fornecedor</th><th>Objeto</th><th>Início</th><th>Vigência até</th><th>Valor</th><th>Aditivos</th><th>Situação</th></tr></thead><tbody>' +
      (rows.length ? rows.map(c =>
        '<tr><td class="doc">'+c.n+'</td><td>'+c.forn+'</td><td>'+c.objeto+'</td><td>'+c.ini+'</td><td>'+c.fim+'</td><td>'+c.valor+'</td>' +
        '<td>'+(c.adit?c.adit:'—')+'</td><td>'+badge(c.status)+'</td></tr>').join('')
        : '<tr><td colspan="8" style="text-align:center;color:var(--mtx-muted);padding:1.4rem">Nenhum contrato para o filtro.</td></tr>') +
      '</tbody>';
  }
  $('fstatus').addEventListener('change', render);
  $('q').addEventListener('input', render);
  let tt; $('btnNovo').addEventListener('click', ()=>{ const t=$('toast'); t.innerHTML='Mockup: aqui abre o formulário de novo contrato (fornecedor, objeto, vigência, valor, alertas).'; t.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('show'),3200); });
  render();
})();
