# CLAUDE.md — Web Design + Marketing

## Skills Active This Session

Read and apply each skill file below before starting any work. No exceptions.

| Skill | File |
|-------|------|
| Frontend Design | `Frontend design skill.md` |
| Stop Slop | `stop-slop-main/SKILL.md` |
| UI/UX Pro Max | `ui-ux-pro-max-skill-main/src/ui-ux-pro-max/` |
| Context Engineering | `Agent-Skills-for-Context-Engineering-main/SKILL.md` |
| Copywriting | `marketingskills-main/skills/copywriting/SKILL.md` |
| CRO | `marketingskills-main/skills/cro/SKILL.md` |
| SEO Audit | `marketingskills-main/skills/seo-audit/SKILL.md` |
| Competitor Profiling | `marketingskills-main/skills/competitor-profiling/SKILL.md` |
| Customer Research | `marketingskills-main/skills/customer-research/SKILL.md` |
| Site Architecture | `marketingskills-main/skills/site-architecture/SKILL.md` |

---

## When to Apply Each Skill

- **Frontend Design** — read before writing any frontend code, every session.
- **Stop Slop** — apply to all copy: headlines, body text, CTAs, microcopy, email sequences.
- **UI/UX Pro Max** — run the design system search before building any new page or component.
- **Context Engineering** — apply throughout long sessions to manage context window efficiently.
- **Competitor Profiling** — run before any design or copy work begins. Understand what the client is up against.
- **Customer Research** — identify the actual buyer, their language, and what they care about. Feeds copy and CRO.
- **Site Architecture** — plan the full page structure before writing a single line of code.
- **Copywriting** — apply when writing or rewriting any client-facing text on the site.
- **CRO** — apply to page structure and layout decisions to maximize conversions.
- **SEO Audit** — run after the build is complete to ensure search optimization.

---

## Local Server

- Always serve on localhost — never screenshot a `file:///` URL.
- Start dev server: `python3 -m http.server 3000` (serves project root at `http://localhost:3000`)
- If server is already running, do not start a second instance.

---

## Screenshot Workflow

- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
- Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

---

## Output Defaults

- Single `index.html` file, all styles inline, unless user says otherwise.
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive.

---

## Brand Assets

- Always check the `brand_assets/` folder before designing.
- If a logo is present, use it. If a color palette is defined, use those exact values.
- Do not use placeholders where real assets are available.

---

## Reference Image Rules

- If a reference image is provided: match layout, spacing, typography, and color exactly. Do not improve or add to the design.
- If no reference image: design from scratch following the Frontend Design skill.
- Do not add sections or content not in the reference.
- Do not "improve" a reference — match it exactly.

---

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

---

## Hard Rules

- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
