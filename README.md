# Food Delivery Platform

Monorepo: Spring Boot backend + React frontend.

## Backend

```bash
cd backend
mvn spring-boot:run
```

Yêu cầu: PostgreSQL, **Redis** (refresh token — bắt buộc cho login).

```bash
# Redis (Docker)
docker run -d --name redis -p 6379:6379 redis:7
```

API auth: `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`

Token lưu HttpOnly cookie (`access_token`, `refresh_token`).

## Frontend

```bash
cd frontend
npm install
npm run dev
```

http://localhost:5173 — proxy `/api` → backend :8080.

## Quyết định kiến trúc auth (tóm tắt)

| Chủ đề | Lựa chọn |
|--------|----------|
| Login | `AuthenticationManager` + `UserDetailsService` (email) |
| Refresh | Opaque token + Redis, rotation mỗi lần refresh |
| Lưu token | HttpOnly cookie (FE không đọc được) |
| Dev FE/BE | Vite proxy → cookie same-origin, dễ debug |
| Response login | Chỉ `userId`, `email`, `role` — không trả token JSON |
| Request auth | Cookie trước, `Authorization: Bearer` fallback (Postman) |
