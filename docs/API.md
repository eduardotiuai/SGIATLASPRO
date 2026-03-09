# SGI ATLAS API Documentation

## Base URL
```
http://localhost/sgiatlaspro/backend/api
```

## Authentication
All requests (except login) require an `Authorization` header with a JWT token:
```
Authorization: Bearer {token}
```

## Endpoints

### Authentication

#### Login
```
POST /auth
Content-Type: application/x-www-form-urlencoded

email=usuario@tiiuai.com.br&password=123456&action=login
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "usuario@tiiuai.com.br",
      "role": "admin",
      "company": "TI UAI",
      "department": "Direção"
    }
  }
}
```

#### Register
```
POST /auth
Content-Type: application/x-www-form-urlencoded

action=register&email=novo@empresa.com.br&name=Novo Usuario&password=senha123&company_domain=empresa.com.br
```

#### Verify Token
```
POST /auth
Authorization: Bearer {token}

action=verify
```

### Modules

#### Get Module Data
```
GET /modules/{module}?filter=value
Authorization: Bearer {token}
```

**Example:**
```
GET /modules/cadastros
GET /modules/financeiro?status=pending
```

#### Create Record
```
POST /modules/{module}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Novo Cliente",
  "email": "cliente@empresa.com",
  "phone": "11999999999"
}
```

#### Update Record
```
PUT /modules/{module}?id={id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Nome Atualizado"
}
```

#### Delete Record
```
DELETE /modules/{module}?id={id}
Authorization: Bearer {token}
```

#### Search
```
GET /modules/{module}/search?q=termo
Authorization: Bearer {token}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 500  | Server Error |

## Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "code": 400
}
```

## Multi-Tenant Behavior

The system identifies the tenant automatically from the user's email domain:
- `usuario@tiiuai.com.br` → TI UAI tenant
- `usuario@empresa.com.br` → Empresa XYZ tenant

Each tenant has isolated data and can have different feature sets.

## Rate Limiting
- 1000 requests per hour per IP
- 10 requests per second per token

## Modules Available

1. **cadastros** - Client and supplier management
2. **qualidade** - Quality control
3. **comercial** - Sales and proposals
4. **financeiro** - Financial management
5. **operacao** - Operational planning
6. **compras** - Purchase orders
7. **logistica** - Logistics and delivery tracking
8. **estoque** - Inventory management
9. **frotas** - Fleet management
10. **licitacoes** - Bidding management
11. **controladoria** - Control and analysis
12. **faturamento** - Billing and invoicing
13. **contratos** - Contract management
14. **atendimentos** - Customer support tickets
15. **suprimentos** - Supply management
16. **manutencao** - Maintenance management
17. **almoxarifado** - Warehouse management

## Development Notes

- All API responses are in JSON format
- Timestamps are in ISO 8601 format (UTC)
- Pagination uses `page` and `limit` query parameters
- All dates must be in YYYY-MM-DD format
- Currency values are in decimal with 2 decimal places

## Future Integration Points

### Email (Resend API)
```php
Use RESEND_API_KEY to send emails
API: https://api.resend.com
```

### Database (MariaDB)
```
Host: localhost
Database: sgi_atlas
User: root
Charset: utf8mb4
```

### JWT Tokens
- Algorithm: HS256
- Expiry: 1 hour (adjustable)
- Secret: Configure in backend/config/database.php

## Example: Complete Login Flow

1. User submits login form on frontend
2. JavaScript sends POST to `/api/auth` with credentials
3. Backend validates against database/mock data
4. Backend returns JWT token
5. Frontend stores token in sessionStorage
6. All subsequent requests include token in Authorization header
7. Backend verifies token before processing requests

---

**Version:** 1.0.0 Beta
**Last Updated:** March 2026
**Maintained by:** TI UAI Development Team
