# SGI ATLAS - Setup & Installation Guide

## System Requirements

- **PHP**: 8.0 or higher
- **Database**: MariaDB 10.4+ or MySQL 5.7+
- **Web Server**: Apache 2.4+ with mod_rewrite enabled
- **Node.js** (optional): 16+ for build tools
- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)

## Quick Start

### 1. Prerequisites
```bash
# Verify PHP version
php -v

# Verify MariaDB/MySQL installed
mysql --version
```

### 2. Clone or Download Project
```bash
cd /var/www/html
wget https://github.com/tiiuai/sgi-atlas/archive/main.zip
unzip main.zip
cd sgiatlaspro
```

### 3. Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your settings
nano .env
```

Update these critical values:
```
APP_ENV=production
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=sgi_atlas
JWT_SECRET=your-super-secret-key
RESEND_API_KEY=your-resend-api-key
```

### 4. Database Setup
```bash
# Create database
mysql -u root -p << EOF
CREATE DATABASE sgi_atlas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON sgi_atlas.* TO 'sgi_atlas'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
EOF

# Run migrations (when available)
php backend/migrations/run.php
```

### 5. Web Server Configuration

#### Apache Virtual Host
```apache
<VirtualHost *:80>
    ServerName sgiatlaspro.local
    ServerAlias *.sgiatlaspro.local
    DocumentRoot /var/www/html/sgiatlaspro/public

    <Directory /var/www/html/sgiatlaspro/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    <Directory /var/www/html/sgiatlaspro/backend>
        Deny from all
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/sgiatlaspro-error.log
    CustomLog ${APACHE_LOG_DIR}/sgiatlaspro-access.log combined
</VirtualHost>
```

Enable the site:
```bash
a2ensite sgiatlaspro
a2enmod rewrite
systemctl restart apache2
```

### 6. File Permissions
```bash
# Set proper permissions
chown -R www-data:www-data /var/www/html/sgiatlaspro
chmod -R 755 /var/www/html/sgiatlaspro
chmod -R 775 /var/www/html/sgiatlaspro/uploads
chmod -R 775 /var/www/html/sgiatlaspro/logs
```

### 7. Access the Application
```
http://localhost/sgiatlaspro/public/
```

**Demo Credentials:**
- Email: `usuario@tiiuai.com.br`
- Password: `123456`

---

## Development Setup

### Using Docker (Recommended)

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    image: php:8.1-apache
    ports:
      - "80:80"
    volumes:
      - .:/var/www/html
    environment:
      - MYSQL_HOST=db
      - MYSQL_USER=sgi_user
      - MYSQL_PASSWORD=password
      - MYSQL_DATABASE=sgi_atlas

  db:
    image: mariadb:10.6
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=sgi_atlas
      - MYSQL_USER=sgi_user
      - MYSQL_PASSWORD=password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

Run:
```bash
docker-compose up -d
```

### Local Development

```bash
# Install PHP dependencies (when Composer is used)
composer install

# Set up local database
mysql -u root -p < database/schema.sql

# Configure .env for development
cp .env.example .env
nano .env  # Set APP_ENV=development

# Start PHP built-in server (if no Apache)
php -S localhost:8000 -t public/
```

---

## Project Structure

```
sgiatlaspro/
├── public/                    # Web root - accessible to users
│   ├── index.html            # Login page
│   ├── dashboard.html        # Main dashboard
│   ├── css/
│   │   ├── tailwind.css      # Tailwind CSS
│   │   └── main.css          # Custom styles
│   ├── js/
│   │   ├── auth.js           # Authentication logic
│   │   ├── sidebar.js        # Sidebar interactions
│   │   └── modules.js        # Module management
│   └── img/                  # Images & assets
│
├── backend/                   # Backend code - NOT directly accessible
│   ├── config/
│   │   └── database.php      # Database configuration
│   ├── api/
│   │   ├── auth.php          # Authentication endpoints
│   │   └── modules.php       # Generic module API
│   ├── utils/
│   │   └── MultiTenant.php   # Multi-tenant utilities
│   └── .htaccess             # Security & rewrites
│
├── docs/                      # Documentation
│   ├── API.md                # API Documentation
│   ├── SETUP.md              # Setup guide
│   └── ARCHITECTURE.md       # System architecture
│
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
└── README.md                 # Project overview
```

---

## Security Checklist

- [ ] Change `JWT_SECRET` in .env to a strong random string
- [ ] Set `APP_DEBUG=false` in production
- [ ] Use HTTPS in production (`SESSION_SECURE=true`)
- [ ] Set restrictive file permissions
- [ ] Regularly update dependencies
- [ ] Backup database regularly
- [ ] Enable Web Application Firewall (WAF)
- [ ] Set up CORS properly for your domain
- [ ] Implement rate limiting on API
- [ ] Use strong database passwords
- [ ] Enable 2FA for admin accounts

---

## Troubleshooting

### Blank Page or 500 Error
1. Check `APP_DEBUG=true` in .env
2. Check PHP logs: `tail -f /var/log/apache2/error.log`
3. Verify database connection in .env

### Database Connection Error
```bash
# Test connection
mysql -h localhost -u sgi_atlas -p sgi_atlas -e "SELECT 1"

# Check credentials in .env match
```

### 403 Forbidden
```bash
# Check permissions
ls -la /var/www/html/sgiatlaspro/

# Should be owned by www-data:www-data
```

### mod_rewrite Not Working
```bash
# Enable mod_rewrite
a2enmod rewrite

# Restart Apache
systemctl restart apache2
```

### jwt_auth Issues
Make sure `backend/` is not directly accessible. Check .htaccess is in place.

---

## Additional Resources

- [PHP Documentation](https://www.php.net/docs.php)
- [MariaDB Documentation](https://mariadb.com/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JWT Introduction](https://jwt.io/)

---

## Support & Contact

**TI UAI Development Team**
- Email: contato@tiiuai.com.br
- GitHub: https://github.com/tiiuai

---

**Version**: 1.0.0 Beta
**Last Updated**: March 2026
