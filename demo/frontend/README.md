# Frontend (React)

Minimal Vite + React frontend for the login page.

Run locally:

```bash
cd frontend
npm install
npm run dev
```

Open the site at the address Vite shows (usually `http://localhost:5173`). The login form posts to `http://localhost:8081/api/auth/login` and stores the returned token in `localStorage`.
The dev server proxies `/api` to `http://localhost:8081` so no CORS is required. Backend must be running on port 8081.

Credentials:
- Email: `nandhini@gmail.com`
- Password: `123456`
