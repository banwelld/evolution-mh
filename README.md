# EVOLUTION Mental Health Services

A premium, trauma-informed single-page application platform for Evolution Mental Health Services. Built with modular architecture, custom design tokens, and a high-performance cinematic user experience.

## 🌟 Core Features & Visual Mechanics

- **Cinematic Parallax Engine**: Smooth, hardware-accelerated parallax scrolling on the home page, optimized distinctively for desktop depth-perception and lightweight layering on mobile devices.
- **Decentralized Modular CSS**: Encapsulated component styles utilizing modern CSS custom properties and next-gen nesting, eliminating layout leakage. Designed in the OKLCH color space for a curated, premium aesthetic ("The Inner Glow").
- **Fluid Typography Topology**: Dynamic scaling across resolutions using responsive interpolation curves (`clamp()` and `calc(rem + vw)`).
- **Interactive GIS Mapping**: Embedded Leaflet and OpenStreetMap engine for local geospatial client directions and interactive map controls.
- **Zod & Frontmatter Content Pipeline**: Fully validated Markdown compilation at build-time. Organizes team profiles, services, quotes, and FAQ accordions.
- **Git-Based Pages CMS Integration**: Fully configured via `.pages.yml` with [Pages CMS](https://pagescms.org/), giving clients the freedom to seamlessly update team bios, service descriptions, and FAQ accordions through a visual UI.
- **Serverless Form Submission**: Secure client contact form utilizing the Web3Forms API to route client email inquiries directly without a backend database. Integrates Zod schema constraints for runtime validation.
- **Keyboard Shortcuts**: Pre-integrated developer utility (`Cmd + Opt + /` or `Ctrl + Opt + /`) to toggle the client-facing "Coming Soon" splash layout for rapid live-stage previewing.


## 🏗️ Tech Stack & Dependencies

- **Core Framework**: [React v19.2](https://react.dev/) + [Vite v5.4](https://vitejs.dev/) (Lightning-fast ESM Bundler)
- **Routing Layer**: [React Router DOM v7.13](https://reactrouter.com/) (Declarative Client Routing)
- **Validation Engine**: [Zod v4.3](https://zod.dev/) (Runtime schema validations for client contact inputs and markdown metadata)
- **Content Pipeline**: [React-Markdown v10.1](https://github.com/remarkjs/react-markdown) + [Front-Matter v4.0](https://github.com/jxson/front-matter) (Markdown parser and compiler)
- **Map & Geospatial**: [Leaflet v1.9](https://leafletjs.com/) + [React-Leaflet v5.0](https://react-leaflet.js.org/) (Custom tile coordinates and map components)
- **Styling Core**: Modern CSS3 (Custom properties, nested styling, `:has()`, and `interpolate-size: allow-keywords` for smooth accordion transitions)

## 📊 Build & Performance Statistics

The production build is compiled using Vite and ESBuild. Below are the precise statistics from the latest build:

- **Build Time**: ~1.44s
- **Total CSS Assets**: `46.80 kB` (includes `15.61 kB` Leaflet vendor CSS and `25.25 kB` main app/layout CSS)
- **Total JS Assets**: `726.34 kB` (split dynamically via React Suspense code-splitting):
  - **Main Bundle (`index.js`)**: `52.16 kB` (core application and routers)
  - **Zod Schema Vendor**: `64.57 kB`
  - **Leaflet Map Vendor**: `160.29 kB`
  - **Core Framework Vendor**: `440.73 kB` (React, ReactDOM, and common dependencies)
  - **Dynamic Feature Chunks**: `< 9.00 kB` combined (includes lazy-loaded `ContactView`, `LocationView`, `Accordion`, `CatalogView`, and `SectionTransition`)
- **Asset Optimization**: WebP image cataloging (average `< 50 kB` per image asset) and SVGs optimized for fast Largest Contentful Paint (LCP).

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (LTS v18+ recommended)
- **npm** (bundled with Node)

### 1. Installation

Clone the repository and install the dependency tree:

```bash
npm install
```

### 2. Local Environment Configuration

Create a `.env` file in the root directory and define the required API variables:

```env
VITE_WEB3FORMS_ACCESS_KEY="your-private-key-here"
```

### 3. Running in Development

Launch the Hot Module Replacement (HMR) development server:

```bash
npm run dev
```

### 4. Compiling Production Build

Compile the minified assets ready for deployment:

```bash
npm run build
```

Production builds are output directly into the `/dist` directory.

## 📁 Project Architecture

```text
src/
├── app/                  # Main root orchestrator, AppLayout, and SliderTrigger
├── assets/               # Branding assets, vector icons, fallback logos
├── components/           # Reusable UI primitives (Accordion, Button, ErrorBoundary, ErrorPage, Footer, MarkdownDisplay, Section)
├── config/               # Routing maps (routes.jsx) and site configurations (siteConfig.js)
├── features/             # Self-contained domain feature modules
│   ├── hero-view/        # Parallax dynamics, cinematic titles
│   ├── site-nav/         # Sliding menu kinetic translations
│   ├── article-view/     # Catalog layouts, article display overlays
│   ├── section-transition/# Dynamic quote slides and visual transitions
│   ├── contact-view/     # Zod-validated contact form with Web3Forms
│   ├── location-view/    # Leaflet Map GIS locator
│   └── content-management/# Schema definitions (Zod validation) & Markdown sources
├── hooks/                # Unified custom hooks (useSmoothScroll)
├── utils/                # Global utilities and helper functions (helpers.js)
├── main.jsx              # App entrypoint
└── index.css             # Main styling tokens (OKLCH, animations, variables)
```

## 🤝 Security & Deploy Warnings

- **Sensitive Keys**: Never commit the `.env` file. It is ignored by Git by default to prevent leaking Web3Forms API keys.
- **Static Assets**: Built assets in `/dist/assets` are ready to be served over CDN with Brotli or Gzip compression.

## 📄 License

This project is proprietary and all rights are reserved. You may view the source code for evaluation purposes (e.g., as part of a portfolio review), but you may not copy, distribute, or run the software without permission. See [LICENSE](LICENSE) for details.
