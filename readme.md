# Flashblocks Toggle

**Author:** Sunny Morgan\
**Tags:** block, toggle, switch, content toggle, interactivity-api, flashblocks\
**Requires at least:** 6.7\
**Tested up to:** 6.8\
**Stable tag:** 1.0.0\
**Requires PHP:** 7.4\
**License:** GPLv2 or later\
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html

Flashblocks Toggle is a lightweight, high-performance WordPress block built
using the **WordPress Interactivity API**. It allows users to create a localized
toggle switch that controls the visibility of content items across the entire
page based on CSS class names.

Commonly used for:

- Price toggles (Monthly vs. Annual)
- Language switches
- Simple state management for page sections

## Key Features

- **Interactivity API Powered:** Fast, reactive, and built the "WordPress way."
- **Global Control:** Toggle content anywhere on the page, not just inside the
  block itself.
- **Accessible:** Uses semantic HTML and button elements for keyboard
  navigation.
- **Highly Customizable:** Supports custom labels, initial state, and uses
  standard WordPress design tools for styling.
- **Zero Configuration CSS:** Automatically generates the necessary CSS to
  handle visibility based on your selected classes.

## How It Works (Step-by-Step)

1. **Add the Block:** Insert the **Flashblocks Toggle** block into your page.
2. **Configure Classes:**
   - Find the **Toggle Settings** in the sidebar.
   - Set the **Left Class** (e.g., `monthly`).
   - Set the **Right Class** (e.g., `annually`).
3. **Set Labels:** Update the **Left Label** and **Right Label** (e.g.,
   "Monthly" and "Annual Plan").
4. **Tag Your Content:**
   - Select any other block on your page (e.g., a Group, Column, or Heading).
   - Go to **Advanced > Additional CSS classes**.
   - Add the corresponding class name (either your Left Class or Right Class).
5. **Publish:** When the toggle is switched, the Interactivity API updates a
   data attribute on the `<body>` element, which triggers CSS to show/hide the
   matching blocks instantly.

## Block Settings

- **Left/Right Class:** Unique CSS classes used to identify which elements to
  show/hide.
- **Initial Side:** Choose which side is active by default on page load.
- **Labels:** Text displayed next to the toggle switch.
- **Interactivity API:** Seamlessly handles state transitions without page
  reloads.

## Development

The block is built using `@wordpress/scripts`.

1. **Environmental Setup:**
   - Ensure Node.js and npm are installed.
   - Navigate to the plugin directory:
     `wp-content/mu-plugins/flashblocks-toggle`.
2. **Installation:**
   ```bash
   npm install
   ```
3. **Local Development:**
   ```bash
   npm start
   ```
   _Runs the build process in watch mode._
4. **Production Build:**
   ```bash
   npm run build
   ```
   _Minifies and optimizes code for production use._

## Technical Details

The block utilizes a CSS-only show/hide mechanism triggered by a body attribute:

```css
body:not([data-toggle-leftclass="right"]) .right-class {
    display: none !important;
}
body[data-toggle-leftclass="right"] .left-class {
    display: none !important;
}
```

This ensures that "Cumulative Layout Shift" (CLS) is minimized and the toggle
state is reflected immediately upon page load if an initial state is set.
