<?php
/**
 * SGI ATLAS - Generic Module API
 * Base API endpoint for all modules
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/MultiTenant.php';

class ModuleAPI {
    private $db;
    private $tenant;
    private $module;

    public function __construct($module) {
        $this->module = $module;
        // Database will be initialized when ready
        // $this->db = getPDOConnection();
    }

    /**
     * Get module data
     */
    public function getData($filters = []) {
        // Mock data for now
        return [
            'success' => true,
            'data' => [],
            'message' => 'Module ' . $this->module . ' is under construction'
        ];
    }

    /**
     * Create new record
     */
    public function create($data) {
        // Validate data
        if (empty($data)) {
            return $this->error('Data required');
        }

        // Will implement database insert when ready
        return [
            'success' => true,
            'message' => 'Record would be created in production'
        ];
    }

    /**
     * Update record
     */
    public function update($id, $data) {
        if (!$id || empty($data)) {
            return $this->error('ID and data required');
        }

        // Will implement database update when ready
        return [
            'success' => true,
            'message' => 'Record would be updated in production'
        ];
    }

    /**
     * Delete record
     */
    public function delete($id) {
        if (!$id) {
            return $this->error('ID required');
        }

        // Will implement database delete when ready
        return [
            'success' => true,
            'message' => 'Record would be deleted in production'
        ];
    }

    /**
     * Search records
     */
    public function search($query) {
        if (empty($query)) {
            return $this->error('Query required');
        }

        return [
            'success' => true,
            'data' => [],
            'message' => 'Search results from ' . $this->module
        ];
    }

    /**
     * Error response
     */
    protected function error($message) {
        return [
            'success' => false,
            'error' => $message
        ];
    }
}

// API Router
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle CORS preflight
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', array_filter(explode('/', $path)));

// Route: /api/{module}/{action}
if (count($pathParts) >= 3) {
    $module = $pathParts[count($pathParts) - 2];
    $action = $pathParts[count($pathParts) - 1];

    $api = new ModuleAPI($module);

    switch ($method) {
        case 'GET':
            $response = $api->getData($_GET);
            break;
        
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            $response = $api->create($data);
            break;
        
        case 'PUT':
            $id = $_GET['id'] ?? null;
            $data = json_decode(file_get_contents('php://input'), true);
            $response = $api->update($id, $data);
            break;
        
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            $response = $api->delete($id);
            break;
        
        default:
            $response = ['success' => false, 'error' => 'Method not allowed'];
    }
} else {
    $response = ['success' => false, 'error' => 'Invalid API endpoint'];
}

echo json_encode($response);
?>
