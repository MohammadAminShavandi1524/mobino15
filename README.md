# Mobino

A modern and scalable **e-commerce web application** built with **Next.js 15** and **Payload CMS**.  
This project has been designed and developed as a **personal showcase** to demonstrate how to build a performant, user-friendly, and future-proof online store using the latest technologies.

---

## 🚀 Features

- 🛒 Modern e-commerce architecture
- ⚡ Fast performance & SEO optimized
- 🎨 Responsive and elegant UI with TailwindCSS
- 🔄 Smooth animations using Framer Motion
- 🔐 Secure and scalable backend with Payload CMS + MongoDB
- 🧩 Rich product filtering & sorting system
- 📦 Support for multi-tenant setup (via Payload plugin)
- 🎥 Lottie animations and interactive UI elements

---

## 🛠️ Tech Stack

This project uses a wide range of modern tools, libraries, and frameworks to deliver a **fast**, **scalable**, and **developer-friendly** e-commerce solution.

### ⚡ Core Framework

- **Next.js 15.2.3** – React-based fullstack framework for server-side rendering (SSR), static site generation (SSG), API routes, and edge-ready deployment.
- **React 19.0.0** + **React DOM 19.0.0** – The core UI library for building dynamic, component-based user interfaces.

### 🗄️ Backend & CMS

- **Payload CMS 3.46.0** – Headless CMS providing collections, authentication, file storage, access control, and admin dashboard.
- **@payloadcms/db-mongodb 3.49.0** – MongoDB database adapter for Payload.
- **@payloadcms/next 3.49.0** – Next.js integration for Payload.
- **@payloadcms/payload-cloud 3.49.0** – Enables deployment & cloud functionality on Payload Cloud.
- **@payloadcms/plugin-multi-tenant 3.49.0** – Multi-tenant plugin for supporting multiple stores/sites in one instance.
- **@payloadcms/richtext-lexical 3.49.0** – Rich text editor integration using Lexical.
- **@payloadcms/storage-vercel-blob 3.49.0** – File storage adapter for Vercel Blob storage.

### 🔌 API Layer & Data Fetching

- **tRPC 11.0.3** – Type-safe APIs without needing REST/GraphQL schemas.
  - `@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query` for full integration.
- **@tanstack/react-query 5.83.0** – Fetching, caching, synchronizing, and updating server state.
- **GraphQL 16.11.0** – Optional support for queries/mutations when needed.
- **SuperJSON 2.2.2** – Better serialization for Date, Map, Set, etc., in API responses.

### 🎨 UI / Styling

- **TailwindCSS 4.1.10** – Utility-first CSS framework for rapid styling.
- **Radix UI** – Accessible, headless UI primitives:
  - `@radix-ui/react-accordion 1.2.11` – Accessible accordion components.
  - `@radix-ui/react-dialog 1.1.14` – Accessible modal dialogs.
  - `@radix-ui/react-slider 1.3.5` – Range/slider inputs.
  - `@radix-ui/react-tooltip 1.2.8` – Accessible tooltips.
  - (and more: checkbox, label, progress, scroll-area, separator, slot, collapsible).
- **Framer Motion 12.23.12** – Declarative animations and transitions.
- **Lucide React 0.525.0** – Beautiful, customizable SVG icon set.
- **Embla Carousel React 8.6.0** – Touch-friendly carousel/slider for product showcases.
- **Lottie React 2.4.1** – Render lightweight vector animations.
- **sonner 2.0.6** – Modern toast notifications.
- **react-scroll 1.9.3** – Smooth scrolling for navigation.

### 🧩 State Management & Forms

- **Zustand 5.0.3** – Lightweight state management with hooks.
- **React Hook Form 7.60.0** – Performant, flexible form management.
- **@hookform/resolvers 5.1.1** – Integration of React Hook Form with validation schemas.
- **Zod 4.0.5** – Type-safe schema validation library.

### 🛠️ Utilities

- **clsx 2.1.1** – Conditional classNames utility.
- **tailwind-merge 3.3.1** – Smart merging of TailwindCSS classes.
- **class-variance-authority 0.7.1** – Utility for managing component variants in a type-safe way.
- **nuqs 2.4.1** – Sync state with URL query parameters (great for filters/sorting).
- **next-themes 0.4.6** – Theme switching (dark/light/system).
- **client-only / server-only** – Utilities to restrict code to client/server runtime.
- **jalaali-js 1.1.3** – Jalaali (Persian) date conversion & formatting.

### 🎮 Visual / Interactive

- **tsParticles (3.9.1)** – Particle engine for interactive backgrounds.
  - `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim`.
- **Matter.js 0.20.0** – Physics engine for realistic interactions and animations.
- **tw-animate-css 1.3.4** – Tailwind plugin for animate.css classes.

### 🧹 Development & Tooling

- **TypeScript 5.8.3** – Type safety and developer productivity.
- **ESLint 9.x** – Code linting and consistency.
- **Prettier 3.6.2** + **prettier-plugin-tailwindcss 0.6.14** – Code formatting with Tailwind class sorting.
- **PostCSS 8.5.5** + **Autoprefixer 10.4.21** – CSS transformation & vendor prefixing.
- **ts-node 10.9.2** – Run TypeScript directly in Node.js for scripts.

---
