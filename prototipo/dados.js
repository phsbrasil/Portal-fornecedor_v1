window.DADOS = {
  "_meta": {
    "descricao": "Snapshot de dados para o protótipo local (Fase 1) do Portal do Fornecedor Multitex.",
    "geradoEm": "2026-09-14",
    "fontes": ["VWPHS_SA2_CADPRODUTO (TOTVS SA2)", "Matriz_categoria_documento_fornecedores.xlsx"]
  },
  "fornecedores": [
    { "cod": "000002", "nomeFantasia": "Norte Serviços", "municipio": "Vitória", "ddd": "027", "telefone": "3200-1000", "email": "contato@norteservicos.example.com", "tipoPessoal": "NÃO INFORMADO", "simplesNacional": "NÃO", "porte": "NÃO INFORMADO" },
    { "cod": "000003", "nomeFantasia": "Delta Ferragens", "municipio": "Serra", "ddd": "027", "telefone": "3079-2000", "email": "vendas@deltaferragens.example.com", "tipoPessoal": "NÃO INFORMADO", "simplesNacional": "NÃO", "porte": "NÃO INFORMADO" },
    { "cod": "000004", "nomeFantasia": "Vega Inspeções", "municipio": "Belo Horizonte", "ddd": "031", "telefone": "3400-3000", "email": "contato@vegainspec.example.com", "tipoPessoal": "PRESTAÇÃO DE SERVIÇO", "simplesNacional": "NÃO", "porte": "MICRO EMPRESA" },
    { "cod": "000005", "nomeFantasia": "Órion Facilities", "municipio": "Serra", "ddd": "027", "telefone": "3228-4000", "email": "contato@orionfacilities.example.com", "tipoPessoal": "NÃO INFORMADO", "simplesNacional": "NÃO", "porte": "NÃO INFORMADO" },
    { "cod": "000006", "nomeFantasia": "Órion Facilities BH", "municipio": "Belo Horizonte", "ddd": "031", "telefone": "3306-5000", "email": "bh@orionfacilities.example.com", "tipoPessoal": "NÃO INFORMADO", "simplesNacional": "NÃO", "porte": "NÃO OPTANTE" },
    { "cod": "000007", "nomeFantasia": "Contábil Prima", "municipio": "Belo Horizonte", "ddd": "031", "telefone": "3422-6000", "email": "contato@contabilprima.example.com", "tipoPessoal": "PRESTAÇÃO DE SERVIÇO", "simplesNacional": "SIM", "porte": "MICRO EMPRESA" },
    { "cod": "000008", "nomeFantasia": "Sigma Lubrificantes", "municipio": "Arcos", "ddd": "037", "telefone": "3351-7000", "email": "contato@sigmalub.example.com", "tipoPessoal": "NÃO INFORMADO", "simplesNacional": "NÃO", "porte": "NÃO INFORMADO" }
  ],
  "matriz": {
    "niveis": {
      "Estrategico": "Fornecem algo essencial e difícil de substituir. Impacto grande se falham; relação de longo prazo, contratos detalhados, acompanhamento próximo (SLA, auditorias, contingência).",
      "Tatico": "Importância intermediária. Há alternativos, mas trocar dá trabalho. Exigem negociação e revisão periódica.",
      "Operacional": "Itens/serviços do dia a dia, baixo risco, fácil de substituir. Compra padronizada e recorrente; foco em eficiência e preço."
    },
    "categorias": [
      { "id": "c1", "nome": "Manutenção c/ Cessão de Mão de Obra", "nivel": "Estrategico" },
      { "id": "c2", "nome": "Transportadoras Subcontratadas da operação", "nivel": "Estrategico" },
      { "id": "c3", "nome": "Operador Logístico com Cessão de Equipamentos", "nivel": "Tatico" },
      { "id": "c4", "nome": "Fabricação/Manutenção (Externo)", "nivel": "Tatico" },
      { "id": "c5", "nome": "Serviços Administrativos sem Cessão de Mão de Obra", "nivel": "Operacional" },
      { "id": "c6", "nome": "Serviços Administrativos com Cessão de Mão de Obra", "nivel": "Estrategico" }
    ],
    "grupos": ["Fiscal / Regularidade", "Trabalhista", "Segurança e Saúde no Trabalho (SST/SSMA)", "Técnico / Operacional", "Contratual / Seguros"],
    "documentos": [
      { "id": "d01", "grupo": "Fiscal / Regularidade", "nome": "CND Federal (débitos federais)", "categorias": ["c1","c2","c4","c5","c6"], "vigencia": "90 dias", "vigenciaDias": 90, "departamento": "Fiscal", "obs": "" },
      { "id": "d02", "grupo": "Fiscal / Regularidade", "nome": "CND Municipal", "categorias": ["c1","c2","c5","c6"], "vigencia": "90 dias", "vigenciaDias": 90, "departamento": "Fiscal", "obs": "" },
      { "id": "d03", "grupo": "Fiscal / Regularidade", "nome": "CND Estadual", "categorias": ["c1","c2","c5","c6"], "vigencia": "90 dias", "vigenciaDias": 90, "departamento": "Fiscal", "obs": "" },
      { "id": "d04", "grupo": "Fiscal / Regularidade", "nome": "CRF - Certificado de Regularidade do FGTS", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d05", "grupo": "Fiscal / Regularidade", "nome": "CNDT - Certidão Negativa de Débitos Trabalhistas", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d06", "grupo": "Fiscal / Regularidade", "nome": "Contrato Social e alterações (atualizados)", "categorias": ["c1","c2","c3","c4","c5","c6"], "vigencia": "90 dias", "vigenciaDias": 90, "departamento": "Fiscal", "obs": "" },
      { "id": "d07", "grupo": "Fiscal / Regularidade", "nome": "Cartão CNPJ", "categorias": ["c1","c2","c3","c4","c5","c6"], "vigencia": "90 dias", "vigenciaDias": 90, "departamento": "Fiscal", "obs": "" },
      { "id": "d08", "grupo": "Fiscal / Regularidade", "nome": "Alvará de funcionamento/Licença", "categorias": ["c1","c2","c3","c4","c5","c6"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "Fiscal", "obs": "" },
      { "id": "d09", "grupo": "Fiscal / Regularidade", "nome": "Nota Fiscal (NF-e / NFS-e / CT-e conforme atividade)", "categorias": ["c1","c2","c3","c4","c5","c6"], "vigencia": "Por evento (a cada prestação de serviço)", "vigenciaDias": null, "departamento": "Fiscal", "obs": "" },
      { "id": "d10", "grupo": "Trabalhista", "nome": "Matrícula CNO/CEI da obra ou serviço", "categorias": ["c1"], "vigencia": "Por obra/contrato", "vigenciaDias": null, "departamento": "Departamento Pessoal (DP)", "obs": "Obrigatório quando há cessão de mão de obra" },
      { "id": "d11", "grupo": "Trabalhista", "nome": "GFIP / eSocial dos empregados alocados", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d12", "grupo": "Trabalhista", "nome": "Ficha de registro de empregados / CTPS ou Contrato de trabalho", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d13", "grupo": "Trabalhista", "nome": "Relação nominal de colaboradores alocados no contrato", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d14", "grupo": "Trabalhista", "nome": "Folha de Pagamento detalhada, referente ao serviço prestado", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d15", "grupo": "Trabalhista", "nome": "Comprovante de pagamento de salário (Holerites) assinados", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d16", "grupo": "Trabalhista", "nome": "Guia de Recolhimento do FGTS (GRF/GFIP) e comprovante de pagamento", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d17", "grupo": "Trabalhista", "nome": "Guia de Previdência Social (GPS) e comprovante de pagamento", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d18", "grupo": "Trabalhista", "nome": "Comprovantes de pagamento de benefícios (Vale-transporte, vale-refeição, férias, 13º salário)", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Departamento Pessoal (DP)", "obs": "" },
      { "id": "d19", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "Programa de Gerenciamento de Riscos (PGR)", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d20", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "Laudo Técnico das Condições Ambientais do Trabalho (LTCAT)", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d21", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "Recibos de entrega de EPIs com o número do Certificado de Aprovação (CA)", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d22", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "Ordem de Serviço (NR-01) assinada pelo funcionário", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d23", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "CAT (Comunicação de Acidente de Trabalho), se aplicável", "categorias": ["c1","c2","c6"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d24", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "ASO - Atestado de Saúde Ocupacional", "categorias": ["c1","c2","c6"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d25", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "Comprovante de treinamentos NR aplicáveis (NR-10, 35, 18)", "categorias": ["c1","c2","c6"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d26", "grupo": "Segurança e Saúde no Trabalho (SST/SSMA)", "nome": "CNH + certificado de capacitação do operador", "categorias": ["c1","c2"], "vigencia": "CNH conforme categoria/idade (CTB); capacitação conforme NR (ex.: NR-11 a cada 3 anos)", "vigenciaDias": null, "departamento": "SESMT/Segurança do Trabalho", "obs": "" },
      { "id": "d27", "grupo": "Técnico / Operacional", "nome": "RNTRC - Registro Nacional de Transportadores (ANTT)", "categorias": ["c2","c3"], "vigencia": "30 dias", "vigenciaDias": 30, "departamento": "Fiscal", "obs": "" },
      { "id": "d28", "grupo": "Técnico / Operacional", "nome": "CRLV do(s) equipamento(s)", "categorias": ["c2","c3"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "Suprimentos", "obs": "" },
      { "id": "d29", "grupo": "Técnico / Operacional", "nome": "Laudo/certificado de manutenção ou inspeção do equipamento", "categorias": ["c2","c3"], "vigencia": "6 meses", "vigenciaDias": 180, "departamento": "Engenharia", "obs": "" },
      { "id": "d30", "grupo": "Técnico / Operacional", "nome": "Certificações de qualidade (quando houver)", "categorias": ["c4"], "vigencia": "36 meses", "vigenciaDias": 1095, "departamento": "Suprimentos", "obs": "Se aplicável ao porte do fornecedor" },
      { "id": "d31", "grupo": "Técnico / Operacional", "nome": "ART/RRT do responsável técnico", "categorias": ["c4"], "vigencia": "Por serviço/projeto", "vigenciaDias": null, "departamento": "Engenharia", "obs": "Quando envolver projeto/execução técnica" },
      { "id": "d32", "grupo": "Técnico / Operacional", "nome": "Garantia técnica do produto/serviço", "categorias": ["c4"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "Engenharia", "obs": "" },
      { "id": "d33", "grupo": "Técnico / Operacional", "nome": "Registro profissional (CRC, OAB, CREA, conforme o caso)", "categorias": ["c4"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "Engenharia", "obs": "" },
      { "id": "d34", "grupo": "Contratual / Seguros", "nome": "Contrato de prestação de serviços", "categorias": ["c1","c2","c4","c5","c6"], "vigencia": "Conforme vigência contratual", "vigenciaDias": null, "departamento": "Suprimentos", "obs": "" },
      { "id": "d35", "grupo": "Contratual / Seguros", "nome": "Apólice de seguro RC / acidentes de trabalho", "categorias": ["c1","c2"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "Suprimentos", "obs": "" },
      { "id": "d36", "grupo": "Contratual / Seguros", "nome": "Apólice de seguro RCTR-C / RCF-DC (carga)", "categorias": ["c2","c3"], "vigencia": "12 meses", "vigenciaDias": 365, "departamento": "Suprimentos", "obs": "" },
      { "id": "d37", "grupo": "Contratual / Seguros", "nome": "Contrato de locação/cessão de equipamento", "categorias": ["c2","c3"], "vigencia": "Conforme vigência contratual", "vigenciaDias": null, "departamento": "Suprimentos", "obs": "" }
    ]
  },
  "portalDemo": {
    "fornecedorCod": "000005",
    "categoriaId": "c6",
    "gestorResponsavel": "Suprimentos - Ana Ferreira",
    "hoje": "2026-09-14",
    "enviados": {
      "d01": { "status": "Validado", "dataEnvio": "2026-08-20", "validade": "2026-11-18" },
      "d02": { "status": "Validado", "dataEnvio": "2026-08-20", "validade": "2026-11-18" },
      "d03": { "status": "A vencer", "dataEnvio": "2026-06-25", "validade": "2026-09-23" },
      "d04": { "status": "Vencido", "dataEnvio": "2026-07-10", "validade": "2026-08-09" },
      "d05": { "status": "Validado", "dataEnvio": "2026-09-01", "validade": "2026-10-01" },
      "d06": { "status": "Validado", "dataEnvio": "2026-05-15", "validade": "2026-08-13" },
      "d07": { "status": "Validado", "dataEnvio": "2026-08-30", "validade": "2026-11-28" },
      "d08": { "status": "Validado", "dataEnvio": "2026-02-10", "validade": "2027-02-10" },
      "d11": { "status": "Em análise", "dataEnvio": "2026-09-12", "validade": "2026-10-12" },
      "d12": { "status": "Validado", "dataEnvio": "2026-09-05", "validade": "2026-10-05" },
      "d15": { "status": "A vencer", "dataEnvio": "2026-08-25", "validade": "2026-09-24" },
      "d19": { "status": "Vencido", "dataEnvio": "2026-06-01", "validade": "2026-07-01" },
      "d24": { "status": "Validado", "dataEnvio": "2026-03-15", "validade": "2027-03-15" },
      "d34": { "status": "Validado", "dataEnvio": "2026-01-10", "validade": "2026-12-31" }
    }
  }
}
;