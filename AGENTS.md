# AGENTS.md

Instructions for AI coding tools (e.g. GitHub Copilot) working in this repo,
included per the task's AI-disclosure requirement. See the project summary
for how these were used and verified.

## Task context

This repo is a submission for the Flipbox Builder developer task: a Vue 3 +
Vite + TipTap starter app with three areas marked `TODO` to complete —
rich-text toolbar, persistence, and the flip/preview interaction. Full
requirements live in the task spec (not in this repo); the README covers
running the starter.

## Conventions to follow

- Each component lives in its own folder under `src/components/<Name>/`,
  split into `<Name>.vue` (template + `src` links), `<Name>.js` (script),
  and `<Name>.scss` (styles, `<style lang="scss" src="./<Name>.scss">`).
  Note: `<script setup>` cannot use the `src` attribute, so component
  scripts use a plain `<script>` block exporting an options object with
  an explicit `setup(props, { emit })` function instead of `<script setup>`
  syntax.
- Keep the preview reactive/live — no manual save or refresh should ever be
  required to see builder edits reflected. Do not introduce a separate
  browser tab/window for the preview.
- Reuse `src/composables/usePersistence.js` for storage; don't add a second
  persistence mechanism.
- Match existing formatting/toolbar patterns (e.g. `aria-pressed` reflecting
  `editor.isActive(...)`, `editor.chain().focus().<command>().run()`).
- Required rich-text formatting: paragraphs, bold, italic, one list style,
  undo, redo. Don't scope-creep into extra formatting/animation polish —
  the task is time-boxed (~4-6 focused hours).
- Accessibility is an explicit evaluation criterion: the flipbox's current
  side (front/back) must be communicated in a way that doesn't rely solely
  on the visual flip animation (e.g. text label and/or `aria-live` region,
  not just CSS transforms).
- No test framework is configured; verify changes manually via `npm run dev`
  rather than adding a test setup, unless explicitly asked.
- Bootstrap's CSS is imported globally in `src/main.js`; prefer Bootstrap
  utility/component classes over new custom CSS where reasonable, but keep
  existing component-scoped styles as-is unless asked to convert them.
  `bootstrap-icons` is also installed and imported globally for toolbar/UI
  icons (`<i class="bi bi-...">`).
- Layout/spacing/typography has been converted to Bootstrap utility classes
  throughout (grid via `container`/`row`/`col-*`, `d-flex`/`gap-*`,
  `rounded-*`, `p-*`/`mb-*`, `small`/`fw-*`/`text-uppercase`, etc.), which
  is why the breakpoints follow Bootstrap's scale (`col-lg-6` at 992px,
  `col-md-6` at 768px) rather than bespoke pixel values. Custom CSS in each
  component's `.scss` file is reserved for things Bootstrap utilities
  can't (or, given the choice below, shouldn't) express: theme-aware
  `var(--color-*)`/fixed `$color-*` values, the flip card's 3D transform
  mechanics, and exact non-scale pixel sizing (e.g. the 40px toolbar
  buttons, 36px logo height). When a component needs a Bootstrap-styled
  color that should react to our custom dark mode, don't reach for
  Bootstrap's own color utility classes (`bg-primary`, `text-muted`,
  etc.) - those read Bootstrap's own `--bs-*` variables, which don't
  switch with our `data-theme` attribute since we didn't adopt Bootstrap's
  native dark mode. Write the themed property directly with
  `var(--color-*)` instead. `ThemeToggle` uses Bootstrap's native
  `form-check.form-switch` component (a real `<input type="checkbox"
  role="switch">`) rather than a hand-built switch, retinted to
  `$color-accent` via Bootstrap's own `--bs-form-check-input-checked-*`
  CSS custom properties instead of overriding its rendered styles.
- All colors live in `src/styles/colors.scss`, not hardcoded hex values in
  component stylesheets. Two kinds of tokens are defined there:
  - `$color-*` Sass variables - fixed brand colors that don't change with
    theme (e.g. `$color-accent`, `$color-ink`). Use these for things that
    should look the same in light and dark mode (header bar, flip button,
    focus outlines).
  - `--color-*` CSS custom properties declared on `:root` and
    `:root[data-theme='dark']` - theme-switchable tokens (e.g.
    `--color-surface`, `--color-text`, `--color-border`). Use
    `var(--color-*)` for any surface/text/border color that should flip
    between light and dark mode.
  When adding new colors, add them to `colors.scss` rather than inlining a
  hex value, and check contrast against WCAG AA (4.5:1 for normal text)
  before picking a value.
- Dark mode is implemented via `src/composables/useTheme.js`, which sets
  `data-theme="dark"|"light"` on `<html>` and persists the choice via
  `usePersistence.js` (falls back to `prefers-color-scheme` if nothing is
  saved yet). `index.html` has an inline script that applies the theme
  attribute before first paint (reading the same storage key) to avoid a
  flash of the wrong theme - keep that script's storage key/logic in sync
  with `useTheme.js` if either changes. The toggle UI lives in
  `src/components/ThemeToggle/`.
- Accessible names for custom ARIA widgets: native `<label for="...">`
  association only computes an accessible name for real form controls
  (`input`, `textarea`, `select`). It does **not** work for a plain
  `<div role="textbox">` (e.g. TipTap's `.ProseMirror` element) or other
  custom ARIA roles - those need `aria-labelledby` (or `aria-label`)
  instead/in addition. See `RichTextEditor.js`'s `labelledBy` prop for the
  pattern used here.

## Out of scope for AI tools

- Do not fabricate or assume the contents of the "project summary template"
  referenced by the task spec — it must come from the user.
- Do not make submission-related decisions (repo visibility, where/how to
  submit) — those are the user's responsibility.
