# MetCompB Landing Page

Modern static presentation layer for the **MetCompB** educational archive, focused on Scientific Computing, Numerical Methods, Python and Jupyter.

> This repository is the presentation layer for the MetCompB educational archive. Source notebooks and academic materials remain in the original MetCompB repository.

## Sources
- Academic repository: https://github.com/LeonardoCamargoRossato/MetCompB
- YouTube channel: https://www.youtube.com/@MetCompB_UFRGS

## Stack
React + Vite + TypeScript + React Router (HashRouter) + lucide-react. No backend, database, API key or paid service.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## GitHub Pages
The repository includes `.github/workflows/deploy.yml`. Every push to `main` builds `dist/` and publishes it using GitHub Pages Actions.

## Structure
- `src/data/` — curated content, file inventory and video metadata
- `src/components/` — reusable UI elements
- `src/pages/` — Home, Contents, Videos, Files and About
- `public/assets/reference/` — visual reference assets

The academic repository remains the source of truth. This site provides navigation, explanation, previews and links back to the original material.
