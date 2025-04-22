# Projeto Banco Banestes

Uma aplicação web responsiva para gerenciar e visualizar dados de clientes, contas bancárias e agências de um banco fictício, consumindo dados em tempo real de planilhas Google em formato CSV.

---

## 🔍 Visão Geral

- **Objetivo:** Exibir listas de clientes e agências com busca, paginação, ordenação e visualização de detalhes.
- **API de Dados:** Dados de clientes, contas e agências são lidos em tempo de execução via Fetch API das URLs CSV da Google Sheets.
- **Temas:** Suporte a **modo claro** (paleta laranja/azul escuro) e **modo escuro** (paleta verde/branco), com alternância pelo usuário.
- **Deploy:** Hospedado no Vercel com deploy automático a cada push no GitHub.

---

## 🎯 Funcionalidades

1. **Landing Page**  
   - Grid de opções (Clientes, Agências, etc.)  
   - Cards clicáveis com ícones SVG recortados via CSS Mask.

2. **Listagem de Clientes**  
   - Tabela desktop e cards mobile.  
   - Busca em tempo real por Nome ou CPF/CNPJ.  
   - Paginação (10 itens por página).  
   - Ordenação alfabética (A→Z, Z→A).  
   - Clicar em qualquer linha/card leva à página de detalhes.

3. **Detalhes do Cliente**  
   - Informações pessoais (nome, CPF/CNPJ, RG, data nascimento, e-mail, endereço, estado civil).  
   - Renda Anual e Patrimônio (exibe “Não informado.” se valor ausente).  
   - Lista de contas bancárias (número da conta, tipo, saldo, limite e disponível), tratando valores não informados.  
   - Dados da agência do cliente (código, nome, endereço).

4. **Listagem de Agências**  
   - Página similar à de clientes: busca, paginação e ordenação.  
   - Exibição de nome, código e endereço de cada agência.

5. **Tema Claro/Escuro**  
   - Alternância via switch no Navbar.  
   - Cores, hover e estados de foco adaptados para cada tema.  
   - Navbar branca no modo escuro, azul escuro no modo claro.

6. **Acessibilidade & Responsividade**  
   - Layout adaptado para desktop e mobile (Bootstrap).  
   - Uso de atributos semânticos (`aria-label`, `role`, `<table>`, etc.).  
   - Controle de foco e alto contraste de cores.

---

## 🛠️ Tecnologias

- **Frontend:**  
  - React 19 + TypeScript  
  - Vite  
  - React Router DOM  
  - React Bootstrap  
- **Estilo:**  
  - Bootstrap 5 (customização via CSS customizado)  
  - CSS Variables para tema claro/escuro  
- **Dados:**  
  - Fetch API + PapaParse (CSV → JSON)  
- **Deploy:**  
  - Vercel (deploy automático via GitHub)
