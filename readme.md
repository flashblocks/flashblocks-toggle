# Flashblocks Toggle

**Author:** Sunny Morgan\
**Tags:** block, toggle, switch, content toggle, interactivity-api, flashblocks\
**Requires at least:** 6.7\
**Tested up to:** 6.8\
**Stable tag:** 1.0.1\
**Requires PHP:** 7.4\
**License:** GPLv2 or later

Flashblocks Toggle is a lightweight, high-performance WordPress block built
using the **WordPress Interactivity API**. It allows users to create a localized
toggle switch that controls the visibility of content items across the entire
page based on CSS class names.

## Key Features

- **Interactivity API Powered:** Fast, reactive, and built the "WordPress way."
- **Zero-Flicker Rendering:** Uses inline scripts to set the toggle state before
  the page paints, preventing Cumulative Layout Shift (CLS).
- **Auto-Reveal Editor Logic:** Automatically switches the toggle in the editor
  when you select a block containing one of the target classes.
- **"Labels Inside" Mode:** A premium UI option that transforms the switch into
  a large, pill-style toggle with internal labels.
- **Global Control:** Toggle content anywhere on the page instantly via
  body-level data attributes.
- **Accessible:** Fully keyboard-accessible with semantic HTML (`role="switch"`)
  and dynamic ARIA attributes.
- **Lightweight:** Zero external dependencies (No MUI/Emotion). Uses native
  WordPress components and CSS variables.

## How It Works

1. **Add the Block:** Insert the **Flashblocks Toggle** block.
2. **Configure Classes:** Set a **Left Class** (e.g., `monthly`) and a **Right
   Class** (e.g., `annually`).
3. **Tag Your Content:** Add these classes to any other blocks on the page
   (Advanced > Additional CSS classes).
4. **Visibility:** On the frontend, the Interactivity API toggles a
   `data-toggle-{leftClass}="right"` attribute on the `<body>`.
5. **CSS Logic:** The plugin automatically injects highly specific CSS to
   show/hide the matching elements.

## Technical Implementation

- **PHP Rendering:** Uses `<<<htm` heredoc syntax for clean, maintainable
  output.
- **CSS Variables:** Fully customizable via CSS variables (e.g.,
  `--switch-active-bg`, `--switch-height`).
- **Editor Isolation:** Frontend visibility logic is wrapped in `!is_admin()`
  checks to ensure the editor view remains stable and doesn't "fight" the manual
  toggle clicks.
- **Assets:** Built via `@wordpress/scripts` with manifest support.

## Development

```bash
# Install dependencies
npm install

# Start development (watch mode)
npm start

# Production build
npm run build
```

---

## AI & Developer Context (Read First)

If you are an AI assistant or developer working on this codebase, keep these
architectural patterns in mind:

- **Namespace:** All Interactivity API logic resides in the `flashblocks/toggle`
  namespace.
- **Editor Stability:** Visibility in the editor is controlled via a reactive
  `<style>` tag in `edit.js` scoped to `.editor-styles-wrapper`. Do **not**
  inject body attributes in the editor.
- **Auto-Reveal:** The `edit.js` uses a `useSelect` hook to detect current
  selection. It uses a `ref` (`lastSelectionId`) to ensure the toggle only
  auto-flips when the selection _moves_ to a different block, allowing users to
  manually toggle while staying on the same block.
- **State Syncing:** Multiple instances of the toggle with the same `leftClass`
  are kept in sync via a `CustomEvent` named `flashblocks-toggle-sync`.
- **Heredoc Preference:** When editing `render.php`, always prefer the `<<<htm`
  heredoc syntax for HTML output.
- **Pruned Deps:** Do not re-add MUI or Emotion. Use WordPress core components
  from `@wordpress/components` or vanilla CSS/SCSS.
