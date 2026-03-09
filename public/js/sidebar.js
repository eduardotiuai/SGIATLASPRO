// Check if user is authenticated
function checkAuthentication() {
    const authenticated = sessionStorage.getItem('authenticated');
    const user = sessionStorage.getItem('user');

    if (!authenticated || !user) {
        window.location.href = 'index.html';
        return;
    }

    // Load user data
    const userData = JSON.parse(user);
    loadUserProfile(userData);
}

// Load user profile information
function loadUserProfile(user) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAvatar').src = user.avatar;
    document.getElementById('userRole').textContent = 
        user.role === 'admin' ? 'Administrador' : 
        user.role === 'manager' ? 'Gerente' : 
        'Usuário';
}

// Toggle Sidebar (Collapse/Expand)
document.getElementById('toggleSidebar')?.addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const isCollapsed = sidebar.classList.contains('collapsed');

    if (isCollapsed) {
        // Expand sidebar
        sidebar.classList.remove('collapsed');
        sidebar.style.width = '16rem';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        localStorage.setItem('sidebarCollapsed', 'false');
    } else {
        // Collapse sidebar
        sidebar.classList.add('collapsed');
        sidebar.style.width = '80px';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        localStorage.setItem('sidebarCollapsed', 'true');
    }
});

// Load sidebar state
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();

    const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');

    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        sidebar.style.width = '80px';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    }
});

// Settings Modal Functions
function openSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('settingsModal');
    if (event.target === modal) {
        closeSettings();
    }
});

// Logout Function
function logout() {
    // Clear session
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authenticated');

    // Show logout message
    alert('Você foi desconectado com sucesso!');

    // Redirect to login
    window.location.href = 'index.html';
}
