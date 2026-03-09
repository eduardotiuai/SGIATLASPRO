<?php
// ================================================
// SGI ATLAS - Root Index PHP
// Redirect to public_html/
// ================================================

// Detect if request is for public_html already
if (strpos($_SERVER['REQUEST_URI'], '/public_html/') === 0) {
    // Already in public_html, let it handle itself
    require_once 'public_html/index.html';
    exit;
}

// For API requests, check if they should go to public_html/api/
if (strpos($_SERVER['REQUEST_URI'], '/api/') === 0) {
    // Route API through public_html/.htaccess to backend
    $_GET['api'] = substr($_SERVER['REQUEST_URI'], 5);
    require_once 'public_html/index.html';
    exit;
}

// For everything else, redirect to public_html
header('Location: /public_html/', true, 301);
exit;
?>
