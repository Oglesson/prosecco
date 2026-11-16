# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm install          # install dependencies
gulp                 # default: compile CSS/JS, copy assets, start local server with livereload
gulp css             # compile prosecco skin SCSS → www/css/style.css
gulp rubyskincss     # compile ruby skin SCSS → www/css/rubyskin.css
gulp cleanCSS        # minify compiled CSS → *.min.css
gulp js              # concat + minify JS → www/js/scriptAll.min.js
gulp inlinesource    # inline CSS/JS into index.html and help.html (depends on css + js tasks)
gulp watch           # watch SCSS/JS/images and recompile on change
```

There are no tests.

## Architecture

This is a **static login UI skin** for Ruby's SSO system. The `src/` directory is the source of truth; `www/` is compiled output (do not edit directly).

### Two skin variants

| Skin                              | SCSS entry               | Output                 |
| --------------------------------- | ------------------------ | ---------------------- |
| **prosecco** (default VM brand)   | `src/sass/style.scss`    | `www/css/style.css`    |
| **ruby** (partner brand override) | `src/sass/rubyskin.scss` | `www/css/rubyskin.css` |

Both CSS files are loaded on every page. `rubyskin.css` is loaded **after** `style.css` and selectively overrides prosecco styles — it does not stand alone.

### SCSS partial load order (prosecco)

`style.scss` imports in order: `_variables` → `_fonts` → `_sprite` → `_mixins` → `_content`

`rubyskin.scss` imports: `_variables` → `_rfonts` → `_rubyvariables`, then declares overrides inline.

`_rubyvariables.scss` shadows variables from `_variables.scss` for the ruby palette; `_rfonts.scss` swaps in the ruby typeface.

### JS

`src/js/lib/*.js` (vendor, e.g. jQuery 3.1.1) is concatenated before `src/js/script.js`, then uglified to `www/js/scriptAll.min.js`.

### Inline source

The `inlinesource` task reads `src/index.html` and `src/help.html`, finds tags marked with the `inline` attribute, and embeds the referenced CSS/JS directly into the HTML, writing the result to `www/`.

### HTML pages

- `index.html` — sign-in form (email + password, show/hide password, JS-enabled hidden field for SSO backend)
- `help.html` — "trouble signing in" help, opened in a popup via `showHelp()`
- `loading.html` — loading/transition state
- `login-general-error.html` — generic SSO error state

The SVG infinity logo in `index.html` is animated via CSS stroke-dashoffset on `#svgInfinity`. The ruby skin hides it and substitutes a static PNG logo instead.
