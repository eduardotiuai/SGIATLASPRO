# SGI ATLAS - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Open the Application
Navigate to your browser and open:
```
http://localhost/sgiatlaspro/public/
```

### Step 2: Login
Use these demo credentials:
- **Email**: `usuario@tiiuai.com.br`
- **Password**: `123456`

### Step 3: Explore the Dashboard
- You'll see the clean, modern dashboard with a collapsible sidebar
- Click any module in the sidebar to see the "Under Construction" page
- Each module is being actively developed

---

## 📁 Project Structure

```
sgiatlaspro/
├── public/              # Website root (accessible to users)
│   ├── index.html      # Login page
│   ├── dashboard.html  # Main application
│   ├── css/
│   │   ├── main.css    # Custom styles
│   │   └── tailwind.css (Tailwind CSS)
│   ├── js/
│   │   ├── auth.js     # Authentication
│   │   ├── sidebar.js  # Sidebar interactions
│   │   └── modules.js  # Module management
│   └── img/            # Images & assets
│
├── backend/            # Backend code (NOT accessible directly)
│   ├── api/            # API endpoints
│   ├── config/         # Configuration
│   └── utils/          # Utilities
│
├── docs/               # Documentation
│   ├── API.md          # API documentation
│   ├── SETUP.md        # Installation guide
│   └── ARCHITECTURE.md # System design
│
└── README.md           # Project overview
```

---

## 🎯 Main Features (Current)

✅ **Login Page**
- Clean, modern design (macOS/iOS style)
- Demo credentials with mock users
- Multi-tenant support

✅ **Dashboard**
- Reusable sidebar (collapsible)
- User profile section
- Quick stats cards
- Module navigation

✅ **Sidebar**
- 18 modules organized in 5 categories
- Expandable/collapsible
- Active module highlighting
- User profile + logout

✅ **All 18 Modules**
- Each shows "Under Construction" page
- Professional status page
- Progress indicator
- "Notify me" functionality

---

## 📱 Available Modules (18 Total)

### **Administrativo** (3)
1. **Dashboard** - System overview
2. **Cadastros** - Master data (clients, suppliers, products)
3. **Configurações** - System settings & user management

### **Comercial** (3)
4. **Comercial** - Sales & proposals
5. **Licitações** - Bidding/auction management
6. **Contratos** - Contract management

### **Financeiro** (3)
7. **Financeiro** - Financial management & cash flow
8. **Faturamento** - Billing & invoicing
9. **Controladoria** - Control & strategic analysis

### **Operação** (3)
10. **Operação** - Operational planning
11. **Manutenção** - Maintenance management
12. **Qualidade** - Quality control

### **Supply Chain** (6)
13. **Compras** - Purchase orders
14. **Estoque** - Inventory management
15. **Almoxarifado** - Warehouse management
16. **Logística** - Delivery & logistics
17. **Suprimentos** - Supply management
18. **Frotas** - Fleet management

### **Serviços** (1)
19. **Atendimentos** - Customer support tickets

---

## 🔐 Default Users for Testing

| Email | Password | Role | Company |
|-------|----------|------|---------|
| `usuario@tiiuai.com.br` | `123456` | Admin | TI UAI |
| `gerente@tiiuai.com.br` | `123456` | Manager | TI UAI |
| `usuario@empresa.com.br` | `123456` | User | Empresa XYZ |

---

## 💻 Technology Stack

**Frontend**
- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (Vanilla - no frameworks)
- Font Awesome icons

**Backend** (Prepared)
- PHP 8.0+
- MariaDB/MySQL
- JWT Authentication
- REST API

**Key Features**
- ✨ Clean, modern design
- 🎨 Responsive layout
- ⚡ Smooth transitions
- 🔐 Multi-tenant ready
- 📱 Mobile friendly
- 🌙 Dark mode ready (easy to add)

---

## 🔧 Configuration Files

### `.env.example`
Copy and rename to `.env`:
```bash
cp .env.example .env
```

Edit with your settings:
- Database credentials
- API URLs
- JWT secret key
- Email configuration

### `public/.htaccess`
- URL rewriting for clean URLs
- Security headers
- Cache control
- Compression

### `backend/.htaccess`
- Protects backend from direct access
- Routes API requests properly

---

## 📝 Using the System

### Login
1. Go to `http://localhost/sgiatlaspro/public/`
2. Enter demo credentials
3. Click "Acessar Sistema"

### Navigate Modules
1. Click any module in the left sidebar
2. The main content area updates
3. For modules under construction, see the status page

### Toggle Sidebar
- Click the chevron icon (< >) at the top of the sidebar
- Sidebar collapses/expands smoothly
- State is saved in localStorage

### User Profile
- View user info in the sidebar bottom
- Click gear icon for settings (demo only)
- Click "Sair" to logout

---

## 🔄 Future Database Integration

When moving to production database:

1. **Update .env file**
   ```
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASS=your_pass
   DB_NAME=sgi_atlas
   ```

2. **Create database**
   ```sql
   CREATE DATABASE sgi_atlas CHARACTER SET utf8mb4;
   ```

3. **Run migrations** (when available)
   ```bash
   php backend/migrations/run.php
   ```

4. **Update backend APIs** to use real database instead of mock data

---

## 📧 Email Integration (Future)

To integrate Resend API:

1. Get API key from [Resend.com](https://resend.com)
2. Add to `.env`:
   ```
   RESEND_API_KEY=your_key_here
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

3. Uncomment email functions in backend

---

## 🐛 Troubleshooting

### Blank page or 404
- Check that files are in correct location
- Verify Apache mod_rewrite is enabled
- Check browser console for JavaScript errors

### Sidebar not working
- Clear browser cache (Ctrl+Shift+Delete)
- Check JavaScript console for errors
- Verify localStorage is enabled

### Modules not loading
- Check that modules.js is included
- Verify moduleConfig object is defined
- Check network tab for failed requests

### Login not working
- Check that sessionStorage is enabled
- Verify auth.js is loaded
- Check console for specific errors

---

## 📚 Documentation Files

1. **README.md** - Project overview
2. **docs/SETUP.md** - Installation & deployment
3. **docs/API.md** - API documentation
4. **docs/ARCHITECTURE.md** - System architecture
5. **QUICKSTART.md** - This file

---

## 🎨 Design Features

### Colors (Tailwind)
- Primary Blue: `#0066cc`
- Light Background: `#f8f9fa`
- Borders: `#e9ecef`

### Icons
- Font Awesome 6.4.0
- 18 different icons for modules
- Smooth animations on hover

### Transitions
- All animationsuse `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Smooth sidebar collapse/expand
- Card hover effects

### Responsive
- Desktop: Full width layout
- Tablet: Adjusted spacing
- Mobile: Single column, full width buttons

---

## 💡 Next Steps

1. **Customize**: Update colors and theme in CSS
2. **Add Modules**: Implement module screens
3. **Connect Backend**: Link to real PHP/MySQL APIs
4. **Setup Email**: Configure Resend integration
5. **Production Deploy**: Follow SETUP.md guide

---

## 🆘 Support

For questions or issues:
- Check documentation in `docs/` folder
- Review comments in source files
- Check browser developer console for errors
- Email: contato@tiiuai.com.br

---

**Version**: 1.0.0 Beta
**Last Updated**: March 2026
**Company**: TI UAI

Start exploring SGI ATLAS! 🚀
