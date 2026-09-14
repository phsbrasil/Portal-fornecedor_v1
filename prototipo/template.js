/* ===== Portal do Fornecedor Multitex — templates (mockup Fase 1) =====
   Vira template.ts no porte SPFx. Apenas funções que retornam HTML (sem lógica de dados). */
window.TPL = (function () {
  const ICON = {
    user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    lock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    eye:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    upload:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4m0 0-5 5m5-5 5 5"/><path d="M4 20h16"/></svg>',
    down:  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v12m0 0 5-5m-5 5-5-5"/><path d="M4 20h16"/></svg>'
  };

  function logo(small) {
    return small
      ? '<img src="img/multitex-dark.png" alt="Multitex Logística" class="mtx-mark small">'
      : '<img src="img/multitex.png" alt="Multitex Logística" class="mtx-mark">';
  }

  function loginView() {
    return '' +
    '<div class="login-wrap">' +
      '<div class="login-art"></div>' +
      '<div class="login-panel"><div class="login-card">' +
        '<div style="text-align:center">' + logo(false) +
          '<div class="mtx-tagline">Soluções logísticas com tecnologias inovadoras</div></div>' +
        '<h1>Portal do Fornecedor</h1>' +
        '<p class="sub">Acesse para enviar e acompanhar seus documentos.</p>' +
        '<div class="field"><label>E-mail</label>' +
          '<div class="input">' + ICON.user + '<input id="f-email" type="email" placeholder="seuemail@empresa.com.br" value="contato@orionfacilities.example.com"></div></div>' +
        '<div class="field"><label>Senha</label>' +
          '<div class="input">' + ICON.lock +
            '<input id="f-pass" type="password" placeholder="Sua senha" value="senha-demo-1234">' +
            '<button class="eye" id="f-eye" type="button" title="Mostrar senha">' + ICON.eye + '</button></div></div>' +
        '<a href="#" class="forgot">Esqueci minha senha</a>' +
        '<button class="btn-entrar" id="f-entrar">Entrar</button>' +
        '<div class="login-hint">Mockup de validação — sem ligação com dados reais. Clique <b>Entrar</b> para visualizar o portal do fornecedor.</div>' +
        '<div class="login-foot">© 2026 Multitex Logística</div>' +
      '</div></div>' +
    '</div>';
  }

  function kpi(cls, n, l) {
    return '<div class="kpi ' + cls + '"><span class="bar"></span><div class="n">' + n + '</div><div class="l">' + l + '</div></div>';
  }

  function badge(status) {
    const map = {
      'Validado':['b-ok','Validado'], 'A vencer':['b-warn','A vencer'],
      'Vencido':['b-danger','Vencido'], 'Em análise':['b-info','Em análise'],
      'Pendente':['b-neutral','Pendente']
    };
    const m = map[status] || ['b-neutral', status];
    return '<span class="badge ' + m[0] + '">' + m[1] + '</span>';
  }

  return { ICON, logo, loginView, kpi, badge };
})();
