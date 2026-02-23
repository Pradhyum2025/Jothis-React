# Employee Insights Dashboard

React dashboard with login, employee list, details with camera capture, and salary chart.

## Tech Stack

- React 18 + Vite
- Redux Toolkit, React Router DOM
- Tailwind CSS, shadcn-style UI (Radix + Tailwind)
- Axios, Recharts, react-webcam

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Login

- **Username:** `testuser`
- **Password:** `Test123`

## Routes

- `/login` – Login
- `/dashboard/list` – Employee list (from API)
- `/dashboard/details/:id` – Employee details + camera capture
- `/dashboard/photo` – Captured photo result
- `/dashboard/chart` – Salary bar chart (first 10 employees)

## API

Data is loaded from `https://backend.jotish.in/backend_dev/gettabledata.php` (POST, body: `{ "username": "test", "password": "123456" }`).

## Deploy to Vercel

- Ensure the project builds with `npm run build` (Vite outputs to `dist`).
- Vercel will use the `build` script from `package.json` and serve the `dist` folder.
- This repo includes `vercel.json` which configures the static build and routes all paths to `index.html` for SPA support.

Quick deploy options:

- Via Git: connect the repository in the Vercel dashboard and push to the linked branch — Vercel runs `npm run build` automatically.
- Via CLI: run the following from the project root:

```bash
npx vercel --prod
```

If you need environment variables, add them in the Vercel dashboard under the project settings.
