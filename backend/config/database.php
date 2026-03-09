<?php
/**
 * SGI ATLAS - Database Configuration
 * Developed by: TI UAI
 * Version: 1.0.0
 */

// Environment configuration
define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('APP_DEBUG', APP_ENV === 'development');

// Database Configuration
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'sgi_atlas');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATION', 'utf8mb4_unicode_ci');

// API Configuration
define('API_URL', getenv('API_URL') ?: 'http://localhost/sgiatlaspro/backend/api');
define('FRONTEND_URL', getenv('FRONTEND_URL') ?: 'http://localhost/sgiatlaspro/public');

// Email Configuration (Resend API)
define('RESEND_API_KEY', getenv('RESEND_API_KEY') ?: '');
define('RESEND_API_URL', 'https://api.resend.com');

// Security
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'your-secret-key-change-in-production');
define('JWT_ALGORITHM', 'HS256');
define('JWT_EXPIRY', 3600); // 1 hour

// Multi-tenant Configuration
define('MULTI_TENANT_ENABLED', true);

// CORS Configuration
define('ALLOWED_ORIGINS', [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost/sgiatlaspro',
    'http://127.0.0.1'
]);

// Create PDO connection
function getPDOConnection() {
    try {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
        
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        if (APP_DEBUG) {
            throw new Exception('Database connection error: ' . $e->getMessage());
        } else {
            throw new Exception('Database connection error');
        }
    }
}

// Error Handler
function errorHandler($errno, $errstr, $errfile, $errline) {
    if (APP_DEBUG) {
        error_log("Error [$errno]: $errstr in $errfile on line $errline");
    }
}

set_error_handler('errorHandler');
?>
