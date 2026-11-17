# Craftsman Sass Architecture vs. Tailwind — Authoring Feature Comparison

## Architectural framing

Tailwind is a **utility-first atomic CSS generator**: authoring happens in markup (`class="flex gap-4 md:gap-8 dark:bg-gray-900"`), and the build tool emits only the CSS that's referenced. Craftsman is a **component-style SCSS authoring system**: you author in `.scss` files using functions (`color()`, `width()`), mixins (`breakpoint()`), and placeholders (`%button-styles`), then `@extend`/nest them onto semantic selectors. These are different authoring models, so "feature parity" has to mean *parity of authoring capability*, not literal utility-class parity.

## Feature comparison

| Tailwind authoring capability | Craftsman equivalent | Status |
|---|---|---|
| Design-token spacing scale (`p-4`, `gap-2`) | `width("gutter", n)` Sass fn + TS `width()` | ✅ present |

| Design-token color scale (`bg-blue-500`) | `color("blue500")` → `var(--blue500)` | ✅ present |

| Color opacity modifier (`bg-blue-500/50`) | `color(name, rgba, alpha)` | ✅ present, but different ergonomics (explicit arg, not a slash suffix) |

| Responsive breakpoint prefixes (`md:`, `lg:`) | `@include breakpoint(key) { }` mixin | ⚠️ partial — only usable inside SCSS authoring, not as a reusable "variant" applied to arbitrary declarations without wrapping in a block |
*** NOTE: this is not entirely accurate, we also have js based breakpoint ***

| Config-driven breakpoints, overridable per-project | `@use ".../config" with ($bp-tablet: 768)` | ✅ present |

| Cascade-layer ordering (`@layer theme,base,components,utilities`) | `@layer cf-base, cf-component, cf-theme` | ✅ present (even has `hoist`/`layered` interop with Tailwind's own layer order) |

| State variants (`hover:`, `focus:`, `active:`, `disabled:`, `checked:`) | `@mixin state($names...)` for compound pseudo-class chains; single pseudo-classes stay native selectors by design | ✅ addressed — the only genuine compound chain in the codebase is converted; nothing else qualifies (see Status below) |

| `group-hover:` / `peer-*` (style based on a relative's state) | `@mixin group-state`/`peer-state` exist, no components use `.group`/`.peer` classes | ❌ missing (audited: no genuine use case exists yet) |

| `aria-*` / `data-*` state variants (`data-[open]:`, `aria-disabled:`) | `@mixin data`/`aria`; `data()` adopted for the shared compound selector in `DatePicker`/`DateRangePicker`/`DateTimePicker` | 🟡 partially adopted (`data()` only; `aria()` has no candidates) |

| Dark mode variant (`dark:`) | `@mixin dark` (authoring) + a neutral-scale dark palette in `globalStyles.scss`, applied automatically via `@media (prefers-color-scheme: dark)` and overridable via `[data-theme="dark"]`/`[data-theme="light"]` | ✅ present |

| Logical properties (`ms-`, `me-`, `ps-`, `pe-` for RTL) | `margin-inline`/`margin-block`/`padding-inline`/`padding-block`/`inset-inline`/`inset-block` mixins, adopted across every component | ✅ present |

| Arbitrary values (`w-[137px]`, `[mask-type:luminance]`) | `width()` keys are extensible via `$extra-widths`/`CraftsmanCustomWidths` declaration merging; `color()` was already open (`var(--name)` with no validation) | ⚠️ by design (matches the "no obscure multipliers, use literal px" rule) — extending still requires registering a named key up front, not a true one-off `[137px]`-style arbitrary value inline at the call site |

| Container queries (`@container`, `@sm:`) | `@mixin container-type`/`container` exist, no adoption | ❌ missing (audited: no genuine use case exists yet) |

| `!important` modifier (`!bg-red-500`) | None | ❌ missing (not usually needed in component SCSS, but no helper if a consumer needs an override escape hatch) |
*** NOTE: we can create a helper ***

| Negative values (`-mt-4`) | Negative multiplier allowed (`width("gutter", -0.5)`) per skill doc | ✅ present |
| Theme customization via config/CSS vars | `ThemeProvider` + `theme.widths`/`theme.root`/`theme.components` + `--w-*`/color CSS vars | ✅ present, arguably more flexible (runtime, not just build-time) |

| Plugin system (register new utilities) | `$extra-widths`/`CraftsmanCustomWidths` for new `width()` keys; `color()` was always open; `scale()` + `$extra-scales`/`CraftsmanScales`/`theme.scales` for registering an entirely new named utility function | ✅ present — `scale()` is a general plugin point: a consuming app registers a brand-new scale (e.g. `shadow`, `radius`) via Sass `$extra-scales` + a `CraftsmanScales` declaration merge + `theme.scales`, without editing package source |

| `@apply` (compose utilities into a class) | `%placeholder` + `@extend` | ✅ equivalent, arguably cleaner |

| Animation/transition utilities (`transition-colors`, `duration-150`) | Ad hoc, hand-written per component (`transition: background-color 0.15s ease;` in `_checkbox.scss`) | ⚠️ no shared timing/easing tokens or mixin |
*** NOTE: we can try this ***

| Space-between / divide utilities (`space-y-4`, `divide-x`) | None | ❌ missing (low priority, easy to express via `gap`) |
*** NOTE: This is not needed ***

## Mixins reference

`state`, `dark`, `group-state`/`peer-state`, `data`/`aria`, the logical-property shorthands, and `container-type`/`container` are implemented in [src/styles/utilities/_mixins.scss](../src/styles/utilities/_mixins.scss), exported at `@stamcat/craftsman/styles/utilities/mixins`. Usage rules and when-to-adopt criteria for each are documented in the [craftsman-style-utilities skill](../skills/craftsman-style-utilities/SKILL.md) — that skill is the source of truth for AI agents authoring styles with this package; this doc only tracks parity status against Tailwind.

## Out of scope by design

Utility-class generation, JIT/purge, and arbitrary-value escape hatches are intentionally out of scope given craftsman's component-SCSS model (they'd fight the "single root class + nested selectors" convention), so these aren't flagged as gaps — they're a different paradigm, not a missing feature.

## Status of previously tracked gaps (last audited 2026-11-17)

All gaps identified in earlier passes of this document are now either closed or confirmed to have no genuine adoption candidate. None require further action unless new component code introduces a matching pattern:

- **Dark mode** — closed. `globalStyles.scss` swaps the neutral `--white`/`--black`/`--text`/`--gray*` scale automatically (`@media (prefers-color-scheme: dark)`) and manually (`[data-theme="dark"]`); `@mixin dark` remains available for one-off component overrides.
- **Logical properties (RTL)** — closed. Every component uses logical-property mixins/native logical properties instead of physical `left`/`right`/`margin-left`/etc.; remaining physical properties are intentional exceptions (decorative glyph shapes, direction-symmetric centering math, single uniform-value shorthand, the deprecated `Text.alignment` prop).
- **Plugin/extension point** — closed. `width()` keys are extensible (`$extra-widths`/`CraftsmanCustomWidths`); `scale()` lets consumers register an entirely new utility function (`$extra-scales`/`CraftsmanScales`/`theme.scales`).
- **State variants (`m.state()`)** — closed, no further action. The mixin only composes AND-chains of pseudo-classes (not OR lists); the one genuine compound chain in the codebase (`_checkbox.scss`'s `&:checked:disabled`) is converted. Audited every other candidate component (`_button.scss`, `_select.scss`, `InputPhone.scss`) — all use single pseudo-classes or comma-separated OR lists, neither of which the mixin can safely represent, so they correctly stay as native selectors.
- **`group-*`/`peer-*`/`aria-*`** — unadopted, audited, and expected to stay that way: no component uses a `.group`/`.peer` class, a sibling-combinator selector, or a hand-written `&[aria-*]` selector. `data()` is the one adopted case (`DatePicker`/`DateRangePicker`/`DateTimePicker`'s shared compound attribute selector).
- **Container queries** — unadopted, audited: the only size-conditional CSS in the codebase (`Modal.scss`) is correctly viewport-based, not container-based.

