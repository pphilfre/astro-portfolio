---
title: Markup
description: Productivity-first markdown workspace focused on speed, keyboard ergonomics, and flexible document types.
carouselImages:
  - /projects/markup/hero-editor.svg
  - /projects/markup/hero-graph.svg
  - /projects/markup/hero-desktop.svg
projects:
  - name: Markup
    repo: https://github.com/pphilfre/markup
    site: https://markup.freddiephilpot.dev
  - name: Home Site
    repo: https://github.com/pphilfre/markup-home
    site: https://home.markup.freddiephilpot.dev
---

## What it does

- Provides a keyboard-first Markdown editing experience with split preview and a distraction-free mode.
- Renders math (KaTeX), diagrams (Mermaid), and code blocks with syntax highlighting.
- Supports multiple document types: standard markdown notes, whiteboards (canvas), and mind maps; all can be saved, synced, and shared.
- Offers workspace state persistence (open tabs, folders, UI settings) plus a Spotlight-style quick-search across notes and features.
- Syncs user data to Convex (cloud) and supports offline-first behavior with local hydration and later sync.
- Exports and desktop-sync via Tauri: maps a local folder to notes and supports packaged desktop builds and auto-updates.

## Key features

- Keyboard-first Markdown editor (CodeMirror 6) with extensible keybindings
- Live split preview with:
  - GitHub-flavored markdown, math (remark-math + rehype-katex)
  - Syntax highlighting and code block rendering
  - Mermaid diagrams and LaTeX support
- Backlink/graph view (built with d3 + custom graph code)
- Whiteboard and mindmap modes with JSON-serialised canvas/mindmap state
- Shareable note viewer (public/private shares)
- Spotlight search for fast navigation and feature access
- Convex-powered cloud sync (users, tabs, workspaces, mindmaps, whiteboards)
- Tauri desktop support with local filesystem sync and auto-update integration

## Tech stack

- Framework: Next.js (App Router)
- Language: TypeScript
- UI: Tailwind CSS, shadcn/ui (Radix primitives), Lucide icons
- Editor: CodeMirror 6 and various editor extensions
- Data and backend: Convex (serverless data and functions)
- Auth: WorkOS AuthKit (Next.js integration)
- State: Zustand
- Desktop: Tauri (v2) with multiple platform bundle targets and the Tauri updater plugin
- Extras: mermaid, KaTeX, rehype/remark pipeline, d3-force, jszip, file-saver

## Architecture and data model

- The app is a Next.js app using the App Router for client and server routes.
- Convex stores the core data model: `users`, `tabs` (documents), `workspaces` (UI state and settings), `whiteboards`, `mindmaps`, and `sharedNotes`.
- The UI is modular: editor and preview components, shell views (sidebar, file tree, graph, whiteboard, spotlight search), and sync helpers in shared libs.
- Desktop builds use static export for Tauri builds and a lightweight relay for OAuth support in desktop sign-in flows.

## Example command

```powershell
npm install
npm run dev
```

## Role and responsibilities

I designed, implemented, and maintain the full-stack product including:

- UX and keyboard-first editor interactions
- Client architecture and state synchronization
- Convex schema design and server functions
- Tauri desktop integration and build tooling
- Authentication flows with WorkOS
