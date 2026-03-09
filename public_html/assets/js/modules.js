// Module Configuration
const modules = {
    dashboard: {
        title: 'Dashboard',
        subtitle: 'Visão geral do sistema',
        icon: 'fa-home'
    },
    cadastros: {
        title: 'Cadastros',
        subtitle: 'Gerenciamento de clientes, fornecedores e produtos',
        icon: 'fa-address-card',
        construction: true
    },
    qualidade: {
        title: 'Qualidade',
        subtitle: 'Controle de qualidade e conformidade',
        icon: 'fa-check-circle',
        construction: true
    },
    comercial: {
        title: 'Comercial',
        subtitle: 'Vendas, propostas e oportunidades',
        icon: 'fa-chart-line',
        construction: true
    },
    financeiro: {
        title: 'Financeiro',
        subtitle: 'Fluxo de caixa e análises financeiras',
        icon: 'fa-wallet',
        construction: true
    },
    operacao: {
        title: 'Operação',
        subtitle: 'Planejamento e controle operacional',
        icon: 'fa-cogs',
        construction: true
    },
    compras: {
        title: 'Compras',
        subtitle: 'Requisições e pedidos de compra',
        icon: 'fa-shopping-cart',
        construction: true
    },
    logistica: {
        title: 'Logística',
        subtitle: 'Rastreamento e gerenciamento de entregas',
        icon: 'fa-truck',
        construction: true
    },
    estoque: {
        title: 'Estoque',
        subtitle: 'Controle de inventário e movimentações',
        icon: 'fa-boxes',
        construction: true
    },
    frotas: {
        title: 'Frotas',
        subtitle: 'Gestão de veículos e manutenção',
        icon: 'fa-van-shuttle',
        construction: true
    },
    licitacoes: {
        title: 'Licitações',
        subtitle: 'Gestão de pregões e processos licitatórios',
        icon: 'fa-gavel',
        construction: true
    },
    controladoria: {
        title: 'Controladoria',
        subtitle: 'Relatórios e análises estratégicas',
        icon: 'fa-chart-pie',
        construction: true
    },
    faturamento: {
        title: 'Faturamento',
        subtitle: 'Emissão e controle de faturas',
        icon: 'fa-receipt',
        construction: true
    },
    contratos: {
        title: 'Contratos',
        subtitle: 'Gestão de contratos e cláusulas',
        icon: 'fa-file-contract',
        construction: true
    },
    atendimentos: {
        title: 'Atendimentos',
        subtitle: 'Central de chamados e tickets',
        icon: 'fa-headset',
        construction: true
    },
    suprimentos: {
        title: 'Suprimentos',
        subtitle: 'Gestão de materiais e fornecimento',
        icon: 'fa-dolly',
        construction: true
    },
    manutencao: {
        title: 'Manutenção',
        subtitle: 'Preventiva, corretiva e agendamentos',
        icon: 'fa-tools',
        construction: true
    },
    almoxarifado: {
        title: 'Almoxarifado',
        subtitle: 'Controle centralizado de armazenagem',
        icon: 'fa-warehouse',
        construction: true
    },
    configuracoes: {
        title: 'Configurações',
        subtitle: 'Gerenciamento de usuários e sistema',
        icon: 'fa-cog',
        construction: true
    }
};

// Load Module Function
function loadModule(moduleKey) {
    const module = modules[moduleKey];

    if (!module) {
        console.error(`Módulo ${moduleKey} não encontrado`);
        return;
    }

    // Update page title and subtitle
    document.getElementById('pageTitle').textContent = module.title;
    document.getElementById('pageSubtitle').textContent = module.subtitle;

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-module="${moduleKey}"]`)?.classList.add('active');

    // Load content
    if (moduleKey === 'dashboard') {
        loadDashboard();
    } else if (module.construction) {
        loadConstructionPage(module);
    }
}

// Load Dashboard Content
function loadDashboard() {
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="space-y-6">
            <!-- Welcome Card -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
                <h2 class="text-3xl font-bold mb-2">Bem-vindo ao SGI ATLAS!</h2>
                <p class="text-blue-100">Sistema em construção - selecione um módulo na barra lateral para explorar</p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm font-medium">Módulos</p>
                            <p class="text-3xl font-bold text-gray-900 mt-2">18</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-cube text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm font-medium">Usuários</p>
                            <p class="text-3xl font-bold text-gray-900 mt-2">3</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-users text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm font-medium">Status</p>
                            <p class="text-lg font-bold text-green-600 mt-2">
                                <i class="fas fa-circle text-green-500 text-xs mr-2"></i>Operacional
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-600 text-sm font-medium">Versão</p>
                            <p class="text-2xl font-bold text-gray-900 mt-2">1.0.0</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-info-circle text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Featured Modules -->
                <div class="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-star text-yellow-500"></i>
                        Módulos Principais
                    </h3>
                    <div class="space-y-3">
                        ${Object.entries(modules)
                            .filter(([key]) => ['cadastros', 'comercial', 'financeiro', 'operacao'].includes(key))
                            .map(([key, module]) => `
                                <button onclick="loadModule('${key}')" class="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                    <div>
                                        <p class="font-medium text-gray-900 group-hover:text-blue-600">${module.title}</p>
                                        <p class="text-xs text-gray-600">${module.subtitle}</p>
                                    </div>
                                    <i class="fas fa-arrow-right text-gray-400 group-hover:text-blue-600"></i>
                                </button>
                            `).join('')}
                    </div>
                </div>

                <!-- System Info -->
                <div class="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="fas fa-info-circle text-blue-600"></i>
                        Informações do Sistema
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex items-center justify-between py-2 border-b border-gray-100">
                            <span class="text-gray-600">Empresa:</span>
                            <span class="font-medium text-gray-900">TI UAI</span>
                        </div>
                        <div class="flex items-center justify-between py-2 border-b border-gray-100">
                            <span class="text-gray-600">Versão:</span>
                            <span class="font-medium text-gray-900">1.0.0 Beta</span>
                        </div>
                        <div class="flex items-center justify-between py-2 border-b border-gray-100">
                            <span class="text-gray-600">Modo:</span>
                            <span class="font-medium text-blue-600">Dados Mockados</span>
                        </div>
                        <div class="flex items-center justify-between py-2">
                            <span class="text-gray-600">Tipo:</span>
                            <span class="font-medium text-gray-900">Multi-tenant</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-lightning-bolt text-yellow-500"></i>
                    Ações Rápidas
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button class="p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-center">
                        <i class="fas fa-plus-circle text-blue-600 text-2xl mb-2"></i>
                        <p class="text-sm font-medium text-gray-900">Novo Cadastro</p>
                    </button>
                    <button class="p-4 border border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all text-center">
                        <i class="fas fa-file-export text-green-600 text-2xl mb-2"></i>
                        <p class="text-sm font-medium text-gray-900">Relatório</p>
                    </button>
                    <button class="p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all text-center">
                        <i class="fas fa-chart-bar text-purple-600 text-2xl mb-2"></i>
                        <p class="text-sm font-medium text-gray-900">Análise</p>
                    </button>
                    <button class="p-4 border border-gray-200 rounded-lg hover:border-orange-600 hover:bg-orange-50 transition-all text-center">
                        <i class="fas fa-cog text-orange-600 text-2xl mb-2"></i>
                        <p class="text-sm font-medium text-gray-900">Preferências</p>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners for quick actions
    contentArea.querySelectorAll('button').forEach((btn, idx) => {
        if (idx > 3) { // Skip existing buttons, target only quick actions
            btn.addEventListener('click', function() {
                alert('Funcionalidade em breve!');
            });
        }
    });
}

// Load Construction Page (for modules under development)
function loadConstructionPage(module) {
    const contentArea = document.getElementById('contentArea');
    
    const constructionHTML = `
        <div class="construction-message max-w-2xl mx-auto">
            <!-- Main Construction Card -->
            <div class="bg-white rounded-2xl shadow-xl p-12 text-center">
                <!-- Icon -->
                <div class="mb-6">
                    <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                        <i class="fas ${module.icon} text-blue-600 text-5xl"></i>
                    </div>
                </div>

                <!-- Title -->
                <h1 class="text-4xl font-bold text-gray-900 mb-2">${module.title}</h1>
                <p class="text-gray-600 text-lg mb-8">${module.subtitle}</p>

                <!-- Status Badge -->
                <div class="inline-block mb-8">
                    <div class="bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2 flex items-center gap-2">
                        <span class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        <span class="text-sm font-medium text-yellow-800">Em Construção</span>
                    </div>
                </div>

                <!-- Message -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h2 class="font-semibold text-blue-900 mb-2">🚀 Desenvolvendo com cuidado</h2>
                    <p class="text-blue-700 text-sm">
                        Nosso time está trabalhando para entregar um módulo robusto e de qualidade. 
                        Volte em breve para acessar todas as funcionalidades do <strong>${module.title}</strong>.
                    </p>
                </div>

                <!-- Timeline -->
                <div class="space-y-4 mb-8 text-left max-w-sm mx-auto">
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                            <i class="fas fa-check text-white text-xs"></i>
                        </div>
                        <div>
                            <p class="font-medium text-gray-900">Design e Arquitetura</p>
                            <p class="text-xs text-gray-600">Concluído</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <p class="font-medium text-gray-900">Implementação Backend</p>
                            <p class="text-xs text-gray-600">Em progresso</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-1"></div>
                        <div>
                            <p class="font-medium text-gray-500">Testes e Validação</p>
                            <p class="text-xs text-gray-500">Próxima etapa</p>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                    <button onclick="loadModule('dashboard')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Voltar ao Dashboard
                    </button>
                    <button onclick="alert('Notificação ativada! Você será avisado quando este módulo estiver pronto.')" class="w-full border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors">
                        <i class="fas fa-bell mr-2"></i>
                        Notificar-me quando Estiver Pronto
                    </button>
                </div>

                <!-- Footer Note -->
                <p class="text-xs text-gray-500 mt-8">
                    <i class="fas fa-info-circle mr-2"></i>
                    Versão Beta 1.0.0 • Desenvolvido por TI UAI
                </p>
            </div>
        </div>
    `;

    contentArea.innerHTML = constructionHTML;
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', function() {
    loadModule('dashboard');
});
