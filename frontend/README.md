# Food Delivery Frontend

React + Vite + TypeScript.

## Chạy dev

```bash
npm install
npm run dev
```

Mở http://localhost:5173 — API được proxy tới `http://localhost:8080` (`/api`).

## Auth

- Login gọi `POST /api/v1/auth/login` với `withCredentials: true`
- Backend set HttpOnly cookies `access_token`, `refresh_token`
- `GET /api/v1/auth/me` khôi phục phiên khi F5
- Axios tự gọi `POST /api/v1/auth/refresh` khi API trả 401

## Tài khoản seed (mật khẩu theo DB seed)

- `customer1@gmail.com` → `/customer`
- `driver1@gmail.com` → `/driver`
- `resto1@foodapp.vn` → `/restaurant`
- `admin@foodapp.vn` → `/admin`
