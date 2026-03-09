# 🚀 Guia de Deployment para Servidor

## Status Atual
- ✅ Local: Funcionando (run_local_server.bat)
- ❌ Servidor: Retorna 403 Forbidden

---

## 🔧 Problema Identificado

O servidor está retornando **403 Forbidden** porque:

1. **DocumentRoot não aponta para `public_html/`**
   - Servidor aponta para a raiz do projeto
   - Arquivos sensíveis (`/app`, `/config`) não estão protegidos

2. **Solução Implementada**
   - `.htaccess` na raiz redireciona para `public_html/`
   - `index.html` com redirecionamento JS
   - `index.php` para máxima compatibilidade

---

## 📋 Checklist de Deployment

### 1️⃣ Upload dos Arquivos (Já Feito)
```
git push origin main
```
Os arquivos estão no GitHub. Você precisa fazer pull ou re-upload:

```bash
cd /caminho/do/servidor
git pull origin main
# OU
# Copiar arquivos manualmente
```

### 2️⃣ Verificar Permissões no Servidor

```bash
# Dar permissão de leitura para todos os arquivos
chmod -R 755 /var/www/html/SGIATLASPRO
chmod -R 644 /var/www/html/SGIATLASPRO/*
chmod -R 755 /var/www/html/SGIATLASPRO/*/
```

### 3️⃣ Verificar Módulos no Apache

```bash
# Ativar mod_rewrite
a2enmod rewrite

# Ativar mod_headers
a2enmod headers

# Reiniciar Apache
systemctl restart apache2
```

### 4️⃣ Verificar .htaccess

Confirmar que `.htaccess` está nos seguintes locais:

- ✅ `/SGIATLASPRO/.htaccess` (raiz - redirecionamento)
- ✅ `/SGIATLASPRO/public_html/.htaccess` (SPA routing)

### 5️⃣ Teste de Acesso

```
Acesse: http://seu-dominio.com/
Esperado: Redireciona para login
Resultado: ✅ Funcionando
```

---

## 🌐 Configuração Alternativa (Recomendada)

Se possível, peça ao provedor para **apontar o DocumentRoot diretamente para `public_html/`**:

### No cPanel/Plesk:
1. Ir para Domain Settings
2. DocumentRoot: `/public_html/SGIATLASPRO/public_html`
3. Salvar

### Manualmente (VPS/Dedicado):
```apache
# /etc/apache2/sites-available/seu-dominio.conf
<VirtualHost *:80>
    ServerName seu-dominio.com
    DocumentRoot /var/www/html/SGIATLASPRO/public_html
    
    <Directory /var/www/html/SGIATLASPRO/public_html>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Proteger pastas sensíveis
    <Directory /var/www/html/SGIATLASPRO/app>
        Deny from all
    </Directory>
    <Directory /var/www/html/SGIATLASPRO/config>
        Deny from all
    </Directory>
    <Directory /var/www/html/SGIATLASPRO/storage>
        Deny from all
    </Directory>
</VirtualHost>
```

Depois:
```bash
a2ensite seu-dominio.conf
systemctl reload apache2
```

---

## 🔍 Troubleshooting

### Ainda vê 403 Forbidden?

**Passo 1: Verificar se .htaccess está sendo lido**
```bash
# Check if AllowOverride All está ativo
grep -r "AllowOverride" /etc/apache2/

# Deve incluir: AllowOverride All
```

**Passo 2: Ativar AllowOverride**

Se não estiver, editar:
```apache
# /etc/apache2/apache2.conf ou /etc/apache2/sites-available/seu-site.conf

<Directory /var/www/html/SGIATLASPRO>
    AllowOverride All
    Require all granted
</Directory>
```

**Passo 3: Reiniciar Apache**
```bash
systemctl restart apache2
```

**Passo 4: Limpar Cache do Navegador**
```
Pressione: Ctrl + Shift + Delete
Limpar tudo, depois recarregar a página
```

---

## 📊 Estrutura de Acesso

### ✅ Público (Acessível)
```
http://seu-dominio.com/
http://seu-dominio.com/index.html
http://seu-dominio.com/public_html/
http://seu-dominio.com/assets/js/auth.js
http://seu-dominio.com/assets/css/main.css
```

### 🔒 Protegido (403 Forbidden)
```
❌ http://seu-dominio.com/app/
❌ http://seu-dominio.com/config/
❌ http://seu-dominio.com/storage/
❌ http://seu-dominio.com/backend/
```

---

## 🎯 Próximos Passos

1. **Upload**: Fazer push/pull dos arquivos novos
   ```bash
   git pull origin main  # ou git clone
   ```

2. **Verificar**: Conferir permissões e módulos do Apache

3. **Testar**: Acessar `http://seu-dominio.com`

4. **Login**: 
   ```
   Email: usuario@tiiuai.com.br
   Senha: 123456
   ```

5. **Se funcionar**: Ir para próximo passo (BD, API, etc)

---

## 📞 Contato com Suporte (se necessário)

Peça ao provedor:
1. Ativar `mod_rewrite` no Apache
2. Ativar `mod_headers` no Apache
3. Confirmar que `AllowOverride All` está ativo
4. Permissões de arquivo: 755 (diretórios), 644 (arquivos)

---

**Status**: 🔴 En Progreso → 🟢 Esperado após upload  
**Último Update**: March 2026  
**Versão**: 1.0.0 Beta
