# SGI ATLAS - Sistema de Gestão Integrada
**Desenvolvido por: TI UAI**

Um sistema empresarial robusto para integração completa de operações em empresas de serviços e indústrias.

## Características

✨ **Frontend Moderno**
- HTML5, CSS (Tailwind CSS), JavaScript
- Design limpo e sóbrio (inspiração macOS/iOS)
- Sidebar recolhível
- Transições suaves

🔐 **Segurança & Multi-tenant**
- Sistema multi-tenant por domínio de email
- Autenticação mockada (preparado para backend)
- Controle de papéis (Admin, Gerente, Usuário)

📊 **Módulos Disponíveis**
1. **Cadastros** - Gestão de clientes, fornecedores, produtos
2. **Qualidade** - Controle de qualidade
3. **Comercial** - Vendas e propostas
4. **Financeiro** - Fluxo de caixa, contas a receber/pagar
5. **Operação** - Planejamento operacional
6. **Compras** - Requisições e pedidos
7. **Logística** - Rastreamento e entregas
8. **Estoque** - Controle de inventário
9. **Frotas** - Gestão de veículos
10. **Licitações** - Gestão de pregões
11. **Controladoria** - Análises e relatórios
12. **Faturamento** - Emissão de faturas
13. **Contratos** - Gestão de contratos
14. **Atendimentos** - Tickets e chamados
15. **Suprimentos** - Gestão de materiais
16. **Manutenção** - Manutenção preventiva/corretiva
17. **Almoxarifado** - Controle de almoxarifado

## Estrutura do Projeto

```
SGIATLASPRO/
├── public/                 # Frontend
│   ├── index.html         # Página de login
│   ├── dashboard.html     # Dashboard principal
│   ├── css/
│   │   ├── tailwind.css   # Tailwind CSS
│   │   └── main.css       # Estilos customizados
│   ├── js/
│   │   ├── app.js         # Aplicação principal
│   │   ├── auth.js        # Autenticação
│   │   ├── sidebar.js     # Sidebar logic
│   │   └── modules.js     # Gerenciamento de módulos
│   └── img/               # Imagens e assets
├── backend/               # Backend PHP
│   ├── config/            # Configurações
│   ├── api/               # Endpoints
│   └── utils/             # Utilitários
└── docs/                  # Documentação
```

## Começando

1. Abra o arquivo `public/index.html` no navegador
2. Use as credenciais mockadas:
   - Email: usuario@tiiuai.com.br
   - Senha: 123456

## Requisitos Futuros
- PHP 8.0+
- MariaDB 10.4+
- API Resend.com para emails

## Versão
1.0.0 - Sistema em fase de desenvolvimento

## Empresa
**TI UAI** - Soluções em Tecnologia
