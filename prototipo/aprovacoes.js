/* ===== Central de Aprovações — lógica (mockup Fase 1) ===== */
(function () {
  const $ = id => document.getElementById(id);
  let itens = [
    { forn:'Órion Facilities', item:'GFIP / eSocial dos empregados', tipo:'Documento', area:'DP', fluxo:['DP'], etapa:0, envio:'12/09/2026' },
    { forn:'Órion Facilities', item:'NF-e 004512 — R$ 18.400,00', tipo:'Nota fiscal', area:'Fiscal', fluxo:['Fiscal','Financeiro'], etapa:0, envio:'13/09/2026' },
    { forn:'Sigma Lubrificantes', item:'CRLV do equipamento', tipo:'Documento', area:'Suprimentos', fluxo:['Suprimentos'], etapa:0, envio:'11/09/2026' },
    { forn:'Vega Inspeções', item:'NF-e 004498 — R$ 6.750,00', tipo:'Nota fiscal', area:'Financeiro', fluxo:['Fiscal','Financeiro'], etapa:1, envio:'10/09/2026' },
    { forn:'Delta Ferragens', item:'ART do responsável técnico', tipo:'Documento', area:'Engenharia', fluxo:['Engenharia'], etapa:0, envio:'09/09/2026' },
    { forn:'Órion Facilities BH', item:'PGR — Programa de Gerenciamento de Riscos', tipo:'Documento', area:'SESMT', fluxo:['SESMT'], etapa:0, envio:'08/09/2026' },
    { forn:'Contábil Prima', item:'Cadastro inicial — análise financeira', tipo:'Documento', area:'Financeiro', fluxo:['Fiscal','Financeiro'], etapa:1, envio:'07/09/2026' }
  ];
  const AREAS = ['Todos','Fiscal','DP','SESMT','Financeiro','Engenharia','Suprimentos'];
  let fArea = 'Todos';

  $('areaTabs').innerHTML = AREAS.map(a => '<button class="btn-sm '+(a===fArea?'primary':'')+'" data-area="'+a+'">'+a+(a==='Todos'?'':' ('+itens.filter(i=>i.area===a).length+')')+'</button>').join('');
  $('areaTabs').querySelectorAll('[data-area]').forEach(b => b.addEventListener('click', () => { fArea=b.dataset.area; refreshTabs(); render(); }));
  function refreshTabs(){ $('areaTabs').querySelectorAll('[data-area]').forEach(b => b.className='btn-sm '+(b.dataset.area===fArea?'primary':'')); }

  function fluxoHtml(it){
    return it.fluxo.map((f,i) => '<span class="badge '+(i<it.etapa?'b-ok':i===it.etapa?'b-warn':'b-neutral')+'" style="margin-right:.2rem">'+f+'</span>').join('<span style="color:var(--mtx-muted)">→</span> ');
  }

  function render(){
    const ftipo = $('ftipo').value;
    const rows = itens.filter(i => (fArea==='Todos'||i.area===fArea) && (!ftipo||i.tipo===ftipo));
    $('tb').innerHTML =
      '<thead><tr><th>Fornecedor</th><th>Item</th><th>Tipo</th><th>Enviado em</th><th>Fluxo de aprovação</th><th>Ações</th></tr></thead><tbody>' +
      (rows.length ? rows.map((i) => {
        const idx = itens.indexOf(i);
        return '<tr><td class="doc">'+i.forn+'</td><td>'+i.item+'</td>' +
          '<td>'+(i.tipo==='Nota fiscal'?'<span class="badge b-info">Nota fiscal</span>':'<span class="badge b-neutral">Documento</span>')+'</td>' +
          '<td>'+i.envio+'</td><td>'+fluxoHtml(i)+'</td>' +
          '<td><div class="act" style="gap:.4rem"><button class="btn-ok" data-ok="'+idx+'">Aprovar</button><button class="btn-no" data-no="'+idx+'">Recusar</button></div></td></tr>';
      }).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--mtx-muted);padding:1.4rem">Nada pendente para este filtro 🎉</td></tr>') +
      '</tbody>';
    $('tb').querySelectorAll('[data-ok]').forEach(b => b.addEventListener('click', () => acao(+b.dataset.ok, true)));
    $('tb').querySelectorAll('[data-no]').forEach(b => b.addEventListener('click', () => acao(+b.dataset.no, false)));
  }

  function acao(idx, ok){
    const it = itens[idx];
    if(ok){
      if(it.etapa < it.fluxo.length-1){ it.etapa++; toast('Aprovado em <b>'+it.fluxo[it.etapa-1]+'</b> — segue para <b>'+it.fluxo[it.etapa]+'</b>.'); }
      else { itens.splice(idx,1); toast('<b>'+it.item+'</b> aprovado e registrado. Fornecedor notificado por e-mail.'); refreshTabs(); }
    } else {
      const motivo = prompt('Motivo da recusa (será enviado ao fornecedor):');
      if(motivo===null) return;
      itens.splice(idx,1); toast('<b>'+it.item+'</b> recusado. Motivo registrado na auditoria.'); refreshTabs();
    }
    render();
  }

  $('ftipo').addEventListener('change', render);
  let tt; function toast(m){ const t=$('toast'); t.innerHTML=m; t.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('show'),3400); }
  render();
})();
