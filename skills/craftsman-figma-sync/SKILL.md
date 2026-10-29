---
name: craftsman-figma-sync
description: 'How Craftsman syncs design tokens and components to the companion Figma file. Use when asked to update Figma tokens/variables, build or update a Figma component for Craftsman, add a new figma:* sync action, or when asked to check for Figma component updates / run the Figma sync (npm run figma:sync).'
---

# Craftsman <-> Figma Sync

## Build/fix from the real component code, not from a screenshot guess

Before building a new Figma component or fixing its layout, read the component's actual `.tsx` and `.scss` (and any underlying library's CSS it wraps, e.g. `react-international-phone`) to find the real DOM structure — which elements have their own border/fill, which are flex siblings vs. nested, exact padding/gap/corner-radius values, and literal text content. Reproduce that structure in Figma. Do not infer structure by eyeballing a screenshot or guessing a plausible-looking layout (e.g. inventing a divider rectangle between two fields that are actually two separately-bordered adjacent elements with overlapping borders) — the code is authoritative and already available, so there's no reason to guess.

## Checking for updates (`npm run figma:sync`)

`npm run figma:sync` can't call Figma itself — it just prints the prompt above for you to paste into an agent chat. Once pasted, follow this exact order, stopping early where noted:

1. `create_session` for file `2PzMyf40EctUIlY8UyN4Ue` (see account constraint below).
2. `use_figma`: run the fingerprint script in "Detecting Figma changes" below, scoped to each component's named section. Save the result to `scripts/figmaSync/fingerprints.json`.
3. Run `npm run figma:diff-components scripts/figmaSync/fingerprints.json`.
4. If `added` and `changed` are both empty: tell the user everything is in sync and stop. Do not go further.
5. For each component in `added`/`changed`: fetch its full Figma detail (variants, resolved variable values, text), read its matching `.tsx`/`.scss`/`AGENTS.md`, and write a recommendation to `scripts/figmaSync/recommendations/{Name}.md` describing the concrete code changes needed. Do not edit component code directly in this step.
6. Present the full list of recommendations to the user and ask which (if any) to apply — individually or all at once.
7. For each recommendation the user approves: apply the code change, then delete that component's `scripts/figmaSync/recommendations/{Name}.md` and run `npm run figma:record-component-state -- scripts/figmaSync/fingerprints.json "{Name}"` (the optional third arg scopes recording to just that component) so it stops being re-flagged. Leave declined recommendations' files — and their baseline entries — alone for next time.
8. Once every approved recommendation is applied and recorded, delete `scripts/figmaSync/fingerprints.json`.

## Figma file

- File: "Craftsman Design System"
- File key: `2PzMyf40EctUIlY8UyN4Ue`
- Team: Stamcat (`team::1694817487755385939`), folder id `675113981`
- URL: https://www.figma.com/design/2PzMyf40EctUIlY8UyN4Ue

Figma MCP access for this repo must be signed in as the Stamcat-owning personal account (`salvos_crouton.9e@icloud.com`), not a work/org account — check with the `whoami` MCP tool before mutating the file; `user_id` must be `1694817484496729729`.

## Token source of truth

Codebase values, not Figma, are canonical:

- Colors: `src/styles/utilities/constants.ts` → `defaultColors`
- Widths/spacing: `src/styles/utilities/constants.ts` → `defaultWidths`

These compile to CSS custom properties (`--{name}` for colors, `--w-{name}` for widths) via `src/styles/global/variables.ts` and are consumed in Sass through `u.color(name)` / `u.width(name, multiplier)`.

## Sync script

`scripts/figmaSync.ts` is the single, scalable entry point for turning codebase sources into Figma-consumable artifacts. Add new actions to its `actions` map rather than writing one-off scripts.

```
npm run figma:export-tokens
```

Writes `scripts/figmaSync/tokens.json` (gitignored, regenerate on demand) with the current `colors` and `widths` maps. Since `use_figma` plugin code runs inside Figma's sandbox (no filesystem access), the generated JSON is read with `read_file` and inlined as a literal JS object into the `use_figma` call that creates/updates Variables — it is a local staging artifact, not something Figma reads directly.

## Figma Variables layout

- Collection **Colors** (mode `Value`): one variable per `defaultColors` key, name matches the key verbatim (e.g. `red500`, `gray200`, `white`). Scopes: `FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR`. Code syntax (WEB): `var(--{name})`.
- Collection **Widths** (mode `Value`): one variable per `defaultWidths` key (e.g. `gutter`, `text`, `column`). Scopes: `GAP, CORNER_RADIUS, WIDTH_HEIGHT` as applicable per usage. Code syntax (WEB): `var(--w-{name})`.

When a component's SCSS computes a derived value (e.g. Button's `border-radius: calc(var(--w-gutter) * 0.75 * var(--btn-size))`), bind the Figma property to the primitive `gutter` variable and apply the multiplier through Figma's variable math / the component's own corner-radius binding — do not hardcode the resolved pixel value.

## Building components

Match the component's actual SCSS/AGENTS.md, not just its TSX — visual states (hover, disabled, variants) usually live in `src/styles/global/components/_{name}.scss`, separate from the simple prop-passthrough component file. Read both before building in Figma. Follow the `figma-generate-library` + `figma-use` skills for the build mechanics (variable binding, variant sets, naming).

## Detecting Figma changes that need a code update

Figma's real Dev Mode `devStatus` property is **not available** in this MCP sandbox (`"devStatus" is not a supported API` — confirmed, don't retry it). The repo convention instead: each top-level component family lives on its own page, inside a single **Section named after the component** (e.g. "Button", "Input", "Checkbox", "InputNumber"). Only nodes under a component's named section are ever candidates for a code-sync check.

There is no per-node Figma timestamp/version to rely on either, so change detection is a **content hash of a structural fingerprint**, computed and diffed entirely outside the LLM so unchanged components cost zero tokens to skip:

1. **Capture fingerprints (one `use_figma` call, cheap/deterministic — no visual judgement needed):**
   ```js
   function boundVarsSummary(node) {
     if (!node.boundVariables) return null;
     const out = {};
     for (const [prop, value] of Object.entries(node.boundVariables)) {
       out[prop] = Array.isArray(value) ? value.map((v) => (v?.id ?? v)) : (value?.id ?? value);
     }
     return out;
   }

   function paintSummary(paint) {
     const out = { type: paint.type, visible: paint.visible, opacity: Math.round((paint.opacity ?? 1) * 100) / 100 };
     if (paint.color) out.color = { r: Math.round(paint.color.r * 255), g: Math.round(paint.color.g * 255), b: Math.round(paint.color.b * 255) };
     if (paint.gradientStops) out.gradientStops = paint.gradientStops.map((s) => ({ position: Math.round(s.position * 100) / 100, color: s.color }));
     if (paint.imageHash) { out.imageHash = paint.imageHash; out.scaleMode = paint.scaleMode; }
     return out;
   }

   function fingerprintNode(node, depth) {
     if (depth < 0) return { truncated: true };
     const base = { type: node.type, name: node.name, boundVariables: boundVarsSummary(node) };
     if ("visible" in node) base.visible = node.visible;
     if ("opacity" in node) base.opacity = Math.round(node.opacity * 100) / 100;
     if ("rotation" in node) base.rotation = Math.round(node.rotation);
     if ("effects" in node && Array.isArray(node.effects)) base.effects = node.effects.map((e) => ({ type: e.type, visible: e.visible, radius: e.radius, color: e.color }));
     if ("x" in node) base.position = [Math.round(node.x), Math.round(node.y)];
     if ("width" in node) base.size = [Math.round(node.width), Math.round(node.height)];
     if (node.type === "COMPONENT_SET") base.componentPropertyDefinitions = node.componentPropertyDefinitions;
     if (node.type === "COMPONENT" && node.variantProperties) base.variantProperties = node.variantProperties;
     if ("fills" in node && Array.isArray(node.fills)) base.fills = node.fills.map(paintSummary);
     if ("strokes" in node && Array.isArray(node.strokes)) {
       base.strokeWeight = node.strokeWeight;
       base.strokeAlign = node.strokeAlign;
       base.strokes = node.strokes.map(paintSummary);
     }
     if ("cornerRadius" in node) base.cornerRadius = node.cornerRadius;
     if ("topLeftRadius" in node) base.cornerRadii = [node.topLeftRadius, node.topRightRadius, node.bottomRightRadius, node.bottomLeftRadius];
     if ("layoutMode" in node) {
       base.layoutMode = node.layoutMode;
       base.primaryAxisAlignItems = node.primaryAxisAlignItems;
       base.counterAxisAlignItems = node.counterAxisAlignItems;
       base.layoutWrap = node.layoutWrap;
     }
     if ("layoutSizingHorizontal" in node) base.layoutSizing = [node.layoutSizingHorizontal, node.layoutSizingVertical];
     if ("layoutAlign" in node) base.layoutAlign = node.layoutAlign;
     if ("layoutPositioning" in node) base.layoutPositioning = node.layoutPositioning;
     if ("paddingLeft" in node) base.padding = [node.paddingLeft, node.paddingRight, node.paddingTop, node.paddingBottom];
     if ("itemSpacing" in node) base.itemSpacing = node.itemSpacing;
     if (node.type === "TEXT") {
       base.characters = node.characters;
       base.fontName = node.fontName;
       base.fontSize = node.fontSize;
       base.textDecoration = node.textDecoration;
       base.textAlignHorizontal = node.textAlignHorizontal;
       base.textAlignVertical = node.textAlignVertical;
       base.textCase = node.textCase;
       base.lineHeight = node.lineHeight;
       base.letterSpacing = node.letterSpacing;
     }
     if ("children" in node) base.children = node.children.map((c) => fingerprintNode(c, depth - 1));
     return base;
   }

   const section = $fig.query('SECTION[name="Checkbox"]').first().node;
   return section.children.map((node) => ({
     id: node.id,
     key: node.type === "COMPONENT_SET" || node.type === "COMPONENT" ? node.key : undefined,
     name: node.name,
     structure: fingerprintNode(node, 6),
   }));
   ```
   Save the returned JSON array to `scripts/figmaSync/fingerprints.json` (gitignored scratch file — read the large tool result back with `read_file` and write it with `create_file`/a shell `cp`).

2. **Diff against the committed baseline (zero tokens, pure Node):**
   ```
   npm run figma:diff-components scripts/figmaSync/fingerprints.json
   ```
   Hashes each `structure` (stable/sorted-key stringify + sha256) and compares it to `scripts/figmaSync/component-state.json` (committed — this is the real sync baseline, not a regenerable export like `tokens.json`). Prints `{ added, changed, unchanged }` by component name. **Only components in `added`/`changed` are worth spending further tokens on.**

   To check only specific components (or families) by name, pass one or more names as plain space-separated arguments — each is matched case-insensitively as a substring against each fingerprint's `name` (e.g. `Button`, or `Input` to match all three Input component sets) and it defaults to reading `scripts/figmaSync/fingerprints.json`:
   ```
   npm run figma:diff-components Button Input
   ```
   This only filters which captured fingerprints are diffed — fingerprints for the targeted component(s) still need to be captured via `use_figma` first. Pass an explicit path as the first argument (with names following it) if the fingerprints live somewhere else.


3. **For each `added`/`changed` component, recommend a code update** (do not auto-apply): read that component's full node detail in Figma (variants, bound variables, text) plus the matching `src/components/{Name}/*.tsx`, `_{"{name}"}.scss`, and `AGENTS.md`, then write findings to `scripts/figmaSync/recommendations/{Name}.md` (gitignored) describing the concrete prop/SCSS changes needed to match Figma. Flag anything ambiguous instead of guessing.

4. **Once the recommendation has been reviewed/applied**, move the baseline forward so the component stops being re-flagged:
   ```
   npm run figma:record-component-state -- scripts/figmaSync/fingerprints.json
   ```

Current baseline: `Button` (page "Button", section node `15:2` now named "Button"), `Input` (page "Input", section node `30:3` now named "Input", 3 component sets), `Checkbox` (page "Checkbox", section node `70:36` now named "Checkbox", 2 component sets), `InputNumber` (page "InputNumber", section node `73:65` now named "InputNumber"), `InputPassword` (page "InputPassword", section node `81:40` named "InputPassword", component set `81:39`), and `InputPhone` (page "InputPhone", section node `83:50` named "InputPhone", component set `83:49`) are all recorded as in-sync under the comprehensive fingerprint schema.

A single `use_figma` call capturing more than ~1-2 component sets risks exceeding its 48000-byte return-value ceiling ("Canvas edits from this run were not committed"); capture fingerprints per-component-set rather than batching multiple families together.

## Avoiding stray fixed sizes when building/editing auto-layout frames

`figma.createFrame()` creates a node with an explicit `width`/`height` of `100`/`100` and `counterAxisSizingMode`/`primaryAxisSizingMode` of `FIXED` by default. If a frame is given `layoutMode` (auto-layout) but its sizing mode on one axis is never explicitly switched to `"AUTO"` (hug) or `"FIXED"`+matched to a real value, it silently keeps that leftover `100`-sized fixed axis — content inside still renders, but the frame itself is inflated to 100px on that axis (this caused the InputPhone `Country Selector` frame to be 100px tall against ~17px of actual content).

To prevent this:
- Whenever creating a frame via `figma.createFrame()` that will use auto-layout, set `layoutMode` AND both `primaryAxisSizingMode`/`counterAxisSizingMode` in the same edit — never leave one axis unset and assume it will be overridden later.
- Default new auto-layout frames to `"AUTO"` (hug) on both axes unless the design explicitly calls for a fixed dimension (e.g. a divider line, an icon's fixed box). When a fixed dimension genuinely belongs, set it to the real measured value — never leave Figma's `100` default in place.
- After building or editing any component, as a sanity check look for any frame whose width or height is exactly `100` and whose sizing mode on that axis is `FIXED` — that combination is almost always the unset-default bug, not an intentional 100px dimension.

