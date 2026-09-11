# Flipbox Builder

A Vue 3 + Vite app for building a "flipbox": a card with rich-text front and
back content that flips between the two sides. Edits made in the builder are
reflected live in the preview, with no manual save or refresh required.

## Features

- Rich-text editing (via TipTap) for both the front and back of the card,
  supporting bold, italic, bulleted/numbered lists, and undo/redo.
- Live preview with a 3D flip interaction between front and back.
- Content is saved automatically to the browser's local storage, so it
  persists across page reloads.
- Light/dark theme toggle, with the preference remembered between visits.
- Responsive layout that adapts from a two-column desktop view down to a
  single stacked column on narrow screens.
- Accessibility-conscious: keyboard-operable flip and toolbar controls,
  screen-reader-friendly labels, and the current card side is announced in
  text (not conveyed by the flip animation alone).

## Requirements

- Node.js 20.19.x, or Node.js 22.12 or later
- npm

## Install and run

```bash
npm install
npm run dev
```

This starts a local dev server (Vite will print the URL, typically
`http://localhost:5173`).

Other available scripts:

```bash
npm run build    # production build, output to dist/
npm run preview  # preview the production build locally
```

## Project structure

```tree
src/
  App.vue                          # top-level layout (builder + preview)
  main.js
  style.scss
  styles/
    colors.scss                    # shared color variables + theme tokens
  assets/
    logo/                          # logo image asset(s)
  components/
    AppHeader/                     # branded header bar (logo, title, theme toggle)
    AppLogo/                       # logo image component
    ThemeToggle/                   # light/dark mode switch
    FlipboxBuilder/                # front/back editing, persistence
    FlipboxPreview/                # flip interaction, state communication
    RichTextEditor/                # TipTap wiring + formatting toolbar
  composables/
    usePersistence.js              # generic localStorage save/load helper
    useTheme.js                    # dark/light theme state + persistence
```

Each component folder splits into `<Name>.vue` (template), `<Name>.js`
(script), and `<Name>.scss` (styles).

## AI-assisted development

Portions of this project were built with AI coding tool assistance. See
[AGENTS.md](./AGENTS.md) for the disclosure and the conventions those tools
were instructed to follow.
