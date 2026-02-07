# Freddie Philpot | Cybersecurity Portfolio

A modern, responsive portfolio website built with Astro and React, showcasing cybersecurity projects, achievements, and technical blog posts.

**[Live Site →](https://freddiephilpot.dev)**

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Astro](https://astro.build) with SSR |
| **UI** | [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com) |
| **Components** | [Radix UI](https://radix-ui.com), [Lucide Icons](https://lucide.dev) |
| **3D Graphics** | [Three.js](https://threejs.org), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) |
| **Deployment** | [Vercel](https://vercel.com) |
| **Analytics** | [PostHog](https://posthog.com) |

---

## Features

- **Dark/Light Mode** — System-aware theme with manual toggle
- **Animated Backgrounds** — Custom grain shader effects and dot matrix animations
- **Blog with MDX** — Markdown content with tag filtering and syntax highlighting
- **Achievement Sheets** — Interactive modal cards for certifications and experience
- **Contact Form** — Powered by Resend API
- **Responsive Design** — Mobile-first with smooth animations
- **SEO Optimized** — Sitemap, robots.txt, and meta tags

---

## Project Structure

```
src/
├── components/        # React & Astro components
│   ├── ui/           # Reusable UI primitives (Button, Sheet, etc.)
│   ├── Navbar.tsx    # Navigation with theme toggle
│   ├── Grainient.tsx # Animated grain background
│   └── ...
├── content/
│   └── blog/         # MDX blog posts
├── layouts/          # Base HTML layouts
├── pages/            # Route pages
│   ├── index.astro   # Home
│   ├── about.astro   # About & tech stack
│   ├── projects/     # Project showcases
│   ├── blog/         # Blog listing & posts
│   └── ...
├── styles/           # Global CSS
└── lib/              # Utility functions
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

Create a `.env` file for the contact form:

```env
RESEND_API_KEY=your_resend_api_key
```

---

## License

[MIT](LICENSE)
