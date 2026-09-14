/* ===== Configuração por Fornecedor — lógica (mockup Fase 1) ===== */
(function () {
  const D = window.DADOS, $ = id => document.getElementById(id);
  const nivelLabel = { Estrategico:'Estratégico', Tatico:'Tático', Operacional:'Operacional' };
  // categoria default por fornecedor (mock)
  const catFor = { '000005':'c6','000006':'c6','000003':'c4','000004':'c4','000007':'c5','000002':'c5','000008':'c3' };
  let atual = null;           // fornecedor selecionado
  let cat = null;             // categoria
  const estado = {};          // por fornecedor: {dispensados:Set, incluidos:[], vig:{}}

  D.fornecedores.forEach(f => {
    const o = document.createElement('option'); o.value=f.cod; o.textContent = f.cod+' — '+f.nomeFantasia; $('fornSel').appendChild(o);
  });

  $('fornSel').addEventListener('change', () => {
    atual = D.fornecedores.find(f => f.cod === $('fornSel').value);
    if(!atual){ $('painel').classList.add('hidden'); $('catInfo').value=''; return; }
    cat = D.matriz.categorias.find(c => c.id === (catFor[atual.cod]||'c5'));
    $('catInfo').value = cat.nome + ' · ' + nivelLabel[cat.nivel];
    if(!estado[atual.cod]) estado[atual.cod] = { dispensados:new Set(), incluidos:[], vig:{} };
    $('p_gestor').value = 'Suprimentos';
    $('painel').classList.remove('hidden');
    renderDocs();
  });

  function docsAplicaveis(){
    const st = estado[atual.cod];
    const base = D.matriz.documentos.filter(d => d.categorias.indexOf(cat.id)>=0).map(d => ({...d, origem:'Matriz'}));
    const extra = st.incluidos.map(id => { const d = D.matriz.documentos.find(x=>x.id===id); return d?{...d, origem:'Extra'}:null; }).filter(Boolean);
    return base.concat(extra);
  }

  function renderDocs(){
    const st = estado[atual.cod];
    const docs = docsAplicaveis();
    const box = $('docs');
    let html = '<div class="reqhead"><div class="count">'+docs.length+' documentos · '+st.dispensados.size+' dispensados · '+st.incluidos.length+' extras</div>' +
      '<span class="hint">Dispensar remove a exigência só para este fornecedor. Vigência pode ser sobrescrita.</span></div>';
    D.matriz.grupos.filter(g=>docs.some(d=>d.grupo===g)).forEach(g => {
      html += '<div class="reqgrp"><span class="gt">'+g+'</span>';
      docs.filter(d=>d.grupo===g).forEach(d => {
        const disp = st.dispensados.has(d.id);
        const vig = st.vig[d.id] || d.vigencia;
        html += '<div class="reqitem" style="'+(disp?'opacity:.5':'')+'">' +
          '<div><div class="nm">'+d.nome+' '+(d.origem==='Extra'?'<span class="origem o365" style="font-size:.6rem">Extra</span>':'')+'</div>' +
          '<div class="mt">'+d.departamento+'</div></div>' +
          '<div style="display:flex;align-items:center;gap:.5rem">' +
            '<input class="vigin" data-id="'+d.id+'" value="'+vig+'" style="width:130px;border:1.5px solid var(--mtx-line);border-radius:8px;padding:.3rem .5rem;font-size:.78rem'+(disp?';text-decoration:line-through':'')+'">' +
            '<button class="btn-sm '+(disp?'':'')+'" data-disp="'+d.id+'">'+(disp?'Reativar':'Dispensar')+'</button>' +
          '</div></div>';
      });
      html += '</div>';
    });
    box.innerHTML = html;
    box.querySelectorAll('[data-disp]').forEach(b => b.addEventListener('click', () => {
      const id=b.dataset.disp; st.dispensados.has(id)?st.dispensados.delete(id):st.dispensados.add(id); renderDocs();
    }));
    box.querySelectorAll('.vigin').forEach(inp => inp.addEventListener('change', () => { st.vig[inp.dataset.id]=inp.value; toast('Vigência específica registrada (mock).'); }));
  }

  $('btnIncluir').addEventListener('click', () => {
    const st = estado[atual.cod];
    const jaTem = new Set(docsAplicaveis().map(d=>d.id));
    const cand = D.matriz.documentos.filter(d => !jaTem.has(d.id));
    if(!cand.length){ toast('Todos os documentos já se aplicam a este fornecedor.'); return; }
    const nome = prompt('Incluir documento extra:\n'+cand.map((d,i)=>(i+1)+') '+d.nome).join('\n')+'\n\nDigite o número:');
    const i = parseInt(nome,10)-1;
    if(cand[i]){ st.incluidos.push(cand[i].id); renderDocs(); toast('Documento incluído para este fornecedor (mock).'); }
  });
  $('btnReset').addEventListener('click', () => { estado[atual.cod]={dispensados:new Set(),incluidos:[],vig:{}}; renderDocs(); toast('Configuração restaurada ao padrão da matriz.'); });
  $('btnSalvar').addEventListener('click', () => toast('Configuração do fornecedor salva (mock).'));

  let tt; function toast(m){ const t=$('toast'); t.innerHTML=m; t.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('show'),3000); }
})();
