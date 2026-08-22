# AGENTS.md

Instructions for AI coding agents (and future contributors) working in this
repository. Read this before touching styles, colors, or component markup.

## Project

A React + TypeScript Tic Tac Toe game, built with Vite, tested with Vitest +
Testing Library. Game logic lives in [`src/components/Board/Board.tsx`](src/components/Board/Board.tsx)
and [`src/components/Block/Block.tsx`](src/components/Block/Block.tsx); do not
change their behavior for a styling task.

Run `npm test` before finishing any change — the suite asserts on rendered
text and ARIA attributes, so a markup change that isn't purely cosmetic can
break it silently.

## Design tokens — the single source of truth

**All color, glow, font, radius, shadow, and transition values live in
[`src/styles/tokens.css`](src/styles/tokens.css).** Every other stylesheet
(`App.css`, `*.module.scss`) must reference these custom properties — never
hardcode a hex color, an rgba glow, or a font stack inline in a component
file. If you need a value tokens.css doesn't have yet, add it there first,
then consume it.

Why this matters: before this file existed, the same neon-pink glow shadow
was hand-written with slightly different rgba values in four separate
places (`App.css`, `Board.module.scss`, `Block.module.scss`), and the body
font was declared twice with two *different, conflicting* stacks in
`index.css` and `App.css`. Neither was intentional — they were just repeated
by hand during iteration. Tokens prevent that drift.

### What's in tokens.css

- **Base colors**: `--primary-color` (neon pink, X), `--secondary-color`
  (neon teal, O), `--accent-color` (neon gold, win state), plus
  `--background-color` / `--surface-color` / `--surface-raised-color` /
  `--text-primary` / `--text-secondary` / `--border-color`.
- **Glow shadows** (`--glow-primary-sm/md/lg/hover/ring`,
  `--glow-secondary-sm`, `--glow-accent-sm/md/ring-from/ring-to`): complete,
  ready-to-use `box-shadow`/`text-shadow` values — multiple blur layers
  already composed. Use one of these instead of writing a new
  `0 0 Npx rgba(...)` glow inline. If none of the existing tiers fit, add a
  new named tier to tokens.css rather than a one-off in a component file.
- **Alpha variants** (a tinted border, a soft background tint) are derived
  with `color-mix(in srgb, var(--primary-color) 50%, transparent)` rather
  than a hardcoded `rgba(255, 59, 92, 0.5)`. This keeps every tint tied to
  the one base color — change the hex once in tokens.css and every tint,
  border, and glow that derives from it updates automatically.
- **Fonts**: `--font-display` (Monoton — for short, iconic glyphs only: the
  page title and the X/O marks) and `--font-body` (Space Grotesk — for
  everything else: subtitle, messages, buttons). Never introduce a third
  font family without updating tokens.css.
- **Type scale** (`--font-size-xs` through `--font-size-4xl`): every
  `font-size` in the app is one of these 9 steps — none are set as a raw
  rem value in a component file. A responsive rule drops by exactly one
  step (e.g. `--font-size-4xl` → `--font-size-3xl`), never to an arbitrary
  in-between size. Also: `--font-weight-normal/medium/bold`,
  `--letter-spacing-wide/wider`, `--line-height-tight/base`.
- **Spacing scale** (`--space-1` through `--space-10`, a 4px grid): every
  `padding`, `margin`, and `gap` in the app uses one of these steps. A
  component's own intrinsic size (the badge's 56px diameter, the card's
  500px max-width, the reset button's 150px min-width) is not spacing and
  stays a literal value — don't force those onto the spacing scale.
- **Shape/motion**: `--border-radius`, `--border-radius-sm`, `--shadow-sm/md/lg`
  (non-glow elevation, for things like the hard drop-shadow under the
  card), `--transition`.
- **Not tokenized (known gap)**: the `768px`/`480px` responsive breakpoints
  are repeated as literal values in each `@media` query. CSS custom
  properties can't be used inside a media query condition without a
  PostCSS plugin (`postcss-custom-media`), which this project doesn't have
  set up. If that gap starts to bite, add the plugin rather than
  approximating it with something like `calc()` tricks.

### High contrast and reduced motion

`tokens.css` already overrides the color tokens under
`@media (prefers-contrast: high)` (flips to pure black/white/blue/orange,
matches WCAG forced-colors expectations). `App.css` already disables all
animation/transition globally under `@media (prefers-reduced-motion: reduce)`.
Both are global — you don't need to repeat either media query in a
component file. If you add a new animation, it's covered automatically.

### `color-mix()` browser support

Used for every alpha-derived tint/border/glow. Supported in current
Chrome/Edge, Safari 16.4+, Firefox 113+. If it's unsupported, the specific
shadow/border layer using it is dropped (invalid value), which loses a
decorative glow but never breaks legibility — no token uses `color-mix()`
for a base text or fill color. Acceptable given this app already relies on
other modern-only CSS (`aspect-ratio`, `:focus-visible`).

## Theme identity — read before restyling

The current theme is **"Night Diner Neon"**: near-black background, glowing
neon-pink/teal/gold accents, soft blurred glow shadows (never hard offset
"pop-art" drop shadows), Monoton display type on dark.

This was chosen *specifically* to look different from another portfolio
piece (a Rock Paper Scissors app) that uses a light cream background, thick
black outlines, hard offset (non-blurred) drop shadows, and a chunky
rounded display font. **If you're asked to redesign or reskin this app
again, ask first (or explicitly confirm) whether the new direction needs to
stay visually distinct from that other piece** — don't default back to a
light/cream + hard-shadow + black-outline look without checking, since
that's the exact combination this redesign was moved away from.

Design mockups explored for this app (including the ones not chosen) are
not stored in this repo — they were drafted and published as an Artifact
during the design session, not committed as project files.

## Accessibility rules already in place — don't regress these

- Every interactive cell has a real, descriptive `aria-label` computed in
  [`Block.tsx`](src/components/Block/Block.tsx) (position + contents + win
  state) — don't replace it with a generic label.
- Marks (X/O) must stay distinguishable by more than color alone — currently
  by character shape (X vs O) plus color plus the `aria-label`. If you ever
  switch to icon-based marks, keep a non-color differentiator.
- Live region (`#game-status`, `aria-live="polite"`) announces game state
  changes to screen readers — keep it in sync with any new game-state text.
- Focus rings use `:focus-visible` with token colors, never remove outline
  without providing an equivalent visible focus indicator.
- Hit targets (grid cells) must stay ≥44px — check at the 480px breakpoint
  if you touch grid sizing.
- No emoji as functional icons (see `AI slop` note below) — the header badge
  and X/O marks are hand-drawn SVG / styled type, not emoji.

## General style rules

- No emoji in UI copy or as icons unless explicitly requested — the win/tie
  messages in [`constants.ts`](src/constants.ts) were deliberately stripped
  of emoji during the neon redesign to match the cleaner tone.
- Don't add a second place that declares the same CSS custom property
  (e.g. a component-local `:root` block) — everything global belongs in
  `tokens.css` only.
- Prefer `var(--token-name)` and `color-mix()` derivations over new literal
  colors. If grep finds a raw hex color or `rgba(` outside `tokens.css`,
  that's a signal it should probably be a token.
- Same for spacing and type: if grep finds a raw `rem`/`px` value on
  `font-size`, `font-weight`, `letter-spacing`, `padding`, `margin`, or
  `gap` outside `tokens.css`, snap it to the nearest existing scale step
  (`--font-size-*`, `--space-*`) rather than leaving it as a one-off. If
  nothing on the scale is close, that's a sign to add a new step to
  `tokens.css`, not to write a bespoke value in the component file.
