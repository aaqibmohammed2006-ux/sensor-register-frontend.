# Sensor Register Frontend

React + Vite user interface for manual laboratory readings.

## Local setup
1. Install Node.js LTS.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL=http://localhost:8080/api`.
4. Run `npm run dev`.

The frontend expects the backend endpoints documented in `../docs/PROJECT_BLUEPRINT.md`.
`App.jsx` is intentionally kept under 40 lines of code; API operations and UI components live in separate files.
