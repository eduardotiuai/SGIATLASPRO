// Module Configuration
const modules = {
    cadastros: {
        title: 'Cadastros',
        subtitle: 'Módulo Cadastros - Gerenciamento de dados centralizados',
        icon: 'fa-address-card',
        construction: true
    },
    recursos_humanos: {
        title: 'Recursos Humanos',
        subtitle: 'Módulo Recursos Humanos - Gestão de pessoal e folha de pagamento',
        icon: 'fa-users',
        construction: true
    },
    suprimentos: {
        title: 'Suprimentos',
        subtitle: 'Módulo Suprimentos - Abastecimento e atendimento ao cliente',
        icon: 'fa-dolly',
        construction: true
    },
    estoque: {
        title: 'Estoque',
        subtitle: 'Módulo Estoque - Controle de inventário e movimentações',
        icon: 'fa-boxes',
        construction: true
    },
    frotas: {
        title: 'Frotas',
        subtitle: 'Módulo Frotas - Gestão de veículos e administração',
        icon: 'fa-van-shuttle',
        construction: true
    },
    comercial: {
        title: 'Comercial',
        subtitle: 'Módulo Comercial - Gestão de relacionamento com cliente',
        icon: 'fa-chart-line',
        construction: true
    },
    contratos: {
        title: 'Contratos',
        subtitle: 'Módulo Contratos - Administração de contratos',
        icon: 'fa-file-contract',
        construction: true
    },
    implantacao: {
        title: 'Implantação',
        subtitle: 'Módulo Implantação - Gestão de novos projetos',
        icon: 'fa-rocket',
        construction: true
    },
    logistica: {
        title: 'Logística',
        subtitle: 'Módulo Logística - Distribuição e transporte',
        icon: 'fa-truck',
        construction: true
    },
    controle_operacional: {
        title: 'Controle Operacional',
        subtitle: 'Módulo Controle Operacional - Supervisão de operações',
        icon: 'fa-cogs',
        construction: true
    },
    suporte_tecnico: {
        title: 'Suporte Técnico',
        subtitle: 'Módulo Suporte Técnico - Suporte ao cliente e manutenção',
        icon: 'fa-tools',
        construction: true
    },
    compras: {
        title: 'Compras',
        subtitle: 'Módulo Compras - Gestão de aquisições',
        icon: 'fa-shopping-cart',
        construction: true
    },
    qualidade: {
        title: 'Qualidade',
        subtitle: 'Módulo Qualidade - Controle de qualidade',
        icon: 'fa-check-circle',
        construction: true
    },
    residuos: {
        title: 'Resíduos',
        subtitle: 'Módulo Resíduos - Gestão ambiental',
        icon: 'fa-recycle',
        construction: true
    },
    financeiro: {
        title: 'Financeiro',
        subtitle: 'Módulo Financeiro - Fluxo de caixa e contas financeiras',
        icon: 'fa-money-bill-wave',
        construction: true
    },
    contadores: {
        title: 'Contadores',
        subtitle: 'Módulo Contadores - Gestão de contadores com gestor print',
        icon: 'fa-calculator',
        construction: true
    },
    dashboards: {
        title: 'Dashboards',
        subtitle: 'Módulo Dashboards - Análise e relatórios executivos',
        icon: 'fa-chart-pie',
        construction: true
    },
    configuracoes: {
        title: 'Configurações do Sistema',
        subtitle: 'Módulo Configurações - Gerenciamento do sistema',
        icon: 'fa-cog',
        construction: true
    },
    inicio: {
        title: 'Início',
        subtitle: 'Bem-vindo ao SGI OTI',
        icon: 'fa-star'
    },
    dashboard: {
        title: 'Dashboard',
        subtitle: 'Visão geral do sistema',
        icon: 'fa-home'
    },
    mensagens: {
        title: 'Mensagens',
        subtitle: 'Comunicação interna do sistema',
        icon: 'fa-envelope',
        construction: true
    },
    calendario: {
        title: 'Calendário',
        subtitle: 'Avisos e agendamentos de lembretes',
        icon: 'fa-calendar',
        construction: true
    },
    suporte: {
        title: 'Suporte',
        subtitle: 'Central de atendimento e ajuda',
        icon: 'fa-life-ring',
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

    // Update active menu item
    document.querySelectorAll('[data-module]').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-module="${moduleKey}"]`)?.classList.add('active');

    // Load content
    if (moduleKey === 'dashboard') {
        // Dashboard now in construction
        loadConstructionPage(module);
    } else if (moduleKey === 'inicio') {
        loadHomeModule();
    } else if (module.construction) {
        loadConstructionPage(module);
    }
}

// Load Dashboard Content
function loadDashboard() {
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="main-content-section">
            <!-- Welcome Section -->
            <div class="card welcome-card" style="background: linear-gradient(135deg, var(--accent-primary), var(--primary-dark)); color: white; padding: 1rem; margin-bottom: 0.5rem;">
                <h2 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.25rem;">Bem-vindo ao SGI OTI!</h2>
                <p style="opacity: 0.9; font-size: 0.85rem;">Sistema Enterprise - Selecione um módulo na barra lateral</p>
            </div>

            <!-- Statistics Grid -->
            <div class="modules-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-top: 0.5rem;">
                <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem;">
                    <div>
                        <p style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Módulos</p>
                        <p style="font-size: 1.5rem; font-weight: bold; color: var(--text-primary);">18</p>
                    </div>
                    <div style="width: 3rem; height: 3rem; background-color: var(--accent-light); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-cube" style="color: var(--accent-primary); font-size: 1.25rem;"></i>
                    </div>
                </div>

                <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem;">
                    <div>
                        <p style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Usuários</p>
                        <p style="font-size: 1.5rem; font-weight: bold; color: var(--text-primary);">3</p>
                    </div>
                    <div style="width: 3rem; height: 3rem; background-color: rgba(16, 167, 96, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-users" style="color: var(--success); font-size: 1.25rem;"></i>
                    </div>
                </div>

                <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem;">
                    <div>
                        <p style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Status</p>
                        <p style="font-size: 1rem; font-weight: bold; color: var(--success);">
                            <i class="fas fa-circle" style="font-size: 0.5rem; margin-right: 0.5rem;"></i>Operacional
                        </p>
                    </div>
                    <div style="width: 3rem; height: 3rem; background-color: rgba(16, 167, 96, 0.1); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.25rem;"></i>
                    </div>
                </div>

                <div class="card" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem;">
                    <div>
                        <p style="color: var(--text-secondary); font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Versão</p>
                        <p style="font-size: 1.25rem; font-weight: bold; color: var(--text-primary);">1.0.0</p>
                    </div>
                    <div style="width: 3rem; height: 3rem; background-color: var(--accent-light); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-info-circle" style="color: var(--accent-primary); font-size: 1.25rem;"></i>
                    </div>
                </div>
            </div>

            <!-- Featured Modules & System Info -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 0.75rem;">
                <div class="card">
                    <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-star" style="color: #f59e0b;"></i>
                        Módulos Principais
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        ${Object.entries(modules)
                            .filter(([key]) => ['cadastros', 'comercial', 'financeiro', 'operacao'].includes(key))
                            .map(([key, module]) => `
                                <button onclick="loadModule('${key}')" style="text-align: left; padding: 0.75rem; border-radius: 0.5rem; border: none; background-color: transparent; cursor: pointer; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: space-between;" onmouseover="this.style.backgroundColor='var(--hover-bg)'" onmouseout="this.style.backgroundColor='transparent'">
                                    <div>
                                        <p style="font-weight: 500; color: var(--text-primary); margin-bottom: 0.25rem;">${module.title}</p>
                                        <p style="font-size: 0.75rem; color: var(--text-secondary);">${module.subtitle}</p>
                                    </div>
                                    <i class="fas fa-arrow-right" style="color: var(--text-secondary);"></i>
                                </button>
                            `).join('')}
                    </div>
                </div>

                <div class="card">
                    <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-info-circle" style="color: var(--accent-primary);"></i>
                        Informações do Sistema
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 0; font-size: 0.75rem;">
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-secondary);">Empresa:</span>
                            <span style="font-weight: 500; color: var(--text-primary);">TI UAI</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-secondary);">Versão:</span>
                            <span style="font-weight: 500; color: var(--text-primary);">1.0.0 Beta</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-secondary);">Modo:</span>
                            <span style="font-weight: 500; color: var(--accent-primary);">Dados Mockados</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0;">
                            <span style="color: var(--text-secondary);">Tipo:</span>
                            <span style="font-weight: 500; color: var(--text-primary);">Multi-tenant</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="card" style="margin-top: 0.75rem;">
                <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-lightning-bolt" style="color: #f59e0b;"></i>
                    Ações Rápidas
                </h3>
                <div class="modules-grid">
                    <button style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; background-color: transparent; cursor: pointer; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); text-align: center;" onmouseover="this.style.borderColor='var(--accent-primary)'; this.style.backgroundColor='var(--accent-light)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.backgroundColor='transparent'">
                        <i class="fas fa-plus-circle" style="color: var(--accent-primary); font-size: 1.25rem; display: block; margin-bottom: 0.25rem;"></i>
                        <p style="font-size: 0.75rem; font-weight: 500; color: var(--text-primary);">Novo</p>
                    </button>
                    <button style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; background-color: transparent; cursor: pointer; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); text-align: center;" onmouseover="this.style.borderColor='var(--success)'; this.style.backgroundColor='rgba(16, 167, 96, 0.05)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.backgroundColor='transparent'">
                        <i class="fas fa-file-export" style="color: var(--success); font-size: 1.25rem; display: block; margin-bottom: 0.25rem;"></i>
                        <p style="font-size: 0.75rem; font-weight: 500; color: var(--text-primary);">Relatório</p>
                    </button>
                    <button style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; background-color: transparent; cursor: pointer; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); text-align: center;" onmouseover="this.style.borderColor='var(--accent-primary)'; this.style.backgroundColor='var(--accent-light)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.backgroundColor='transparent'">
                        <i class="fas fa-chart-bar" style="color: var(--accent-primary); font-size: 1.25rem; display: block; margin-bottom: 0.25rem;"></i>
                        <p style="font-size: 0.75rem; font-weight: 500; color: var(--text-primary);">Análise</p>
                    </button>
                    <button style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 0.5rem; background-color: transparent; cursor: pointer; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); text-align: center;" onmouseover="this.style.borderColor='var(--accent-primary)'; this.style.backgroundColor='var(--accent-light)'" onmouseout="this.style.borderColor='var(--border-color)'; this.style.backgroundColor='transparent'" onclick="alert('Funcionalidade em breve!')">
                        <i class="fas fa-cog" style="color: var(--accent-primary); font-size: 1.25rem; display: block; margin-bottom: 0.25rem;"></i>
                        <p style="font-size: 0.75rem; font-weight: 500; color: var(--text-primary);">Config</p>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Load Construction Page (for modules under development)
function loadConstructionPage(module) {
    const contentArea = document.getElementById('contentArea');
    
    const constructionHTML = `
        <div class="construction-page" style="max-width: 42rem; margin: 2rem auto;">
            <!-- Main Construction Card -->
            <div class="card" style="padding: 3rem; text-align: center;">
                <!-- Icon -->
                <div style="margin-bottom: 1.5rem;">
                    <div style="width: 6rem; height: 6rem; margin: 0 auto; background: linear-gradient(135deg, var(--accent-primary), var(--accent-light)); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas ${module.icon}" style="color: white; font-size: 2.5rem;"></i>
                    </div>
                </div>

                <!-- Title -->
                <h1 style="font-size: 2.25rem; font-weight: bold; color: var(--text-primary); margin-bottom: 0.5rem;">${module.title}</h1>
                <p style="color: var(--text-secondary); font-size: 1.125rem; margin-bottom: 2rem;">${module.subtitle}</p>

                <!-- Status Badge -->
                <div style="display: inline-block; margin-bottom: 2rem;">
                    <div style="background-color: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 9999px; padding: 0.5rem 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="width: 0.5rem; height: 0.5rem; background-color: #f59e0b; border-radius: 50%; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></span>
                        <span style="font-size: 0.875rem; font-weight: 500; color: #92400e;">Em Construção</span>
                    </div>
                </div>

                <!-- Message -->
                <div style="background-color: var(--accent-light); border: 1px solid var(--accent-primary); border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 2rem;">
                    <h2 style="font-weight: 600; color: #003d99; margin-bottom: 0.5rem;">🚀 Desenvolvendo com cuidado</h2>
                    <p style="color: #0052cc; font-size: 0.875rem;">
                        Nosso time está trabalhando para entregar um módulo robusto e de qualidade. 
                        Volte em breve para acessar todas as funcionalidades do <strong>${module.title}</strong>.
                    </p>
                </div>

                <!-- Timeline -->
                <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; text-align: left; max-width: 24rem; margin-left: auto; margin-right: auto;">
                    <div style="display: flex; gap: 0.75rem;">
                        <div style="width: 1.5rem; height: 1.5rem; border-radius: 50%; background-color: var(--success); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.25rem;">
                            <i class="fas fa-check" style="color: white; font-size: 0.75rem;"></i>
                        </div>
                        <div>
                            <p style="font-weight: 500; color: var(--text-primary);">Design e Arquitetura</p>
                            <p style="font-size: 0.75rem; color: var(--text-secondary);">Concluído</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        <div style="width: 1.5rem; height: 1.5rem; border-radius: 50%; background-color: var(--accent-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.25rem;">
                            <div style="width: 0.5rem; height: 0.5rem; background-color: white; border-radius: 50%; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
                        </div>
                        <div>
                            <p style="font-weight: 500; color: var(--text-primary);">Implementação Backend</p>
                            <p style="font-size: 0.75rem; color: var(--text-secondary);">Em progresso</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        <div style="width: 1.5rem; height: 1.5rem; border-radius: 50%; background-color: var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.25rem;"></div>
                        <div>
                            <p style="font-weight: 500; color: var(--text-secondary);">Testes e Validação</p>
                            <p style="font-size: 0.75rem; color: var(--text-secondary);">Próxima etapa</p>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <button onclick="loadModule('dashboard')" class="btn btn-primary">
                        <i class="fas fa-arrow-left" style="margin-right: 0.5rem;"></i>
                        Voltar ao Dashboard
                    </button>
                    <button onclick="alert('Notificação ativada! Você será avisado quando este módulo estiver pronto.')" style="border: 2px solid var(--accent-primary); background-color: transparent; color: var(--accent-primary); font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);" onmouseover="this.style.backgroundColor='var(--accent-light)'" onmouseout="this.style.backgroundColor='transparent'">
                        <i class="fas fa-bell" style="margin-right: 0.5rem;"></i>
                        Notificar-me quando Estiver Pronto
                    </button>
                </div>

                <!-- Footer Note -->
                <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2rem;">
                    <i class="fas fa-info-circle" style="margin-right: 0.5rem;"></i>
                    Versão Beta 1.0.0 • Desenvolvido por TI UAI
                </p>
            </div>
        </div>
    `;

    contentArea.innerHTML = constructionHTML;
}

// Load Home/Início Module
function loadHomeModule() {
    const contentArea = document.getElementById('contentArea');
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const userName = user.name || 'Visitante';

    const homeHTML = `
        <div class="main-content-section">
            <!-- Welcome Section -->
            <div class="card" style="background: linear-gradient(135deg, var(--accent-primary), var(--primary-dark)); color: white; padding: 2rem; margin-bottom: 1.5rem; border-radius: 0.75rem;">
                <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">
                    👋 Bem-vindo, ${userName}!
                </h1>
                <p style="font-size: 1rem; opacity: 0.95;">
                    Explore os módulos do SGI OTI e descubra toda a potência do nossa plataforma de gestão integrada.
                </p>
            </div>

            <!-- Version Info Card -->
            <div class="card" style="padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 3rem; height: 3rem; background: linear-gradient(135deg, var(--accent-primary), #00a8e8); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-rocket" style="color: white; font-size: 1.25rem;"></i>
                    </div>
                    <div>
                        <h2 style="font-size: 1.25rem; font-weight: bold; color: var(--text-primary); margin-bottom: 0.25rem;">Versão do Sistema</h2>
                        <p style="color: var(--text-secondary);">SGI OTI v1.8.0</p>
                    </div>
                </div>
                <div style="background-color: var(--accent-light); border-left: 4px solid var(--accent-primary); padding: 1rem; border-radius: 0.5rem;">
                    <p style="color: #003d99; font-size: 0.95rem;">
                        <strong>Status:</strong> Sistema em desenvolvimento ativo. Novas funcionalidades são adicionadas regularmente.
                    </p>
                </div>
            </div>

            <!-- Release Notes -->
            <div class="card" style="padding: 1.5rem;">
                <h2 style="font-size: 1.5rem; font-weight: bold; color: var(--text-primary); margin-bottom: 1rem;">
                    <i class="fas fa-clipboard-list" style="margin-right: 0.5rem;"></i>
                    Notas da Versão
                </h2>

                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Update 1 -->
                    <div style="border-left: 4px solid var(--success); padding-left: 1rem;">
                        <p style="font-size: 0.875rem; color: var(--success); font-weight: 600; margin-bottom: 0.25rem;">
                            <i class="fas fa-check-circle"></i> v1.8.0 - Atual
                        </p>
                        <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">Interface Renovada e Novos Módulos</p>
                        <ul style="list-style: none; padding: 0; font-size: 0.9rem; color: var(--text-secondary);">
                            <li>✨ Novo módulo "Início" com visão geral do sistema</li>
                            <li>✨ Adicionados módulos de Mensagens e Calendário</li>
                            <li>💡 Carrossel de módulos na página de login</li>
                            <li>🎨 Design atualizado com overlay de imagem moderna</li>
                            <li>⚡ Acesso rápido ao dashboard sem autenticação</li>
                        </ul>
                    </div>

                    <!-- Update 2 -->
                    <div style="border-left: 4px solid var(--border-color); padding-left: 1rem;">
                        <p style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 0.25rem;">
                            <i class="fas fa-circle" style="font-size: 0.5rem;"></i> v1.7.0
                        </p>
                        <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">Menu de Usuário no Header</p>
                        <ul style="list-style: none; padding: 0; font-size: 0.9rem; color: var(--text-secondary);">
                            <li>👤 Menu do usuário movido para o header</li>
                            <li>🎯 Sidebar simplificada e minimizada</li>
                            <li>🔔 Apenas ícone de notificações visível quando compactada</li>
                        </ul>
                    </div>

                    <!-- Update 3 -->
                    <div style="border-left: 4px solid var(--border-color); padding-left: 1rem;">
                        <p style="font-size: 0.875rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 0.25rem;">
                            <i class="fas fa-circle" style="font-size: 0.5rem;"></i> v1.6.0
                        </p>
                        <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">Redesign Visual Completo</p>
                        <ul style="list-style: none; padding: 0; font-size: 0.9rem; color: var(--text-secondary);">
                            <li>🎨 Cores redesenhadas (modo claro: azul, modo escuro: cinza)</li>
                            <li>🌙 Tema dark redesenhado com cinza escuro (#1a1a1a)</li>
                            <li>💜 Login com violeta moderno e ilustração corporativa</li>
                            <li>📱 Interface responsiva melhorada</li>
                        </ul>
                    </div>
                </div>

                <!-- Features Preview -->
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                    <h3 style="font-weight: 600; color: var(--text-primary); margin-bottom: 1rem;"> Módulos Disponíveis </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.75rem;">
                        <div style="background-color: var(--accent-light); padding: 0.75rem; border-radius: 0.5rem; text-align: center;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⭐</div>
                            <p style="font-size: 0.875rem; font-weight: 600; color: var(--text- primary);">Início</p>
                        </div>
                        <div style="background-color: rgba(0, 0, 0, 0.05); padding: 0.75rem; border-radius: 0.5rem; text-align: center; opacity: 0.7;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🏠</div>
                            <p style="font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">Dashboard</p>
                        </div>
                        <div style="background-color: rgba(0, 0, 0, 0.05); padding: 0.75rem; border-radius: 0.5rem; text-align: center; opacity: 0.7;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📧</div>
                            <p style="font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">Mensagens</p>
                        </div>
                        <div style="background-color: rgba(0, 0, 0, 0.05); padding: 0.75rem; border-radius: 0.5rem; text-align: center; opacity: 0.7;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📅</div>
                            <p style="font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">Calendário</p>
                        </div>
                        <div style="background-color: rgba(0, 0, 0, 0.05); padding: 0.75rem; border-radius: 0.5rem; text-align: center; opacity: 0.7;">
                            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🆘</div>
                            <p style="font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">Suporte</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    contentArea.innerHTML = homeHTML;
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', function() {
    loadModule('inicio');
});
