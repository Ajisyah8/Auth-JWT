# Keamanan JWT Authentication

## Middleware Keamanan yang Diterapkan

### 1. JwtMiddleware
Middleware utama untuk autentikasi JWT yang:
- Memverifikasi token JWT dari header Authorization
- Menangani token yang expired, invalid, atau tidak ada
- Memberikan response error yang informatif
- Melindungi route yang memerlukan autentikasi

### 2. ApiSecurityMiddleware
Middleware keamanan tambahan yang:
- **Rate Limiting**: Membatasi 60 request per menit per IP
- **Security Headers**: Menambahkan header keamanan:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Content-Security-Policy: default-src 'self'`
- **Information Hiding**: Menghapus header yang mengekspos informasi server

## Route yang Dilindungi

### Public Routes (Tidak memerlukan token)
- `POST /api/register` - Registrasi user baru
- `POST /api/login` - Login dan mendapatkan token

### Protected Routes (Memerlukan token JWT)
- `GET /api/user` - Mendapatkan informasi user yang sedang login
- `POST /api/logout` - Logout dan invalidate token
- `POST /api/refresh` - Refresh token yang akan expired

## Cara Menggunakan Token

### 1. Login untuk mendapatkan token
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

### 2. Menggunakan token untuk mengakses protected routes
```bash
curl -X GET http://localhost:8000/api/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Refresh token sebelum expired
```bash
curl -X POST http://localhost:8000/api/refresh \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Konfigurasi Keamanan

### JWT Configuration
- Token TTL: Dikonfigurasi di `config/jwt.php`
- Secret Key: Disimpan di environment variable `JWT_SECRET`
- Algorithm: HS256 (default)

### Rate Limiting
- Limit: 60 requests per minute per IP address
- Window: 60 seconds
- Response: HTTP 429 dengan informasi retry_after

## Best Practices

1. **Simpan token dengan aman** di client (localStorage/sessionStorage)
2. **Selalu gunakan HTTPS** di production
3. **Refresh token secara berkala** sebelum expired
4. **Logout dengan benar** untuk invalidate token
5. **Jangan expose JWT secret** di client-side code
6. **Monitor rate limiting** untuk mendeteksi serangan

## Error Handling

Middleware JWT menangani berbagai jenis error:
- **Token Expired**: HTTP 401 dengan pesan untuk login ulang
- **Token Invalid**: HTTP 401 dengan pesan token tidak valid
- **Token Absent**: HTTP 401 dengan pesan token tidak ditemukan
- **User Not Found**: HTTP 404 dengan pesan user tidak ditemukan
- **Rate Limit Exceeded**: HTTP 429 dengan informasi retry

## Monitoring dan Logging

Untuk monitoring keamanan, perhatikan:
- Log failed authentication attempts
- Monitor rate limiting violations
- Track token refresh patterns
- Alert pada multiple failed login attempts