<?php
/**
 * SGI ATLAS - Backend Router
 * Routes API requests to appropriate handlers
 */

header('Content-Type: application/json');

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Router logic
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = array_filter(explode('/', $path));

// Get module and action from URL
$moduleKey = null;
$actionKey = null;

if (count($pathParts) >= 3) {
    // Extract from URL pattern: /api/{module}/{action}
    $moduleKey = $pathParts[count($pathParts) - 2] ?? null;
    $actionKey = $pathParts[count($pathParts) - 1] ?? null;
}

// Default response
$response = [
    'success' => false,
    'error' => 'Invalid API endpoint',
    'message' => 'Use GET /api/auth or POST /api/modules/{module}'
];

// Route to appropriate handler
if ($moduleKey === 'auth') {
    // Authentication endpoints
    require_once __DIR__ . '/api/auth.php';
} elseif ($moduleKey === 'modules' && $actionKey) {
    // Module endpoints
    require_once __DIR__ . '/api/modules.php';
} else {
    http_response_code(404);
}

echo json_encode($response);
?>
