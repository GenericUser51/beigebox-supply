# Beigebox Supply Co.

A storefront concept for a marketplace that sells retro casework and accessories for modern PCs, styled after cassette futurism and 1980s office hardware.

## Run it

No build step. Either:

- Open `index.html` in a browser, or
- In VS Code, install the recommended **Live Server** extension (VS Code offers it when you open the folder), then right-click `index.html` → **Open with Live Server**. The page reloads as you save.

## Files

| Path | What it holds |
| --- | --- |
| `index.html` | Page markup: header, CRT hero, catalog, rig builder, spec sheet, footer, cart drawer |
| `css/styles.css` | All styling. Colours and fonts are tokens in the `:root` block at the top |
| `js/app.js` | Product data, product illustrations (inline SVG), catalog filters, cart, rig builder, CRT animation |

## Where to change things

- **Products:** the `PRODUCTS` array in `js/app.js`. Each item has an id, name, department, price, art key, description and spec tags.
- **Departments:** the `DEPTS` array in `js/app.js`.
- **Rig builder options:** `SHELLS`, `STRIPESETS`, `BAYS` and `BASE` (base price) in `js/app.js`.
- **Product colourways (detail popup):** `OPTION_GROUPS` in `js/app.js`. Each choice overrides the colour tokens the product drawing uses. A product uses shell finish + accent stripe by default; set `opts` on a product to change which groups it offers, and `defaults` to change its starting colourway.
- **Colours and fonts:** the `:root` tokens in `css/styles.css`.

## Not wired up yet

- Checkout and the newsletter form only show a message; there is no backend.
- The cart lives in memory and clears on reload.
- Product names, prices and specs are placeholders.
