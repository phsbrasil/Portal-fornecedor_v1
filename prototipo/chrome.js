/* ===== Cabeçalho/nav compartilhado do app de Gestão (mockup) ===== */
(function () {
  const NAV = [
    ['dashboard.html','Painel'],
    ['cadastro.html','Fornecedores'],
    ['contratos.html','Contratos'],
    ['matriz.html','Matriz'],
    ['config-fornecedor.html','Config. Fornecedor'],
    ['aprovacoes.html','Aprovações'],
    ['acessos.html','Acessos'],
    ['auditoria.html','Auditoria']
  ];
  const here = (location.pathname.split('/').pop() || 'hub.html').toLowerCase();
  const mount = document.getElementById('chrome');
  if (!mount) return;
  mount.innerHTML =
    '<div class="gestao-top">' +
      '<div class="left">' +
        '<a href="hub.html" style="text-decoration:none;display:flex"><img src="img/multitex-dark.png" alt="Multitex Logística" class="mtx-mark small"></a>' +
        '<span class="ttl">Gestão de Fornecedores</span>' +
      '</div>' +
      '<div class="nav">' +
        NAV.map(n => '<a href="' + n[0] + '"' + (here === n[0] ? ' class="on"' : '') + '>' + n[1] + '</a>').join('') +
        '<a href="index.html" target="_blank" style="border-left:1px solid #444;margin-left:.3rem;padding-left:.7rem">Portal ↗</a>' +
      '</div>' +
    '</div>';
})();
