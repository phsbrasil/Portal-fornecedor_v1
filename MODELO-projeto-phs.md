# Multitex — Portal do Fornecedor e Gestão de Documentos

> Documento de decisões do projeto (PHS). Preenchido em 2026-09-14.

## Trilha escolhida
**SPFx / Node 22** (webpart `.sppkg` dentro do SharePoint). Método em 2 fases:
Fase 1 = protótipo local HTML/CSS/JS (aprovação visual) → Fase 2 = porte para SPFx com leitura ao vivo.

Ambiente-padrão (config `%USERPROFILE%\.phs-dev\config.json`): Node 22 `v22.23.2`, generator SPFx `1.23.2`, .NET SDK OK. Pendente: `m365 login` (só necessário na leitura ao vivo do SharePoint).

## Objetivo
Solução para **gestão de contratos e documentações de fornecedores** da Multitex, com:
1. **App de gestão (interno)** — cadastro de fornecedor (via view SQL do TOTVS, com input posterior), cadastro de contratos, cadastro de documentos (cada um com características e vigência próprias) e gestão de acessos (níveis: total, total por grupo de segurança, operacional).
2. **Portal do Fornecedor (externo)** — site SharePoint próprio; fornecedor recebe login/senha do Entra ID e acessa sua pasta de documentos, tela de documentos validados, vigências e informações (nível leitura). Gestores têm nível controle total. Tela de configuração (gestor) por fornecedor.

Escopo comercial: portal em M365/SharePoint; cadastro e gestão de fornecedores; formulários dinâmicos; fluxos de aprovação entre áreas; armazenamento centralizado; notificações/lembretes; histórico e auditoria; preparado para integração futura com TOTVS.

**Método de execução:** validações particionais — avançar **tela a tela**, com aprovação explícita a cada etapa.

## Dados deste projeto

### Fonte 1 — View SQL de fornecedor (`VWPHS_SA2_CADPRODUTO`, TOTVS Protheus tabela SA2)
Campos retornados: `A2_COD` (código), `A2_NREDUZ` (nome fantasia), `A2_MUN` (município), `A2_DDD`+`A2_TEL` (telefone), `A2_EMAIL`, `A2_TPESSOA` (tipo pessoal), `A2_SIMPNAC` (optante Simples Nacional S/N), `A2_TPJ` (porte/tipo de empresa). Amostra: 7 fornecedores.

### Fonte 2 — Matriz Categoria × Documento (rege campos condicionais)
**6 categorias de fornecedor**, cada uma com um **nível** (Estratégico / Tático / Operacional):
- Estratégico: Manutenção c/ Cessão de Mão de Obra
- Estratégico: Transportadoras Subcontratadas da operação
- Tático: Operador Logístico com Cessão de Equipamentos
- Tático: Fabricação/Manutenção (Externo)
- Operacional: Serviços Administrativos **sem** Cessão de Mão de Obra
- Estratégico: Serviços Administrativos **com** Cessão de Mão de Obra

**~36 documentos** em 5 grupos: Fiscal/Regularidade, Trabalhista, SST/SSMA, Técnico/Operacional, Contratual/Seguros. Cada documento tem: exigível (X) por categoria, **periodicidade/vigência**, **departamento responsável** (Fiscal, DP, SESMT, Suprimentos, Engenharia) e observações.

Regra-mestra: **a categoria do fornecedor determina automaticamente quais documentos são obrigatórios e a vigência de cada um** (campo condicional dos cadastros).

## Cadastros (tabelas/listas SharePoint) percebidos — a validar
- **Fornecedores** (espelho da view SQL + campos de input próprios: categoria, nível, gestor responsável, status de habilitação)
- **Categorias de Fornecedor** (nome, nível)
- **Tipos de Documento** (nome, grupo, departamento responsável, vigência padrão, regras)
- **Matriz de Exigência** (categoria × tipo de documento → obrigatório? + vigência)
- **Contratos** (fornecedor, nº, vigência, objeto, valor, anexos)
- **Documentos do Fornecedor** (biblioteca: arquivo, tipo, fornecedor, data envio, validade/vencimento, status validação, validador, observações)
- **Configuração por Fornecedor** (parâmetros e particularidades — nível gestor)
- **Acessos / Grupos de Segurança** (níveis: total, total por grupo, operacional)
- **Log / Auditoria** (aprovações, recusas, histórico)

## Visões e entregáveis (perceber e validar tela a tela)
- **Portal do Fornecedor (externo):** Login → Dashboard (KPIs de documentos válidos/a vencer/vencidos/pendentes) → Biblioteca de documentos (pasta do fornecedor) → Documentos validados e vigências (leitura) → Envio de documento.
- **App de gestão (interno):** Cadastro de fornecedor (view SQL), contratos, documentos condicionais pela matriz, configuração por fornecedor, gestão de acessos, auditoria.

## Identidade visual (percebida do mockup de login)
Preto (`#1a1a1a`) + âmbar/dourado Multitex (`#F5A623`), logo "MULTITEX" com estrela, imagem de trilho ao pôr do sol, formas geométricas âmbar, painel off-white. Tipografia sans forte. Formatação pt-BR.

## Pendências / a fornecer
- Acesso ao portal/site SharePoint do cliente (via tela de login) — o cliente fornecerá quando solicitado.
- URL do site do app de gestão e do site do portal externo.
- Asset oficial do logo Multitex (uso do wordmark recriado no protótipo até lá).
