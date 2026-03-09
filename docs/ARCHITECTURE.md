# SGI ATLAS - System Architecture

## Overview

SGI ATLAS é um sistema empresarial multi-tenant construído com:
- **Frontend**: HTML5, CSS (Tailwind), JavaScript vanilla
- **Backend**: PHP 8.0+
- **Database**: MariaDB/MySQL
- **Architecture**: MVC + API REST

---

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT BROWSER                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  HTML5 | CSS (Tailwind) | JavaScript                    ││
│  │  - Login Page (index.html)                              ││
│  │  - Dashboard (dashboard.html)                           ││
│  │  - Module Pages (dynamic)                               ││
│  └─────────────────────────────────────────────────────────┘│
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/HTTPS
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                   WEB SERVER (Apache)                        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ mod_rewrite | mod_deflate | Security Headers           ││
│  │ SSL/TLS     | CORS Config | Rate Limiting              ││
│  └─────────────────────────────────────────────────────────┘│
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼────────┐          ┌────────▼───────┐
│   PUBLIC DIR   │          │  BACKEND DIR   │
│ (Accessible)   │          │  (Protected)   │
├────────────────┤          ├────────────────┤
│ ├─ *.html      │          │ ├─ config/     │
│ ├─ css/        │          │ │  └─ database │
│ ├─ js/         │          │ ├─ api/        │
│ └─ img/        │          │ │  ├─ auth     │
│                │          │ │  └─ modules  │
│                │          │ └─ utils/      │
│                │          │    └─ MultiTen │
└────────────────┘          └────────────────┘
                       │
         ┌─────────────┴──────────────┐
         │                            │
         │    API Endpoints (PHP)     │
         │  ┌──────────────────────┐  │
         │  │ /api/auth - Login    │  │
         │  │ /api/modules/* - Ops │  │
         │  │ /api/* - Generic     │  │
         │  └──────────────────────┘  │
         │                            │
         └────────────────┬───────────┘
                          │
        ┌─────────────────┴────────────────┐
        │                                  │
┌───────▼──────────────┐    ┌─────────────▼──────┐
│   AUTHENTICATION     │    │   MULTI-TENANT     │
│  ┌────────────────┐  │    │  ┌──────────────┐  │
│  │ JWT Tokens     │  │    │  │ Domain Check │  │
│  │ Session Mgmt   │  │    │  │ Data Isol.   │  │
│  │ Authorization  │  │    │  │ Tenant Init  │  │
│  └────────────────┘  │    │  └──────────────┘  │
└──────────────────────┘    └────────────────────┘
              │                        │
              │                        │
              └──────────┬─────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
   ┌─────▼──────┐              ┌────────▼────────┐
   │ MariaDB    │              │   File System   │
   │ Database   │              │  - Uploads      │
   │ ├──────    │              │  - Logs         │
   │ ├── Users  │              │  - Cache        │
   │ ├── Tenants│              └─────────────────┘
   │ ├── Modules│
   │ └── Data   │
   └────────────┘
```

---

## Data Flow

### 1. User Login Flow

```
User Input (index.html)
    ↓
JavaScript (auth.js)
    ↓
POST /api/auth (credentials)
    ↓
PHP Auth Class
    ├─ Validate input
    ├─ Check credentials
    ├─ Identify tenant from email domain
    └─ Generate JWT token
    ↓
Return Token + User Data
    ↓
JavaScript Store in sessionStorage
    ↓
Redirect to dashboard.html
```

### 2. Module Access Flow

```
User Clicks Module (sidebar.js)
    ↓
JavaScript calls loadModule(moduleKey)
    ↓
Check module config (modules.js)
    ├─ If dashboard: loadDashboard()
    └─ If under construction: loadConstructionPage()
    ↓
DOM Manipulation
    ↓
Update page title & content
    ↓
User sees page
```

### 3. API Request Flow (Future)

```
User Action (e.g., Create Record)
    ↓
JavaScript (AJAX)
    ├─ Include JWT token in header
    ├─ Send JSON payload
    └─ POST /api/modules/{module}
    ↓
Apache Routes to PHP
    ↓
PHP receives request
    ├─ Validate JWT token
    ├─ Identify tenant from token
    ├─ Validate permissions
    ├─ Sanitize input
    ├─ Execute database operation (with tenant isolation)
    └─ Log action
    ↓
Return JSON response
    ↓
JavaScript processes response
    ├─ Show success/error
    ├─ Update DOM
    └─ Refresh data if needed
```

---

## Multi-Tenant Architecture

### Tenant Identification

```
User Email: usuario@empresa.com.br
            └─→ Domain: empresa.com.br
                └─→ Tenant ID/Config lookup
                    └─→ Database: sgi_atlas_empresa
                        └─→ Isolated data per tenant
```

### Database Structure (Future)

```
sgi_atlas
├── tenants              # Tenant configurations
│   ├── id (PK)
│   ├── domain
│   ├── name
│   └── features
│
├── users                # Users (with tenant_id)
│   ├── id (PK)
│   ├── tenant_id (FK)
│   ├── email
│   ├── name
│   ├── role
│   └── ...
│
├── cadastros            # Records (with tenant_id)
│   ├── id (PK)
│   ├── tenant_id (FK)
│   ├── data
│   └── ...
│
└── audit_logs           # Audit trail (with tenant_id)
    ├── id (PK)
    ├── tenant_id (FK)
    ├── action
    ├── user_id
    └── timestamp
```

---

## Module Architecture

### Available Modules (18 total)

**Administrative (3)**
- Dashboard: System overview
- Cadastros: Master data management
- Configurações: System settings

**Commercial (3)**
- Comercial: Sales & proposals
- Licitações: Bidding processes
- Contratos: Contract management

**Financial (3)**
- Financeiro: Financial management
- Faturamento: Billing & invoicing
- Controladoria: Control & analysis

**Operations (3)**
- Operação: Operational planning
- Manutenção: Maintenance management
- Qualidade: Quality control

**Supply Chain (6)**
- Compras: Purchase orders
- Estoque: Inventory management
- Almoxarifado: Warehouse management
- Logística: Delivery tracking
- Suprimentos: Supply management
- Frotas: Fleet management

**Services (1)**
- Atendimentos: Customer support

### Module Configuration Structure

```javascript
{
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview',
    icon: 'fa-home',
    construction: false  // Active module
  },
  cadastros: {
    title: 'Cadastros',
    subtitle: 'Master data',
    icon: 'fa-address-card',
    construction: true   // Under development
  }
  // ... more modules
}
```

---

## Frontend Architecture

### Component Structure

```
public/
├── index.html          # Entry point (login page)
│   └── js/auth.js      # Authentication logic
│
├── dashboard.html      # main application shell
│   ├── Sidebar
│   │   ├── Logo section
│   │   ├── Menu groups
│   │   └── User profile
│   ├── Header
│   │   ├── Page title
│   │   └── Actions
│   └── Main Content
│       └── Dynamic module loading
│
├── css/
│   ├── tailwind.css    # Tailwind CSS framework
│   └── main.css        # Custom styles
│
└── js/
    ├── auth.js         # Auth & login
    ├── sidebar.js      # Sidebar interactions
    └── modules.js      # Module management
```

### Design System

**Colors**
- Primary: #0066cc (Blue-600)
- Secondary: #6c757d (Gray-600)
- Success: #28a745 (Green)
- Warning: #dc3545 (Red)
- Info: #17a2b8 (Cyan)

**Typography**
- Headers: Sans-serif (system fonts)
- Body: Sans-serif
- Mono: system monospace

**Spacing**
- Uses Tailwind's spacing scale (4px base)
- Padding: 4px, 8px, 12px, 16px, 24px, 32px, etc.
- Margin: Same scale

**Components**
- Buttons: Blue gradient on hover
- Cards: White background, subtle borders
- Inputs: Light gray background, focus blue
- Modals: Overlay with rounded card

---

## Backend Architecture

### API Structure

```
backend/
├── config/
│   └── database.php      # DB config & connection
│
├── api/
│   ├── auth.php          # Authentication endpoints
│   │   ├── login()
│   │   ├── register()
│   │   └── verifyToken()
│   │
│   └── modules.php       # Generic module API
│       ├── getData()
│       ├── create()
│       ├── update()
│       ├── delete()
│       └── search()
│
└── utils/
    └── MultiTenant.php   # Tenant utilities
        ├── initialize()
        ├── getCurrentTenant()
        ├── hasFeature()
        └── validateAccess()
```

### Authentication Flow (JWT)

```
1. User submits login credentials
2. Backend validates against database/mock
3. Backend creates JWT token with payload:
   {
     "iss": "issuer",
     "sub": "user_id",
     "email": "user@domain",
     "role": "admin",
     "company": "TI UAI",
     "iat": timestamp,
     "exp": timestamp + 3600
   }
4. Backend returns token to frontend
5. Frontend includes token in all requests:
   Authorization: Bearer {token}
6. Backend verifies signature on each request
7. Token expires after 1 hour (configurable)
```

---

## Security Architecture

### Authentication
- JWT tokens with HS256 signature
- Token expiry: 1 hour
- Refresh token support (future)
- 2FA support (future)

### Authorization
- Role-based access control (RBAC)
- Tenant-based data isolation
- Feature flags per tenant

### Data Protection
- SQL injection prevention (prepared statements)
- XSS protection (HTML escaping)
- CSRF tokens (future)
- HTTPS enforcement (production)
- Password hashing (bcrypt)

### API Security
- CORS configuration
- Rate limiting (1000/hour default)
- Input validation
- Error message sanitization

---

## Performance Considerations

### Frontend Optimization
- Single Page Application (SPA)
- Minimal JavaScript (~50KB gzipped)
- CSS via Tailwind (purged)
- Lazy loading for modules

### Backend Optimization
- Database connection pooling
- Query optimization with indexes
- Response caching
- Gzip compression enabled

### Database Optimization
- Foreign key constraints
- Proper indexing
- Tenant isolation at query level
- Audit logging

---

## Deployment Architecture

### Production Environment

```
Domain: sgiatlaspro.com.br
  ├─ sgiatlaspro.com.br/           (Redirects to login)
  ├─ sgiatlaspro.com.br/public/    (Frontend - served by Apache)
  │  ├─ index.html     (login)
  │  ├─ dashboard.html (app)
  │  ├─ css/, js/, img/
  │  └─ ...
  │
  └─ sgiatlaspro.com.br/api/       (Backend - routed by .htaccess)
     ├─ /auth         → api/auth.php
     ├─ /modules/*    → api/modules.php
     └─ ...

Backend (protected from direct access)
  ├─ config/           (Not web-accessible via .htaccess)
  ├─ api/              (Routed through index.php)
  └─ utils/            (Not web-accessible)
```

### Scaling Considerations

**Vertical Scaling**
- Increase PHP memory limit
- Optimize database indexes
- Enable query caching

**Horizontal Scaling**
- Load balancer (HAProxy/Nginx)
- Database replication (slave readers)
- Session storage (Redis/Memcached)
- File storage (S3/Cloud Storage)

---

## Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | HTML5 | Latest |
| | CSS | Tailwind 3.x |
| | JavaScript | ES6+ |
| Backend | PHP | 8.0+ |
| Database | MariaDB | 10.4+ |
| Web Server | Apache | 2.4+ |
| Authentication | JWT | HS256 |
| Email (Future) | Resend API | - |
| Container (Optional) | Docker | Latest |

---

## Future Enhancements

1. **Database Integration**
   - Migrate from mock to real database
   - Implement all CRUD operations
   - Add database migrations system

2. **Email System**
   - Integrate Resend API
   - Email templates
   - Queue system for async sending

3. **Real-time Features**
   - WebSocket support (Socket.io)
   - Live notifications
   - Collaborative editing

4. **Advanced Security**
   - 2FA implementation
   - OAuth2 integration
   - API key management
   - Encryption at rest

5. **Performance**
   - GraphQL API (option)
   - Caching layer (Redis)
   - CDN integration for assets

6. **DevOps**
   - CI/CD pipeline (GitHub Actions)
   - Automated testing
   - Monitoring & Logging (ELK Stack)

---

**Version**: 1.0.0 Beta
**Architecture Updated**: March 2026
**Designed by**: TI UAI Development Team
