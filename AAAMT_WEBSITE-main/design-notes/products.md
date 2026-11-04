# AAAMT Products page — implementation spec

Source file: `7676v1divNmboEszbC3A2B`

Retrieved with `get_design_context` (`skillNames`: `figma-design-to-code`, `clientLanguages`: `html,css,javascript`, `clientFrameworks`: `unknown`).

Canvas implied by retrieved frames: **1440px** wide. Side inset on content blocks is **80px**. Content column width is **1280px** unless a section says otherwise.

Numeric weights below match the Tailwind classes in the tool output: ExtraBold 800, Bold 700, SemiBold 600, Medium 500, Regular 400. Where the tool sets `leading-[normal]` or omits letter-spacing, this spec says **line-height: normal** and **letter-spacing: normal** (not a computed pixel value).

## Retrieval status

| Node | Name | Status |
| --- | --- | --- |
| `8621:2870` | Hero Section | Retrieved. Inner component renders node `8580:3562`. |
| `8500:2644` | Trust Bar Section | Retrieved. |
| `8500:2712` | Who We Are Section | Retrieved. Media asset URL missing. |
| `8500:2729` | Principles Section | Retrieved. Background curve asset URL missing. Screenshot did not render the cards. |
| `8500:2785` | Innovation Section | **Not retrieved.** Figma MCP returned the View-seat rate limit and no design data. |
| `8505:3577` | Why AAAMT Section | **Not retrieved.** Same rate-limit error. No copy. |
| `8500:2854` | Why AAAMT Section | **Not retrieved.** Same rate-limit error. No copy. |
| `8500:2905` | Frame 2147224765 (likely CTA) | **Not retrieved.** Same rate-limit error. No copy. |
| `8500:2920` | Frame 2147224753 (likely footer) | **Not retrieved.** Cannot confirm “same as home footer.” No copy. |

Do not invent copy for the five blocked nodes. Re-call `get_design_context` on those node IDs when the Figma MCP quota allows.

---

## 1. Hero Section — `8621:2870`

### Screenshot

Wide hero, about 1440×720. Left side is a solid blue field that fades toward the right. Right side is a photograph of a woman in a navy blazer and white shirt, hair in a bun, standing in a glass-walled office with monitors and floating UI panels behind her. She faces left, toward the copy.

Copy sits on the blue field, left-aligned, vertically centered:

- Pill badge with a small star: `ENTERPRISE SOFTWARE • AI • DIGITAL TRANSFORMATION`
- Three-line headline. White: “Engineering Intelligent Software for the”. Bright green: “Modern Enterprise”.
- White body paragraph.
- Two buttons: filled orange **Explore Products**, outlined orange **Join Our Team**.

### Layout

- Frame: **1440 × 720**, `overflow: clip`. The exported instance uses `size-full`; the component default is `h-[720px] w-[1440px]`.
- Photo layer, node `8739:2836`, name `clean_Technology_professional_interact…_202608111103 1`: **1280 × 720**, `top: 0`, `right: -39px`. **No image URL in the response.** Download this node.
- Blue wash, node `8568:3524`: **956 × 720**, `left: 0`, `top: 0`.
  - Gradient: `linear-gradient(90.079deg, rgb(25, 122, 233) 27.906%, rgb(25, 122, 233) 72.092%, rgba(25, 122, 233, 0) 99.948%)`
  - Solid stop: **#197AE9**. Transparent stop: `rgba(25, 122, 233, 0)`.
- Copy column “Hero Left”, node `8568:3525`: flex column, **gap 52px**, `align-items: flex-start`, **width 612px**, `left: 80px`, vertically centered (`top: calc(50% + 0.5px)`, translate Y -50%).
- Text stack inside that column: flex column, **gap 16px**, width 100%.
- CTA row “Hero CTAs”, node `8568:3533`: flex row, **gap 16px**, `align-items: flex-start`.

No box-shadow on this section.

### Badge — node `8568:3528`

- Border: **1px solid `rgba(255, 250, 242, 0.32)`**
- Padding: **16px horizontal, 8px vertical**
- Radius: **200px**
- Inner gap: **8px**, items centered
- Icon “Rotate”, node `8568:3529`: **12 × 12**
- Label, node `8568:3530`:
  - Copy: `ENTERPRISE SOFTWARE • AI • DIGITAL TRANSFORMATION`
  - Font: **Manrope ExtraBold (800)**
  - Size: **13px**
  - Line-height: **normal**
  - Letter-spacing: **1px**
  - Transform: **uppercase**
  - Color: **#FFFAF2**
  - White-space: nowrap

Figma component notes on the icon: node `7697:5249` “State=state 1” is “Rotate Clock” made with the Animate It plugin. Node `7697:5251` “Rotate” is “Rotate” made with the Animate It plugin.

### Headline — node `8568:3531`

Wrapper: width **546px**, letter-spacing **-1.5px**, line-height 0, font-size 0 (spans carry the real size). Wrapper font named Outfit ExtraBold and color `#0F172A` are overridden by the spans.

- `Engineering Intelligent Software for the`
  - Font: **Manrope Bold (700)**
  - Size: **52px**
  - Line-height: **1.15**
  - Color: **#FFFFFF**
  - Letter-spacing: inherits wrapper **-1.5px**
- A single space in **DM Sans Bold (700)**, 52px, line-height 1.15, `font-variation-settings: "opsz" 14`.
- `Modern Enterprise`
  - Font: **Manrope ExtraBold (800)**
  - Size: **52px**
  - Line-height: **1.15**
  - Color: **#00FF2E**
  - Letter-spacing: inherits wrapper **-1.5px**

The screenshot wraps this as three lines. The source is one run of text, not three hard-coded lines.

### Body — node `8568:3532`

Copy:

> AAAMT Verticals develops enterprise SaaS and AI-powered platforms that help organizations simplify operations, automate workflows, and accelerate digital transformation.

- Font: **Manrope Medium (500)**
- Size: **18px**
- Line-height: **1.6**
- Letter-spacing: **normal**
- Color: **#FFFFFF** (`var(--base/white, white)`)
- Width: 100% of the 612px column

### Buttons

Both: height **48px**, padding **28px horizontal, 16px vertical**, radius **12px**. Label font **Manrope Bold (700)**, **16px**, line-height **normal**, letter-spacing **normal**, nowrap.

| Button | Node | Label | Fill | Border | Label color |
| --- | --- | --- | --- | --- | --- |
| Primary | `8568:3534` / label `8568:3535` | Explore Products | **#FF9900** (`#f90`) | none | **#FFFFFF** |
| Secondary | `8568:3536` / label `8568:3537` | Join Our Team | transparent | **1.6px solid #FFB039** | **#FFB039** |

### Assets

| URL | Use | Node |
| --- | --- | --- |
| `https://www.figma.com/api/mcp/asset/48228fd7-b2ef-4da7-8328-51353126d6cc.svg` | Badge star/rotate icon, 12×12 | `8568:3529` |

**Missing image URL:** hero photograph, node **`8739:2836`**, name `clean_Technology_professional_interact…_202608111103 1`, 1280×720. The tool returned an empty positioned div, not an `<img>`.

---

## 2. Trust Bar Section — `8500:2644`

### Screenshot

White section on a faint gray grid. Centered orange pill **PROVEN IMPACT**. Centered navy heading **Built to Scale. Proven to Deliver.** Four left-aligned metric stacks spread across the row:

- **9+** / Years of Innovation
- **6** / Enterprise SaaS Platforms
- **100%** / In-House Development
- **Cloud** / Cloud-Native Reliabilty

The label spelling **Reliabilty** is in the file (missing the second i). Six blue outlined pills in one row: Enterprise SaaS Company, AI-First Technology, Cloud-Native Architecture, Product-Led Innovation, Industry-Focused Solutions, Customer-Centric Design.

### Layout

- Background: **#FFFFFF**
- Border: **1px solid #E2E8F0**
- Root uses `size-full`. Explicit height is not in the classes. The grid graphic is **560.001px** tall, so the painted backdrop is about **560px**.
- Grid graphic, node `8500:2645`: **1453 × 560.001**, `left: -1px`, `top: -1px`.
- Vertical grid: node `8500:2654` is a **1440 × 460** strip, rotated **-90deg**, `left: -1px`, `top: -1px`. Inside it, horizontal rules (component `Line4`, node `8116:2643`) repeat every **80px** from `top: 0` through `top: 1440`. After rotation those read as vertical lines.
- Ellipse, node `8500:2674`: **1310 × 1310**, `left: -361px`, `top: -458px`. Only the left half of the SVG is shown (`right: 50%`).
- Ellipse, node `8500:2675`: **1321.503 × 1321.503**, `left: 478.25px`, `top: -448.75px`, rotated **179.49deg**, inner size 1310. Left half of the SVG.
- Content, node `8500:2676`: flex column, **gap 60px**, items centered, **width 1280px**, horizontally and vertically centered (`left: 50%`, `top: calc(50% - 0.5px)`, translate -50%/-50%).
- Title group, node `8500:2677`: flex column, **gap 32px**, items centered, width 100%.
- Badge + heading, node `8500:2678`: flex column, **gap 16px**, items centered.
- Metrics row, node `8500:2682`: flex, `justify-content: space-between`, width 100%. Four columns. No explicit gap; space-between distributes them.
- Each metric: flex column, **gap 2px**, items start. Nowrap.
- Pill row, node `8500:2699`: flex, **gap 11px**, items centered.

No box-shadow.

### Badge — node `8500:2679` / label `8500:2680`

- Background: **`rgba(255, 153, 0, 0.08)`**
- Border: **1px solid `rgba(255, 153, 0, 0.5)`**
- Padding: **16px horizontal, 8px vertical**
- Radius: **50px**
- Copy: `Proven Impact` (uppercase via CSS)
- Font: **Manrope Bold (700)**
- Size: **14px**
- Line-height: **normal**
- Letter-spacing: **1.5px**
- Transform: **uppercase**
- Color: **#FF9900**
- Align: center

### Heading — node `8500:2681`

Copy: `Built to Scale. Proven to Deliver.`

- Font: **Manrope Bold (700)**
- Size: **40px**
- Line-height: **1.3**
- Letter-spacing: **-1px**
- Color: **#0F172A**
- Nowrap

### Metrics

Number style (all four): **Manrope Bold (700)**, **72px**, line-height **normal**, letter-spacing **normal**, color **#000000**.

Label style (all four): **Manrope Medium (500)**, **16px**, line-height **normal**, letter-spacing **normal**, color **#64748B**.

| Node | Number node | Label node | Number | Label |
| --- | --- | --- | --- | --- |
| `8500:2683` | `8500:2685` | `8500:2686` | 9+ | Years of Innovation |
| `8500:2687` | `8500:2689` | `8500:2690` | 6 | Enterprise SaaS Platforms |
| `8500:2691` | `8500:2693` | `8500:2694` | 100% | In-House Development |
| `8500:2695` | `8500:2697` | `8500:2698` | Cloud | Cloud-Native Reliabilty |

### Pills

Shared chrome, nodes `8500:2700`, `8500:2702`, `8500:2704`, `8500:2706`, `8500:2708`, `8500:2710`:

- Background: **`rgba(25, 122, 233, 0.12)`**
- Border: **1px solid #197AE9**
- Padding: **20px horizontal, 8px vertical**
- Radius: **50px**
- Label: **Manrope Medium (500)**, **13px**, line-height **normal**, letter-spacing **normal**, color **#197AE9**, nowrap

| Node | Copy |
| --- | --- |
| `8500:2701` | Enterprise SaaS Company |
| `8500:2703` | AI-First Technology |
| `8500:2705` | Cloud-Native Architecture |
| `8500:2707` | Product-Led Innovation |
| `8500:2709` | Industry-Focused Solutions |
| `8500:2711` | Customer-Centric Design |

### Assets

| URL | Use | Node |
| --- | --- | --- |
| `https://www.figma.com/api/mcp/asset/611fb966-2131-4558-a7d5-cb8f8b171aa8.svg` | Grid / frame backdrop, 1453×560 | `8500:2645` |
| `https://www.figma.com/api/mcp/asset/31869aab-5172-4237-a894-0ab5394f662a.svg` | Repeated hairline (`Line4`), used every 80px inside the rotated strip | `8116:2643` |
| `https://www.figma.com/api/mcp/asset/8a923423-9738-41ed-8448-a7db7af29bef.svg` | Large ellipse, left half | `8500:2674` |
| `https://www.figma.com/api/mcp/asset/bf965e6f-c68e-4431-9362-096c05b0d9ee.svg` | Large ellipse, rotated ~179.49°, left half | `8500:2675` |

---

## 3. Who We Are Section — `8500:2712`

### Screenshot

The returned screenshot does **not** show the heading or body. It is almost entirely the cream background **#FFF8F2**. A short strip along the bottom-right edge shows a cool, desaturated photo of an office ceiling: linear light fixtures and a dark beam. Treat the copy below as coming from the code, not from that crop.

### Layout

- Background: **#FFF8F2**
- No border, radius, or shadow in the output.
- Root uses `size-full`. **No explicit section height.** Content is absolutely positioned, so bottom padding is not defined in the response.
- Intro row, node `8500:2713`: flex, **gap 46px**, `align-items: flex-end`, `justify-content: flex-end`, `left: 80px`, `right: 80px`, `top: 140px`.
- Editorial block, node `8500:2714`: flex column, **gap 32px**, **width 609px**.
- Inner stack, node `8500:2715`: flex column, **gap 20px**, width 100%.
- Title + body, node `8500:2718`: flex column, **gap 16px**, width 100%.
- Media, node `8500:2728`: **625 × 423**, radius **4px**, aligned to the end of the row (bottom-aligned with the text because of `items-end`).

### Badge — node `8500:2716` / label `8500:2717`

Same chrome as the Trust Bar badge.

- Background: **`rgba(255, 153, 0, 0.08)`**
- Border: **1px solid `rgba(255, 153, 0, 0.5)`**
- Padding: **16px / 8px**
- Radius: **50px**
- Copy: `Our Core Mission`
- Font: **Manrope Bold (700)**, **14px**, line-height **normal**, letter-spacing **1.5px**, uppercase, color **#FF9900**, center

### Heading — node `8500:2719`

Copy: `Building Technology That Solves Real Business Challenges`

- Font: **Manrope Bold (700)**
- Size: **40px**
- Line-height: **1.3**
- Letter-spacing: **-1px**
- Color: **#0F172A**
- Width: 100% of 609px

### Body — node `8500:2720`

Copy (spelling **organisations** is in the file):

> AAAMT Verticals is a technology company dedicated to designing intelligent software that transforms how organisations operate. Every solution is researched, designed, developed, implemented, and continuously enhanced by our in-house teams, ensuring innovation, quality, and long-term value.

- Font: **Manrope Medium (500)**
- Size: **18px**
- Line-height: **1.7**
- Letter-spacing: **normal**
- Color: **#64748B**
- Width: 100%

### Assets

**Missing image URL:** node **`8500:2728`**, name `gemini_generated_video_795efa4f 1`, **625 × 423**, radius **4px**. The inner `overflow: hidden` div is empty. No `https://www.figma.com/api/mcp/asset/...` URL was returned. The layer name says video. Download this node.

---

## 4. Principles Section — `8500:2729`

This is the product-ecosystem block (badge says “Our Products”), not a principles list. The Figma layer name is still “Principles Section”.

### Screenshot

The returned screenshot is nearly solid black (**#06080D**). Product cards, logos, and type did **not** render in the image. Copy and metrics below are from the code response only.

### Layout

- Background: **#06080D**
- Border: **0** solid `#E2E8F0` (no visible border)
- Root uses `size-full`. **No explicit section height.** Content is vertically centered.
- Decorative curve, node `8500:2730`, name `0_Line_Curve_3840x2160 1`: empty div. Placed `left: -85px`, `right: -677.73px`, `top: -521px`, aspect ratio about `2202.73 / 2059.37`, then flipped on X and rotated **141.85deg**. **No asset URL.**
- Content, node `8500:2731`: flex column, **gap 56px**, items start, **width 1280px**, `left: 80px`, vertically centered (`top: calc(50% + 0.34px)`, translate Y -50%).
- Title block, node `8500:2732`: flex column, **gap 16px**, items center, width 100%.
- Cards row, node `8500:2738`: flex, **gap 48px**, items start, width 100%. Two equal columns (`flex: 1 0 0`).

### Title

Badge, node `8500:2733` / label `8500:2734`:

- Background: **`rgba(255, 153, 0, 0.12)`**
- Border: **1px solid `rgba(255, 153, 0, 0.5)`**
- Padding: **20px horizontal, 8px vertical**
- Radius: **50px**
- Copy: `Our Products`
- Font: **Manrope Bold (700)**, **14px**, line-height **normal**, letter-spacing **1.5px**, uppercase, color **#FF9900**, center

Heading, node `8500:2735`:

- Copy: `Our Product Ecosystem`
- Font: **Manrope Bold (700)**
- Size: **36px**
- Line-height: **normal**
- Letter-spacing: **-1px**
- Color: **#FFFFFF**
- Align: center

Subhead, node `8500:2736`:

- Copy: `Empowering educational systems and modern business legal workflows via high-availability software.`
- Font: **Manrope Regular (400)**
- Size: **16px**
- Line-height: **normal**
- Letter-spacing: **normal**
- Color: **#EEEEEE**
- Align: center

### Shared card chrome

Both cards:

- Background: **#0B111D**
- Border: **1px solid #282828**
- Padding: **40px**
- Radius: **12px**
- Shadow: **`drop-shadow(0px 2px 6px rgba(255, 153, 0, 0.12))`**
- Stretch to the row height

### Card A — InstituteRun ERP — node `8500:2739`

Inner stack, node `8500:2740`: flex column, **gap 32px**, width 100%.

Header, node `8500:2741`: flex, space-between, items center.

Logo lockup, node `8500:2742`: flex, **gap 12px**, items center.

- Logo, node `8500:2743`: **34.942 × 48**
- Name, node `8500:2751`: `InstituteRun ERP`
  - Font: **Manrope SemiBold (600)**
  - Size: **28px**
  - Line-height: **normal**
  - Letter-spacing: **normal**
  - Color: **#FFFFFF**

Category pill, node `8500:2752` / label `8500:2753`:

- Background: **`rgba(255, 153, 0, 0.12)`**
- Border: **1px solid `rgba(255, 153, 0, 0.5)`**
- Padding: **16px horizontal, 6px vertical**
- Radius: **50px**
- Copy: `School, College & Institutions`
- Font: **Manrope Bold (700)**, **14px**, line-height **normal**, letter-spacing **normal**, color **#FF9900**

Titles, node `8500:2754`: flex column, **gap 16px**, line-height **1.5** on the group.

- Title, node `8500:2755`: `Comprehensive Automation & Communication Tool for Colleges`
  - Font: **Manrope SemiBold (600)**, **20px**, color **#FFFFFF**
- Body, node `8500:2756`: `Streamline student admissions, fee collections, biometric attendance, and multi-campus reporting with high availability.`
  - Font: **Manrope Medium (500)**, **16px**, color **#64748B**

Divider, node `8500:2757`: full width, 1px SVG rule.

Link row, node `8500:2759`: flex, **gap 12px**, items start.

- Label, node `8500:2760`: `Explore Instituterun` (capitalisation is in the file: Instituterun, not InstituteRun)
  - Font: **Manrope Bold (700)**, **20px**, line-height **normal**, color **#FF9900**
- Arrow, node `8500:2761`: **24 × 24**

### Card B — Doqzy CLM — node `8500:2764`

Inner column, node `8500:2765`: flex column, `justify-content: space-between`, stretches.

Header, node `8500:2766`: flex, space-between.

Logo lockup, node `8500:2767`: flex, **gap 12px**.

Mark, node `8500:2768` (inline grid):

- Square, node `8500:2769`: **48 × 48**, background **#6D7BFA**, radius **12.308px** on bottom-left, bottom-right, and top-left. Top-right is not given that radius (the corner piece covers it).
- Corner piece, node `8500:2770`: **12.308 × 12.308**, offset `margin-left: 35.69px`, `margin-top: 0`.
- Letter, node `8500:2771`: `D`
  - Font: **Outfit ExtraBold (800)**
  - Size: **32px**
  - Line-height: **normal**
  - Color: **#FFFFFF**
  - Align: center
  - Offset: `margin-left: 11.95px`, `margin-top: 3.69px`

Name, node `8500:2772`: `Doqzy CLM`

- Font: **Manrope ExtraBold (800)**
- Size: **32px**
- Line-height: **normal**
- Letter-spacing: **normal**
- Color: **#FFFFFF**

Category pill, node `8500:2773` / label `8500:2774`:

- Background: **`rgba(109, 123, 250, 0.12)`**
- Border: **1px solid `rgba(109, 123, 250, 0.5)`**
- Padding: **16px horizontal, 6px vertical**
- Radius: **50px**
- Copy: `Enterprise Legal Tech`
- Font: **Manrope Bold (700)**, **14px**, line-height **normal**, color **#6D7BFA**

Titles, node `8500:2775`: flex column, **gap 16px**, line-height **1.5**.

- Title, node `8500:2776`: `Contract Lifecycle Management, Automated End-to-End`
  - Font: **Manrope SemiBold (600)**, **20px**, color **#FFFFFF**
- Body, node `8500:2777`: `Transform corporate contract assembly with AI parsing, automated multi-level signature approvals, and continuous compliance audit locks`
  - No period at the end in the source.
  - Font: **Manrope Medium (500)**, **16px**, color **#64748B**

Footer stack, node `8500:2778`: flex column, **gap 32px**.

- Divider wrapper, node `8500:2779`: height **1.638px**, inner rule rotated **-0.18deg**.
- Link, node `8500:2780`: flex, **gap 12px**
  - Label, node `8500:2781`: `Explore Doqzy`
  - Font: **Manrope Bold (700)**, **20px**, line-height **normal**, color **#6D7BFA**
  - Arrow, node `8500:2782`: **24 × 24**

### Assets

| URL | Use | Node |
| --- | --- | --- |
| `https://www.figma.com/api/mcp/asset/8015728f-ff77-488f-806f-06f86e050e18.svg` | InstituteRun logo, 34.942×48 | `8500:2743` |
| `https://www.figma.com/api/mcp/asset/0417f1d0-c37b-4340-a37c-2017cebcfd40.svg` | InstituteRun divider | `8500:2757` |
| `https://www.figma.com/api/mcp/asset/284ad2d8-7456-472f-8481-b2ea40e48c2b.svg` | InstituteRun arrow, 24×24 | `8500:2761` |
| `https://www.figma.com/api/mcp/asset/8ba72f2b-8589-4bb6-a280-a6fdfc0c422c.svg` | Doqzy mark corner, 12.308×12.308 | `8500:2770` |
| `https://www.figma.com/api/mcp/asset/06c596cd-aef3-45c1-abea-4c596b26a7db.svg` | Doqzy divider | `8500:2779` |
| `https://www.figma.com/api/mcp/asset/7c77a2d1-8740-469a-a4a9-716bfd7b5a04.svg` | Doqzy arrow, 24×24 | `8500:2782` |

**Missing image URL:** background curve, node **`8500:2730`**, name `0_Line_Curve_3840x2160 1`. Empty div, no asset URL. Download this node.

The Doqzy “D” is live text (Outfit ExtraBold), not an image. The purple square is a fill, not an image.

---

## 5–9. Not retrieved

Figma MCP (`get_design_context`) returned:

> You've reached the Figma MCP tool call limit for your View seat on the Professional plan.

No code, screenshot, copy, colors, or asset URLs came back for:

- **`8500:2785`** Innovation Section
- **`8505:3577`** Why AAAMT Section
- **`8500:2854`** Why AAAMT Section
- **`8500:2905`** Frame 2147224765 (likely CTA)
- **`8500:2920`** Frame 2147224753 (likely footer)

**Footer:** not compared to the home footer. The node was never returned, and there is no local home-footer spec in this workspace to match against. Do not mark it “same as home footer” until `8500:2920` is fetched.

---

## Missing downloads (summary)

| Node | Section | What is missing |
| --- | --- | --- |
| `8739:2836` | Hero | Office photograph, 1280×720. No MCP asset URL. |
| `8500:2728` | Who We Are | Media named `gemini_generated_video_795efa4f 1`, 625×423, radius 4px. No MCP asset URL. |
| `8500:2730` | Principles | Curve named `0_Line_Curve_3840x2160 1`. No MCP asset URL. |
