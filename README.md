# VoxaDesk AI Frontend

Next.js frontend for VoxaDesk AI, an AI receptionist SaaS that answers phone/web conversations, books appointments, captures leads, and coordinates human handoff.

## Stack

- Next.js + TypeScript
- Tailwind CSS + shadcn/ui conventions
- Redux Toolkit + RTK Query

## Two-repository local setup

The frontend and backend are sibling repositories. Start PostgreSQL, Redis, the
backend API, and its worker before starting this app. See the backend README for
the mock-mode environment and database steps.

1. Copy `.env.example` to `.env.local` and keep the default local API URL.
2. Run `npm install` and `npm run dev` in `voxadesk-ai-frontend`.
3. Open `http://localhost:3000`.

Private `.env*` files are ignored. Only `.env.example` templates belong in Git.
The local text demo and dashboard activity shape are explicitly illustrative;
workspace totals and all labeled API workflows use the backend.
