<?php
/**
 * SGI ATLAS - Multi-Tenant Utility Class
 * Handles tenant identification and data isolation
 */

class MultiTenant {
    private static $currentTenant = null;
    private static $tenantConfig = [
        'tiiuai.com.br' => [
            'id' => 1,
            'name' => 'TI UAI',
            'domain' => 'tiiuai.com.br',
            'database' => 'sgi_atlas_tiiuai',
            'features' => ['all']
        ],
        'empresa.com.br' => [
            'id' => 2,
            'name' => 'Empresa XYZ',
            'domain' => 'empresa.com.br',
            'database' => 'sgi_atlas_empresa',
            'features' => ['cadastros', 'financeiro', 'operacao']
        ]
    ];

    /**
     * Initialize tenant from email domain
     */
    public static function initializeFromEmail($email) {
        $domain = substr($email, strpos($email, '@') + 1);
        return self::initialize($domain);
    }

    /**
     * Initialize tenant by domain
     */
    public static function initialize($domain) {
        if (!isset(self::$tenantConfig[$domain])) {
            throw new Exception('Invalid tenant domain: ' . $domain);
        }

        self::$currentTenant = self::$tenantConfig[$domain];
        return self::$currentTenant;
    }

    /**
     * Get current tenant
     */
    public static function getCurrentTenant() {
        if (self::$currentTenant === null) {
            throw new Exception('Tenant not initialized');
        }
        return self::$currentTenant;
    }

    /**
     * Get tenant by domain
     */
    public static function getTenant($domain) {
        return self::$tenantConfig[$domain] ?? null;
    }

    /**
     * Check if tenant has feature
     */
    public static function hasFeature($feature) {
        $tenant = self::getCurrentTenant();
        return in_array('all', $tenant['features']) || in_array($feature, $tenant['features']);
    }

    /**
     * Get database for current tenant
     */
    public static function getDatabase() {
        $tenant = self::getCurrentTenant();
        return $tenant['database'];
    }

    /**
     * Validate tenant access
     */
    public static function validateAccess($userEmail, $requestedDomain) {
        $userDomain = substr($userEmail, strpos($userEmail, '@') + 1);
        
        if ($userDomain !== $requestedDomain) {
            throw new Exception('Unauthorized tenant access');
        }

        return true;
    }

    /**
     * Get all tenants (admin only)
     */
    public static function getAllTenants() {
        return self::$tenantConfig;
    }
}

?>
