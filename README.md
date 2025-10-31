# E-Learning Platform – Frontend

React + Vite + Tailwind CSS

Runs at `http://localhost:5173`

## Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

If `.env.example` is missing, create `.env` with:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=E-Learning Platform
```

## Default Credentials (from backend seed)

- Teacher: `teacher@elearn.local` / `Teacher@123`
- Student: `student@elearn.local` / `Student@123`

## Common Issues

- CORS: Ensure backend `FRONTEND_URL` is `http://localhost:5173`
- Invalid token: Clear localStorage and login again
- Wrong API URL: Check `VITE_API_BASE_URL` in `.env`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
