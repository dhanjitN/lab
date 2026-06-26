# Lab Client




**Public web application for clinical and pathology laboratories** — compose diagnostic reports with lab-specific test catalogs, generate portable documents in the browser, and synchronize completed reports with your backend so each laboratory keeps its own data and workflows.

## Demo
 open **[http://lab.pragatiplus.com/login](https://lab.pragatiplus.com/login)** and sign in using the demo account:

| | |
| :--- | :--- |
| **Username** | `DEVLAB` |
| **Password** | `DEVLAB` |


---

## Overview

Lab Client is the **browser-based front end** for a larger lab reporting platform. Authorized users draft structured reports (patient demographics, referrer details, dated results), pick **tests defined per laboratory** via intuitive category and collection controls, preview output, **render PDFs client-side**, and persist reports through a configured API — so every lab’s catalog, storage, and history stay isolated server-side while operators use one consistent interface.

## Features

| Area | What users get |
|------|----------------|
| **Report authoring** | Multi-page layouts, categories and collections with searchable / creatable combos, granular test rows (name, value, unit, reference range, qualitative flags where applicable). |
| **Lab-scoped tests** | Test menus come from backend data keyed to the active lab — pick the right assays from dropdowns aligned to your catalogue, not a global static list. |
| **PDF generation** | High-quality layouts produced in the browser (no server-side renderer required for the PDF step itself), ready to download or archive. |
| **Report library** | Search and browse synced reports from the `/reports` experience. |
| **Resilience & sync** | Local persistence (Dexie / IndexedDB) plus sync routines against the remote API so drafts and batches can align with connectivity. |
| **Authentication** | Dedicated sign-in flow for access-controlled deployments. |

> **Screenshots**  
![Login Image](/src/docs/screenshots/login.png)
![Hero1 Image](/src/docs/screenshots/hero1.png)
![Hero2 Image](/src/docs/screenshots/hero2.png)
![Reports Image](/src/docs/screenshots/reports.png)
![Deleted Reports Image](/src/docs/screenshots/delReports.png)
![Pdf Image](/src/docs/screenshots/pdf.png)



## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/) primitives |
| Forms & validation | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| Client state | [Zustand](https://github.com/pmndrs/zustand) |
| Offline / local DB | [Dexie](https://dexie.org/) (IndexedDB) |
| PDF | [`@react-pdf/renderer`](https://react-pdf.org/) |
| HTTP | [Axios](https://axios-http.com/) |

## Prerequisites

- **Node.js** 20.x or newer (LTS recommended)
- **npm** 10+ (this repo ships a `package-lock.json`)
- A **compatible backend API** exposing the endpoints this client calls (reports, doctors, authentication, lab test definitions, upload routes as implemented in your API project)

## Getting started

### 1. Clone and install

```bash
git clone <your-repo-url> lab-client
cd lab-client
npm install
```

### 2. Environment

Copy the sample file and point the app at your API origin:

```bash
cp .env.sample .env.local
```

Edit `.env.local`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Base URL of your backend (scheme + host + optional path prefix), **no trailing slash**. Used by the shared Axios client for all API traffic. |

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Adjust the dev port via Next.js options if needed.

### 4. Production build

```bash
npm run build
npm run start
```

Serve the `.next` output behind your reverse proxy or hosting platform according to [Next.js deployment guidance](https://nextjs.org/docs/app/building-your-application/deploying).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Optimized production build |
| `npm run start` | Run the production server |
| `npm run lint` | ESLint (Next.js config) |

## Repository layout (high level)

```text
src/
  app/           # Routes: home (report authoring), login, PDF, reports listing
  components/    # UI, headers, report builder, reusable widgets
  lib/           # API client, hooks (e.g. report store), utilities, sync helpers
  dexie/         # IndexedDB schema and bulk operations for reports
```

## Security & operations notes

- **Never commit secrets** — keep real URLs and tokens in `.env.local` or your host’s secret manager.
- **CORS and cookies**: Ensure your API allows this origin if you use cookie-based sessions; adjust `NEXT_PUBLIC_API_URL` for each deployment stage (staging / production).

## Contributing

Issues and pull requests are welcome. Please keep changes focused and consistent with existing patterns (TypeScript types, Tailwind conventions, Radix primitives).

---

<p align="center">
  <sub>Lab Client — streamlined reporting for pathology and clinical laboratories.</sub>
</p>

<p align="center">
  <sub>Built with Next.js · React · TypeScript</sub>
</p>
