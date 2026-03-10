/* ================================================
   SGI ATLAS - Sidebar Management
   ================================================ */

// Check authentication and load user profile
function checkAuthentication() {
    const authenticated = sessionStorage.getItem('authenticated');
    const user = sessionStorage.getItem('user');

    if (!authenticated || !user) {
        window.location.href = 'index.html';
        return;
    }

    const userData = JSON.parse(user);
    loadUserProfile(userData);
}

// Load user profile
function loadUserProfile(user) {
    const userName = user.name || 'Usuário';
    const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
    
    // Update all user avatar elements
    document.querySelectorAll('#userAvatar, #userAvatarHeader').forEach(el => {
        el.textContent = userInitials;
    });
    
    // Update user name
    document.querySelectorAll('#userName').forEach(el => {
        el.textContent = userName;
    });
    
    // Update user role
    document.querySelectorAll('#userRole').forEach(el => {
        el.textContent = user.role === 'admin' ? 'System Admin' : ' Usuário';
    });
}

// Sidebar Toggle
document.getElementById('toggleSidebar')?.addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = sidebar.classList.contains('collapsed');

    if (isCollapsed) {
        sidebar.classList.remove('collapsed');
        localStorage.setItem('sidebarCollapsed', 'false');
    } else {
        sidebar.classList.add('collapsed');
        localStorage.setItem('sidebarCollapsed', 'true');
    }
});

// Restore sidebar state
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();

    const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    const sidebar = document.getElementById('sidebar');

    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
    }

    // Load initial dashboard
    loadModule('dashboard', null);

    // Attach sidebar header buttons
    attachSidebarHeaderButtons();
});

// Sidebar Header Buttons
function attachSidebarHeaderButtons() {
    const headerBtns = document.querySelectorAll('.sidebar-header-btn');
    
    headerBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const themeBtn = document.querySelector('.theme-toggle');
            
            switch(index) {
                case 0: // Theme toggle
                    if (themeBtn) themeBtn.click();
                    break;
                case 1: // Open ticket
                    openTicket();
                    break;
                case 2: // Notifications
                    showNotifications();
                    break;
                case 3: // Direct messages
                    openMessages();
                    break;
            }
        });
    });
}

function openTicket() {
    alert('Funcionalidade para abrir chamado será implementada em breve');
}

function showNotifications() {
    alert('Notificações - funcionalidade será implementada em breve');
}

function openMessages() {
    alert('Mensagens - funcionalidade será implementada em breve');
}

// Settings Modal
function openSettings() {
    document.getElementById('settingsModal').classList.add('active');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

// Close modal on backdrop click
document.addEventListener('click', function(event) {
    const modal = document.getElementById('settingsModal');
    if (event.target === modal) {
        closeSettings();
    }
});

// User Dropdown Menu
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function changeProfilePhoto() {
    alert('Funcionalidade para trocar foto será implementada em breve');
    toggleUserDropdown();
}

function changePassword() {
    alert('Funcionalidade para alterar senha será implementada em breve');
    toggleUserDropdown();
}

// Logout
function logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authenticated');
    window.location.href = 'index.html';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu-clickable');
    const dropdown = document.getElementById('userDropdown');
    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});
