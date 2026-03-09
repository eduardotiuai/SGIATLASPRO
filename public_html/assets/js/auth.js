// Mock Users Database
const mockUsers = {
    'usuario@tiiuai.com.br': {
        id: 1,
        name: 'João Silva',
        email: 'usuario@tiiuai.com.br',
        password: '123456',
        role: 'admin',
        company: 'TI UAI',
        avatar: 'https://ui-avatars.com/api/?name=João+Silva&background=0066cc&color=fff',
        department: 'Direção'
    },
    'gerente@tiiuai.com.br': {
        id: 2,
        name: 'Maria Santos',
        email: 'gerente@tiiuai.com.br',
        password: '123456',
        role: 'manager',
        company: 'TI UAI',
        avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=0066cc&color=fff',
        department: 'Operações'
    },
    'usuario@empresa.com.br': {
        id: 3,
        name: 'Carlos Oliveira',
        email: 'usuario@empresa.com.br',
        password: '123456',
        role: 'user',
        company: 'Empresa XYZ',
        avatar: 'https://ui-avatars.com/api/?name=Carlos+Oliveira&background=0066cc&color=fff',
        department: 'Financeiro'
    }
};

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate
    if (!email || !password) {
        showAlert('Por favor, preencha todos os campos', 'error');
        return;
    }

    // Check credentials
    const user = mockUsers[email];
    
    if (!user || user.password !== password) {
        showAlert('Email ou senha incorretos', 'error');
        document.getElementById('password').value = '';
        return;
    }

    // Simulate login process
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Autenticando...';

    setTimeout(() => {
        // Store user data in localStorage
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('authenticated', 'true');

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }, 800);
}

// Show Alert Function
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('[data-alert]');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.setAttribute('data-alert', 'true');

    const bgColor = type === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
    const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
    const iconColor = type === 'error' ? 'text-red-500' : 'text-green-500';

    alertDiv.className = `${bgColor} border rounded-lg p-4 mb-4 flex items-start gap-3 ${textColor} text-sm`;
    alertDiv.innerHTML = `
        <svg class="w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            ${type === 'error' 
                ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />'
                : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l1.293 1.293-1.293 1.293a1 1 0 101.414 1.414L9 12.414l1.293 1.293a1 1 0 001.414-1.414L10.414 11l1.293-1.293z" clip-rule="evenodd" />'
            }
        </svg>
        <span>${message}</span>
    `;

    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(alertDiv, form);

    // Remove alert after 4 seconds
    setTimeout(() => alertDiv.remove(), 4000);
}
