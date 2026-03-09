# SGI ATLAS - Estrutura de Diretórios Otimizada

## 📁 Estrutura do Projeto (Segura e Escalável)

```
SGIATLASPRO/                          # Raiz do projeto
│
├── public_html/                      # 🌐 Frontend Público (Document Root)
│   ├── index.html                    # Página de login
│   ├── dashboard.html                # Dashboard principal
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css             # Estilos customizados
│   │   │   └── ...
│   │   ├── js/
│   │   │   ├── auth.js              # Autenticação
│   │   │   ├── sidebar.js           # Sidebar
│   │   │   ├── modules.js           # Módulos
│   │   │   └── ...
│   │   └── img/
│   │       └── ...
│   ├── uploads/                      # Arquivos públicos do usuário
│   ├── favicon.svg                   # Ícone do site
│   └── .htaccess                    # Rewrite rules e segurança
│
├── app/                             # 🔧 Código da Aplicação (Protegido)
│   ├── Controllers/                 # Controllers
│   ├── Services/                    # Serviços
│   ├── Middleware/                  # Middlewares
│   └── ...
│
├── config/                          # ⚙️ Configurações (Protegido)
│   ├── database.php                 # BD
│   ├── constants.php                # Constantes
│   └── ...
│
├── storage/                         # 💾 Armazenamento (Protegido)
│   ├── logs/                        # Logs da aplicação
│   ├── cache/                       # Cache
│   ├── sessions/                    # Sessões
│   └── uploads_private/             # Uploads privados
│
├── docs/                            # 📚 Documentação
│   ├── API.md
│   ├── SETUP.md
│   └── ARCHITECTURE.md
│
├── backend/                         # 🔐 Backend Legado (será migrado)
│   ├── api/
│   ├── config/
│   ├── utils/
│   └── index.php
│
├── .env                             # Variáveis de ambiente (Git ignored)
├── .env.example                     # Template de .env
├── .gitignore                       # Git ignore rules
├── README.md                        # Este arquivo
└── QUICKSTART.md                    # Guia rápido
```

---

## 🔐 Segurança: O Que é Público vs Privado

### ✅ PUBLIC_HTML (Acessível via Browser)
```
http://seudominio.com/                    → index.html
http://seudominio.com/dashboard.html      → dashboard.html
http://seudominio.com/assets/js/auth.js   → Arquivos de assets
http://seudominio.com/uploads/file.pdf    → Uploads públicos
```

### 🔒 APP, CONFIG, STORAGE (Protegido)
```
❌ NAÃ ACESSÍVEL:
http://seudominio.com/app/Controllers/    → Erro 403
http://seudominio.com/config/database.php → Erro 403
http://seudominio.com/storage/logs/
→ Erro 403
```

---

## 🌐 Configuração do Servidor

### Apache (Recomendado)

Apontarypte o `DocumentRoot` para a pasta `public_html`:

```apache
<VirtualHost *:80>
    ServerName sgiatlaspro.local
    DocumentRoot /var/www/sgiatlaspro/public_html
    
    <Directory /var/www/sgiatlaspro/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Proteger acesso a pastas sensíveis
    <Directory /var/www/sgiatlaspro/app>
        Deny from all
    </Directory>
    
    <Directory /var/www/sgiatlaspro/config>
        Deny from all
    </Directory>
    
    <Directory /var/www/sgiatlaspro/storage>
        Deny from all
    </Directory>
</VirtualHost>
```

### Nginx (Alternativa)

```nginx
server {
    listen 80;
    server_name sgiatlaspro.local;
    root /var/www/sgiatlaspro/public_html;
    
    # Deny access to sensitive folders
    location ~ ^/(app|config|storage)/ {
        deny all;
    }
    
    # Rewrite for SPA
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
```

---

## 🚀 Como Começar

### 1. Clonar Repositório
```bash
git clone https://github.com/eduardotiuai/SGIATLASPRO.git
cd SGIATLASPRO
```

### 2. Configurar Ambiente
```bash
cp .env.example .env
nano .env  # Editar com suas configurações
```

### 3. Instalar Dependências (opcional)
```bash
composer install  # Se usar PHP puro, não é necessário
npm install       # Se usar build tools
```

### 4. Configurar Servidor
- Apontar `DocumentRoot` para `/public_html`
- Habilitar `mod_rewrite` no Apache
- Definir permissões corretas (755 para pastas, 644 para arquivos)

### 5. Acessar
```
http://localhost/sgiatlaspro/   → Será redirecionado ao login
```

---

## 📋 Checklist de Segurança

- [ ] `.env` não está em `public_html`
- [ ] Pastas `app/`, `config/`, `storage/` retornam erro 403
- [ ] `public_html/.htaccess` está configurado
- [ ] Permissões: 755 para pastas, 644 para arquivos
- [ ] `DocumentRoot` aponta para `public_html/`
- [ ] `.htaccess` no `config/` ou `app/` bloqueia acesso direto
- [ ] `storage/uploads_private/` está protegido

---

## 🔄 Migração de Backend

### De: `/backend` (Arquivo Antigo)
### Para: `/app`, `/config`, `index.php` na raiz

```php
// Antes (caminho antigo)
../backend/api/auth.php

// Depois (novo padrão)
../app/Controllers/AuthController.php
../config/Database.php
```

---

## 📚 Arquivos Importantes

- **QUICKSTART.md** - Guia rápido para começar
- **docs/SETUP.md** - Instalação completa
- **docs/API.md** - API endpoints
- **docs/ARCHITECTURE.md** - Arquitetura do sistema

---

## 🆘 Troubleshooting

### Erro 403 Forbidden
1. Verificar se `DocumentRoot` aponta para `public_html/`
2. Confirmar que `.htaccess` está no lugar correto
3. Habilitar `mod_rewrite`: `a2enmod rewrite && systemctl restart apache2`
4. Verificar permissões: `chmod 755 public_html`

### Erro 404 ao acessar Dashboard
1. Verificar se `.htaccess` contém rewrite para SPA
2. Limpar cache do navegador (Ctrl+Shift+Delete)
3. Verificar `AllowOverride All` na configuração do Apache

### Arquivos não carregam (CSS/JS)
1. Verificar se arquivos estão em `public_html/assets/`
2. Confirmar paths relativos: `assets/js/auth.js` (não `/js/`)
3. Criar symlink se necessário (para assets CDN)

---

## 🎯 Próximos Passos

1. **Testar** a estrutura em um servidor
2. **Integrar** banco de dados MariaDB
3. **Implementar** APIs reais em PHP
4. **Adicionar** validação de tokens JWT
5. **Configurar** HTTPS/SSL
6. **Deploy** em produção

---

**Versão**: 1.0.0 Beta  
**Estrutura Otimizada**: March 2026  
**Desenvolvido por**: TI UAI
