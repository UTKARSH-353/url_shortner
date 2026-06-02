# Shorty — URL Shortener with Click Analytics

A production-ready full-stack URL shortener (Bitly-style) with JWT auth, QR codes, geo/device click analytics, charts, and a modern responsive dashboard.

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios, Framer Motion, Recharts, React Icons, React Hot Toast
**Backend:** Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, nanoid, qrcode, geoip-lite, ua-parser-js, request-ip, helmet, cors, express-rate-limit, express-mongo-sanitize, xss-clean, morgan
**DevOps:** Docker, docker-compose, Nginx, GitHub Actions

## Features

- 🔐 JWT auth (register, login, persistent session, protected routes)
- ✂️ URL shortening with nanoid, custom aliases, expiration
- 🔁 Redirect engine at `GET /:shortCode`
- 📊 Click analytics: IP, country, city, browser, OS, device, referrer, timestamp
- 📈 Dashboard: total URLs, total clicks, unique visitors, top performers
- 📉 Charts: clicks over time (line), devices (pie), browsers (bar), countries (bar)
- 🧾 QR code generation + download
- 🔎 Search, sort, paginate, edit, delete URLs
- 🛡️ Helmet, CORS, rate limiting, MongoDB sanitization, XSS protection, password hashing
- 🌗 Dark / light mode
- 📱 Fully responsive UI with glassmorphism + smooth animations

## Project Structure

```
url-shortener/
├── backend/      # Express + Mongoose API
├── frontend/     # React + Vite SPA
├── nginx/        # reverse-proxy config (optional)
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env       # edit MONGO_URI, JWT_SECRET, BASE_URL
npm install
npm run dev                # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                # http://localhost:5173
```

### 3. Docker (everything at once)

```bash
docker compose up --build
# frontend -> http://localhost
# backend  -> http://localhost:5000
```

## Environment Variables

**backend/.env**
| Key | Description |
|-----|-------------|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random secret |
| `JWT_EXPIRES_IN` | e.g. `7d` |
| `BASE_URL` | Public base URL used for short links |
| `CLIENT_URL` | Allowed CORS origin |

**frontend/.env**
| Key | Description |
|-----|-------------|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |

## API Documentation

All authenticated endpoints require `Authorization: Bearer <token>`.

### Auth
| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | `{name,email,password}` | Create account, returns token |
| POST | `/api/auth/login` | `{email,password}` | Login, returns token |
| GET | `/api/auth/profile` | – | Current user |

### URLs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/url/shorten` | `{originalUrl,customAlias?,expiresAt?}` |
| GET | `/api/url/user/all?page&limit&search&sort` | Paginated user URLs |
| GET | `/api/url/:shortCode` | Get one URL (owned) |
| PUT | `/api/url/:id` | Update URL |
| DELETE | `/api/url/:id` | Delete URL + its analytics |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/user/dashboard` | Aggregated dashboard stats |
| GET | `/api/analytics/:shortCode` | Per-URL stats |

### Redirect
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:shortCode` | 302 to original URL, records click |

## Deployment

### Backend → Render / Railway / Fly
1. Push to GitHub.
2. Create a Web Service from the `/backend` folder.
3. Set env vars (`MONGO_URI`, `JWT_SECRET`, `BASE_URL`, `CLIENT_URL`).
4. Build: `npm install` · Start: `npm start`.

### Frontend → Vercel / Netlify
1. Import the `/frontend` folder.
2. Build command: `npm run build` · Output: `dist`.
3. Set `VITE_API_URL` to your deployed backend URL.

### Database → MongoDB Atlas
1. Create a free cluster, allow your backend IPs.
2. Copy the connection string into `MONGO_URI`.

## Security Notes
- Passwords hashed with bcrypt (cost 12)
- Helmet sets secure headers
- `express-rate-limit` on all `/api/*`, stricter on `/api/auth/*` and `/api/url/shorten`
- `express-mongo-sanitize` and `xss-clean` prevent NoSQL/XSS injection
- JWT validated on every protected request


