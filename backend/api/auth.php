<?php
/**
 * SGI ATLAS - Authentication Module
 * Handles login, registration, and JWT token generation
 */

require_once __DIR__ . '/../config/database.php';

class Auth {
    private $db;
    private $mockUsers = [
        'usuario@tiiuai.com.br' => [
            'id' => 1,
            'name' => 'João Silva',
            'email' => 'usuario@tiiuai.com.br',
            'password_hash' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password = admin123
            'role' => 'admin',
            'company' => 'TI UAI',
            'company_domain' => 'tiiuai.com.br',
            'department' => 'Direção'
        ],
        'gerente@tiiuai.com.br' => [
            'id' => 2,
            'name' => 'Maria Santos',
            'email' => 'gerente@tiiuai.com.br',
            'password_hash' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'role' => 'manager',
            'company' => 'TI UAI',
            'company_domain' => 'tiiuai.com.br',
            'department' => 'Operações'
        ]
    ];

    public function __construct() {
        // Will use real database when ready
        // $this->db = getPDOConnection();
    }

    /**
     * Authenticate user and generate JWT token
     */
    public function login($email, $password) {
        // Validate input
        if (empty($email) || empty($password)) {
            return $this->error('Email and password required');
        }

        // Check against mock users (temporary)
        if (isset($this->mockUsers[$email])) {
            $user = $this->mockUsers[$email];
            
            // Verify password (using bcrypt)
            if (password_verify($password, $user['password_hash'])) {
                // Generate JWT token
                $token = $this->generateJWT($user);
                
                return $this->success([
                    'token' => $token,
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'role' => $user['role'],
                        'company' => $user['company'],
                        'department' => $user['department']
                    ]
                ]);
            }
        }

        return $this->error('Invalid email or password', 401);
    }

    /**
     * Register new user
     */
    public function register($email, $name, $password, $company_domain) {
        // Validate input
        if (empty($email) || empty($name) || empty($password)) {
            return $this->error('All fields required');
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->error('Invalid email format');
        }

        // Validate that email belongs to company domain
        $domain = substr($email, strpos($email, '@') + 1);
        if ($domain !== $company_domain) {
            return $this->error('Email must belong to company domain');
        }

        // Here we would insert into database when ready
        // For now, just validate
        return $this->success([
            'message' => 'Registration would be created on production',
            'email' => $email,
            'company_domain' => $company_domain
        ]);
    }

    /**
     * Generate JWT Token
     */
    private function generateJWT($user) {
        $header = json_encode(['alg' => JWT_ALGORITHM, 'typ' => 'JWT']);
        $payload = json_encode([
            'iss' => FRONTEND_URL,
            'sub' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'company' => $user['company'],
            'iat' => time(),
            'exp' => time() + JWT_EXPIRY
        ]);

        $signature = hash_hmac(
            'sha256',
            base64_encode($header) . '.' . base64_encode($payload),
            JWT_SECRET,
            true
        );

        return base64_encode($header) . '.' . 
               base64_encode($payload) . '.' . 
               base64_encode($signature);
    }

    /**
     * Verify JWT Token
     */
    public function verifyToken($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            return null;
        }

        // Verify signature
        $signature = hash_hmac(
            'sha256',
            $parts[0] . '.' . $parts[1],
            JWT_SECRET,
            true
        );

        if (base64_encode($signature) !== $parts[2]) {
            return null;
        }

        // Decode and return payload
        $payload = json_decode(base64_decode($parts[1]), true);

        // Check expiry
        if ($payload['exp'] < time()) {
            return null;
        }

        return $payload;
    }

    /**
     * Multi-tenant: Get company by domain
     */
    public function getCompanyByDomain($domain) {
        // Mock data - will query database in production
        $companies = [
            'tiiuai.com.br' => [
                'id' => 1,
                'name' => 'TI UAI',
                'domain' => 'tiiuai.com.br'
            ],
            'empresa.com.br' => [
                'id' => 2,
                'name' => 'Empresa XYZ',
                'domain' => 'empresa.com.br'
            ]
        ];

        return $companies[$domain] ?? null;
    }

    /**
     * Error response
     */
    private function error($message, $code = 400) {
        return [
            'success' => false,
            'error' => $message,
            'code' => $code
        ];
    }

    /**
     * Success response
     */
    private function success($data) {
        return [
            'success' => true,
            'data' => $data
        ];
    }
}

// API Endpoint Handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $auth = new Auth();
    $action = $_POST['action'] ?? null;

    switch ($action) {
        case 'login':
            $response = $auth->login($_POST['email'] ?? '', $_POST['password'] ?? '');
            break;
        
        case 'register':
            $response = $auth->register(
                $_POST['email'] ?? '',
                $_POST['name'] ?? '',
                $_POST['password'] ?? '',
                $_POST['company_domain'] ?? ''
            );
            break;
        
        case 'verify':
            $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
            $payload = $auth->verifyToken($token);
            $response = $payload ? 
                ['success' => true, 'data' => $payload] : 
                ['success' => false, 'error' => 'Invalid token'];
            break;
        
        default:
            $response = ['success' => false, 'error' => 'Invalid action'];
    }

    echo json_encode($response);
}
?>
