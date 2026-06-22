# Suyash Kulkarni — Portfolio

Personal portfolio for **Suyash Kulkarni — AI Engineer & Product Manager**.
Built with Vite + React + TypeScript, Tailwind CSS, Framer Motion, and an
interactive Three.js layer (react-three-fiber + drei) — an ambient particle
starfield plus a mouse-reactive 3D crystal in the hero. The 3D code is
lazy-loaded so the page paints instantly.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build for production

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build locally
```

## Editing content

**All text lives in one file:** [`src/data.ts`](src/data.ts).
Change your summary, experience, projects, skills, certifications, education,
and the Product Management section there — no component edits needed.

Sections (in order): Hero → About → Experience → Product Management
→ Projects → Skills → Certifications & Education → Contact.

### Things you may want to update

- **LinkedIn URL** — `src/data.ts` → `profile.socials.linkedin` currently points
  to a placeholder (`/in/suyash-kulkarni`). Replace it with your real profile URL.
- **Profile photo** — not included yet. Drop an image in `public/` and add an
  `<img>` to `src/components/Hero.tsx` if you'd like one.

> Note: the Download Resume button and phone number were intentionally left off.

## Deploy to Vercel

This repo is Vercel-ready (`vercel.json` handles SPA routing).

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a new GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. Deploy.

Vercel auto-detects Vite, so no extra configuration is required.
