# Multitex — Portal do Fornecedor (Mockup)

Protótipo navegável (Fase 1) da solução de **Gestão de Terceiros e Documentação** da Multitex, em Microsoft 365 / SharePoint. Desenvolvido pela **PHS** para validação visual e de fluxo, **tela a tela**.

> ⚠️ **Mockup de validação.** Sem ligação com dados reais e sem gravação. Os dados de exemplo são **fictícios** (anonimizados). A matriz de documentos é ilustrativa.

## Acesso

- **Entrada (mapa das telas):** [`prototipo/hub.html`](prototipo/hub.html)
- Publicado via **GitHub Pages** — veja o link em *Settings → Pages* do repositório.

## Telas

**Portal do Fornecedor (externo):** login + área do fornecedor (conformidade, documentos por família, vigências, envio de nota fiscal/medição, dados cadastrais).

**App de Gestão (interno):** Painel do Gestor, Cadastro de Fornecedor (híbrido TOTVS+365 com documentos condicionais), Contratos, Matriz de Exigência (editável), Configuração por Fornecedor (exceções à matriz), Central de Aprovações (multinível), Gestão de Acessos e Auditoria.

## Como rodar localmente

Necessário Node 22+:

```bash
cd prototipo
node server.js
# abra http://localhost:4599/hub.html
```

## Próximo marco

Aprovação do conjunto → **Fase 2**: porte para SharePoint/SPFx (framework none, Shadow DOM) com leitura ao vivo via SPHttpClient.
