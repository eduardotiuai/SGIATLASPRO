# 🧪 Guia de Teste - Nova Estrutura

## ✅ Estrutura Verificada e Pronta

### Arquivos Confirmados em Produção

```
✅ public_html/
   ├── index.html (195 lines)
   ├── dashboard.html (405 lines)
   ├── .htaccess (65 lines - rewrite rules + security)
   ├── favicon.svg (602 bytes)
   └── assets/
       ├── css/
       │   └── main.css ✅
       └── js/
           ├── auth.js ✅
           ├── modules.js ✅
           └── sidebar.js ✅

✅ app/
   ├── Controllers/
   ├── Services/
   └── Middleware/

✅ config/
   ├── database.php (placeholder)
   └── constants.php (placeholder)

✅ storage/
   ├── logs/
   ├── cache/
   ├── sessions/
   └── uploads_private/
```

---

## 🚀 Teste Local (Sem Servidor)

### Opção 1: PHP Built-in Server (Recomendado)

```bash
# Terminal no diretório raiz
cd c:/Users/djkyk/OneDrive/Desktop/SGIATLASPRO

# Inicia servidor PHP apontando public_html como raiz
php -S localhost:8000 -t public_html

# Acessa no navegador
# http://localhost:8000
```

Você verá a página de login. Credenciais de teste:
- **Email**: usuario@tiiuai.com.br
- **Senha**: 123456

### Opção 2: Apache Local (Windows - XAMPP/WAMP)

**No XAMPP (Recomendado):**

1. Copiar pasta `SGIATLASPRO` para `C:\xampp\htdocs\`
2. Editar `C:\xampp\apache\conf\extra\httpd-vhosts.conf`:

```apache
<VirtualHost *:80>
    ServerName sgiatlaspro.local
    DocumentRoot "C:/xampp/htdocs/SGIATLASPRO/public_html"
    
    <Directory "C:/xampp/htdocs/SGIATLASPRO/public_html">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

3. Adicionar em `C:\Windows\System32\drivers\etc\hosts`:

```
127.0.0.1    sgiatlaspro.local
```

4. Reiniciar Apache
5. Abrir no navegador: **http://sgiatlaspro.local**

---

## 🧪 Teste de Funcionalidades

### 1️⃣ Login
```
Email: usuario@tiiuai.com.br
Senha: 123456
↓
✅ Redirect para dashboard com session token
```

### 2️⃣ Dashboard
```
✅ Sidebar visível (recolhível/expandível)
✅ 18 modules na lista
✅ User profile no header (avatar + nome)
✅ Settings modal funciona
```

### 3️⃣ Sidebar Toggle
```
Click no ícone ☰ ou 'Collapse'
↓
✅ Sidebar com/sem labels
✅ Estado persiste no localStorage
✅ Ao recarregar página → mantém estado
```

### 4️⃣ Módulos
```
Click em qualquer módulo
↓
✅ Carrega página do módulo dinamicamente (sem reload)
✅ Se em desenvolvimento → mostra página "Em Construção"
✅ Se ativo → carrega conteúdo
```

### 5️⃣ Logout
```
Menu usuário → Logout
↓
✅ Session limpa do localStorage
✅ Redirect para página de login
✅ Botão voltar não volta ao dashboard (sessão expirada)
```

---

## 🔐 Teste de Segurança

### 1️⃣ Acesso Direto a Pastas Protegidas

```
❌ Tentar acessar (DEVE BLOQUEAR):
http://localhost:8000/app/
http://localhost:8000/config/
http://localhost:8000/storage/
http://localhost:8000/backend/

Resultado Esperado: **Error 403 Forbidden** ou similar
```

### 2️⃣ Verificar .htaccess Rules
```bash
# Listar arquivo
cat public_html/.htaccess

# Deve conter:
# ✅ RewriteRule ^(?!assets/).*$ index.html [QSA,L]
# ✅ Cache control headers
# ✅ Security headers (X-Content-Type-Options, etc)
# ✅ Compression settings (deflate)
```

### 3️⃣ Verificar Paths Relativos

```html
<!-- Verificar no index.html e dashboard.html -->
<script src="assets/js/auth.js"></script>     ✅
<!-- NÃO DEVE SER: -->
<script src="/js/auth.js"></script>           ❌
<script src="js/auth.js"></script>            ❌
```

---

## 📊 Checklist de Teste

### Antes de Deploy

- [ ] Login funciona com credenciais corretas
- [ ] Logout limpa sessão
- [ ] Sidebar toggle persiste no localStorage
- [ ] Módulos carregam dinamicamente
- [ ] CSS está sendo carregado (não vê "sem estilos")
- [ ] Favicon.svg aparece na aba do navegador
- [ ] Acesso a `/app`, `/config`, `/storage` retorna 403
- [ ] Assets (JS/CSS) carregam corretamente (sem 404)
- [ ] Recarregar página não perde sessão (sessionStorage)
- [ ] Mobile responsive (teste em device emulator)

### Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| **404 favicon.ico** | Asset não encontrado | ✅ Resolvido (favicon.svg presente) |
| **403 Forbidden** | DocumentRoot errado | Apontar para `public_html/` |
| **CSS não carrega** | Path errado | Verificar `assets/css/main.css` |
| **JS não funciona** | Path errado | Verificar `assets/js/*.js` |
| **SPA não redireciona** | .htaccess inativo | Habilitar `mod_rewrite` no Apache |
| **Módulo mostra 404** | Sem backend de verdade | Normal para agora (mock = construção) |

---

## 🌐 Teste Remoto (Deploy)

Uma vez no servidor:

1. Apontar
 DocumentRoot para `/home/user/sgiatlaspro/public_html`
2. Passar `.env` com credenciais BD
3. Executar setup do banco de dados (quando implementado)
4. Acessar `https://seudominio.com` (com HTTPS!)

---

## 📝 Logs de Teste

Se algo não funcionar, verificar:

```bash
# Logs de PHP (se usando PHP-FPM)
tail -f /var/log/php-fpm.log

# Logs de Apache
tail -f /var/log/apache2/error.log
tail -f /var/log/apache2/access.log

# Logs da aplicação (quando implementado)
tail -f storage/logs/app.log
```

---

## ✨ Próximas Melhorias

1. **Backend API Real**
   - `app/Controllers/AuthController.php` → JWT real
   - `app/Controllers/ModuleController.php` → Endpoints dos módulos

2. **Banco de Dados**
   - `config/database.php` → Conectar MariaDB
   - Migrations para tabelas

3. **Email (Resend)**
   - `config/mail.php` → Configure API key
   - Enviar confirmação de login

4. **Autenticação Melhorada**
   - JWT com refresh token
   - 2FA (Two-factor authentication)
   - OAuth com Google/Microsoft

---

**Status**: ✅ Pronto para Teste Local  
**Data**: March 2026  
**Versão**: 1.0.0 Beta
