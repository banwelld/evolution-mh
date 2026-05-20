# EVOLUTION Mental Health Services

A premium, trauma-informed single-page application platform for Evolution Mental Health Services. Built with modular architecture and a high-performance cinematic user experience.

## 🌟 Core Features

- **Cinematic Parallax Engine**: Smooth, performant visual depth manipulation tailored distinctively for desktop and hardware-accelerated static layering on mobile.
- **Decentralized Modular CSS**: Highly encapsulated, component-localized styling topology eliminating monolith leakage.
- **Fluid Typography Topology**: Fully automated dynamic font scaling built on mathematical linear interpolation curves (`calc(rem + vw)`).
- **Interactive GIS Mapping**: Fully integrated geospatial location engine using Leaflet and OpenStreetMap frameworks.
- **Markdown-Driven Articles**: Decoupled content architecture processing robust bio catalogs and service pages dynamically via static markdown buffers.
- **Secure Environment Ecosystem**: Fully isolated environmental API injection, securing keys outside public Git reach.

## 🏗️ Tech Stack

- **Core Engine**: [React v19](https://react.dev/) + [Vite v5](https://vitejs.dev/) (Lightning-fast ESM Bundler)
- **Styling Layer**: Modular CSS3 Custom Properties & Next-Gen Nested Syntax
- **Content Pipeline**: React-Markdown + Front-Matter
- **Geo/Spatial**: Leaflet & React-Leaflet
- **Validations**: Zod
- **Routing**: React Router DOM

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (LTS v18+ recommended)
- **npm** (bundled with Node)

### 1. Installation

Clone the repository and install the package tree:

```bash
npm install
```

### 2. Local Environment Configuration

Create a `.env` file in the root directory and insert your access variables:

```env
VITE_WEB3FORMS_ACCESS_KEY="your-private-key-here"
```

### 3. Development

Launch the HMR dev server:

```bash
npm run dev
```

### 4. Production Build

To generate the minified artifacts ready for live deployment:

```bash
npm run build
```

Build outputs are emitted into the `/dist` directory.

---

## 📁 Project Architecture Highlights

```text
src/
├── app/               # Root orchestration, top-level layout & routers
├── components/        # Global generic primitives (Section, Button, Markdown)
├── features/          # Self-contained feature pods (Views, CSS, Components)
│   ├── hero-view/     # Parallax dynamics, cinematic titles
│   ├── article-catalog/ # Article decks, markdown pipelines
│   └── slider-menu/   # Side-nav kinetic translations
├── hooks/             # Unified shared behavioral logic
├── assets/            # Raw graphic/media libraries
└── index.css          # Design Token core (variables, resets, keyframes)
```

## 🤝 Security & Deploy Warnings

- **NEVER commit the `.env` file** containing sensitive API keys. It is currently secured within the root `.gitignore` article.
- Standard build generates roughly **38 kB of CSS**.
- Assets within `/dist` are already WebP/Gzip optimized for direct delivery.
