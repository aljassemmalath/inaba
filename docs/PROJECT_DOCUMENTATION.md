# Inaba Portal — Project Documentation

> **Status:** living documentation reflecting the **actual current code** (workspace: `C:\My projects\inaba`, Angular app `inaba-portal`).  
> **Last updated:** 2026-11-07 (documentation-only snapshot).  
> **Rule:** this document describes what exists now; it does not define new backend/business behavior. Mock/typed data is used where APIs are not integrated.

## 1. Project architecture and folder structure

### 1.1 High-level architecture
- **Single Angular application** (`src/`) with **lazy-loaded feature areas** mounted under a shared shell.
- **Shell:** `MainLayoutComponent` (`src/app/layout/main-layout/`) composes RTL **right-side sidebar** + **header** + routed content (`<router-outlet>`).
- **Routing:** top-level lazy routes in `src/app/app.routes.ts`; each domain has its own `*.routes.ts`.
- **Feature-based organization:** UI/data/models live under `src/app/features/<domain>/...` (pages, components, data/mocks, models as needed).
- **Shared/reusable UI:** `src/app/shared/components/*` (standalone components/patterns) consumed by features.
- **Core:** cross-cutting models/config such as navigation (`src/app/core/models/navigation.model.ts`).
- **Global styling:** SCSS design system in `src/styles/` (abstracts/base/components/layout), imported via `src/styles.scss`. Component-level SCSS is used where appropriate.

### 1.2 Folder structure (actual)
```text
C:\My projects\inaba\
  angular.json                  # build config: Bootstrap RTL, CDK overlay prebuilt, style includePaths
  package.json
  tsconfig*.json                # strict TS settings
  README.md
  docs/
    PROJECT_DOCUMENTATION.md    # this file
  public/                       # static assets (Angular assets glob)
  reference/                    # original static HTML/CSS mockups (not overwritten)
  src/
    main.ts, index.html         # lang="ar" dir="rtl" (per project conventions)
    styles.scss                 # global SCSS entry
    styles/
      abstracts/  _variables.scss _mixins.scss _functions.scss
      base/       _reset.scss _typography.scss _global.scss
      components/ _buttons.scss _forms.scss _tables.scss _tabs.scss _badges.scss
                    _cards.scss _modals.scss _icons.scss _modal-system.scss
      layout/     _sidebar.scss _header.scss _page-layout.scss
    app/
      app.routes.ts
      core/models/navigation.model.ts
      layout/ (header, sidebar, main-layout)
      shared/components/
        alert-card, circle-icon, content-card, data-table, empty-state, filter-toolbar,
        financial-summary-card, icon-placeholder, loading-state, modal (+ dialogs/),
        page-banner, page-placeholder, pagination, percentage-badge, progress-stepper,
        report-card, search-bar, stat-card, status-badge, summary-container, summary-item, timeline
      features/
        dashboard/           # home page + chart components + data
        operations/          # home(action context)/action/requests(list+details)/issues + legacy :tab
        people-organizations/# executors, agencies, supervisors, clients
        services/            # products, beneficiaries (placeholder)
        finance-reports/     # dues, reports, reports/:key
        system/              # audit-log, admin-accounts
```

### 1.3 Navigation / information architecture (actual)
Defined in `src/app/core/models/navigation.model.ts` (`APP_NAVIGATION`). **Section headings are non-clickable visual groupings; children are always visible/clickable links.** Arabic labels/routes:
- **العمليات**: `الصفحة الرئيسية` → `/operations/home`, `يحتاج إجراء` → `/operations/action`, `الطلبات` → `/operations/requests`, `المشاكل` → `/operations/issues`
- **الأشخاص والجهات**: `المنفذون` `/people-organizations/executors`, `الوكالات` `/people-organizations/agencies`, `المشرفون` `/people-organizations/supervisors`, `العملاء` `/people-organizations/clients`
- **الخدمات**: `المنتجات` `/services/products`, `المستفيدون` `/services/beneficiaries`
- **المالية والتقارير**: `المستحقات` `/finance-reports/dues`, `التقارير` `/finance-reports/reports`
- **النظام**: `سجل التدقيق` `/system/audit-log`, `الحسابات الإدارية` `/system/admin-accounts`

`NavChild` supports `iconKey?` / `exact?` (reserved/available); sidebar renders icon placeholders.

## 2. Technology stack and conventions

### 2.1 Stack (from `package.json` / config)
- **Angular:** `^22.2.x` (`@angular/core`, router, forms, platform-browser, compiler/cli/build). Standalone component style, **lazy-loaded routes**.
- **TypeScript:** `~6.0.2`, **strict** compiler options (`tsconfig.json`: `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `strictInjectionParameters`, `strictInputAccessModifiers`).
- **UI/CSS:** **Bootstrap 5 RTL** (`bootstrap/dist/css/bootstrap.rtl.min.css`) + **SCSS**; global tokens/utilities/components in `src/styles/`. **No Tailwind**. **No mixing** paradigms beyond Bootstrap RTL + project SCSS tokens/components.
- **Angular CDK:** `@angular/cdk ^22.2.6`; `@angular/cdk/overlay-prebuilt.css` included in `angular.json` styles (used by CDK Dialog).
- **Forms:** `@angular/forms` / **Reactive Forms** available by convention; some UI uses template-driven `FormsModule`/`ngModel` where present (e.g., search bindings).
- **State/primitives:** Angular **Signals** used in page components (e.g., `signal`, `computed`, `effect`).
- **Charts:** dependency-free **responsive SVG** implementations (dashboard chart components).
- **Testing/tooling:** Vitest (`ng test`/unit-test builder), Prettier dev dep. No e2e framework configured by default.

### 2.2 Coding & UI conventions
- **Arabic-first, RTL:** `lang="ar" dir="rtl"`; layout/spacing use logical properties where implemented (e.g., modal uses `inset-inline-start`/RTL-aware flex). Preserve Arabic labels/meaning.
- **Feature isolation:** keep feature-specific content/data/models inside the feature; share via `shared/components` and `core` only when truly reusable.
- **Mock data:** typed and separated from templates (e.g., `data/` + `models/` under features). **No invented backend/business rules.**
- **Icons/assets (strict):** **no icon libraries, no external icons, no emoji/Unicode icons**. Use reusable empty image placeholders (`app-icon-placeholder` / `.icon-placeholder`) that reserve dimensions (no broken-image display). Actual sources to be provided later.
  - Asset folders reserved: `src/assets/images/imgs/`, `src/assets/images/svg/`.
  - Pattern hooks: `--page-banner-pattern`, `--modal-pattern` (default `none`, configurable). **Do not reference missing images.**
  - **Note:** `bootstrap-icons` remains listed in `package.json` but is **not loaded in `angular.json` styles and must not be used**.
- **Cards:** every card uses `content-card-body` as the **mandatory base** class (see §3.4).
- **Accessibility/behavior:** CDK Dialog used for modal focus/keyboard/backdrop behavior; dialogs expose roles/labels; `Escape` handling configurable in modal shell. Prefer meaningful labels for controls.

## 3. Design tokens, typography, colors, spacing, and card styles

Source of truth: `src/styles/abstracts/_variables.scss` (`:root` CSS custom properties + SCSS aliases). Key groups:

### 3.1 Colors (semantic)
- **Brand:** `--brand-primary #00A092`, `--brand-dark-teal #007468`, `--brand-primary-hover #008A7E`, `--brand-primary-pressed #007468`, `--brand-gold #CEB26B`, `--teal-50 #E6F6F4`; aliases `--color-primary*`, `--color-accent-gold`.
- **Neutrals/surfaces:** `--color-white #FFFFFF`, backgrounds `--color-background(-default) #FCFCFC`, muted `--color-background-muted #F5F5F5`, borders `--color-border(-default) #E3E2E2`, `--color-border-soft #EEF1F1`.
- **Text:** primary `#292828`, secondary `#484747`, tertiary `#6F6E6E`, inverse `#FFFFFF`.
- **Sidebar:** **solid** `--side-menu-bg: #007468` (no gradient; important correction). Text `--side-menu-text` / secondary `--side-menu-text-secondary`, active `--side-menu-item-active-bg` (white overlay).
- **Status tokens:** success/warning/error/info bg/border/text vars (e.g., `--status-success-bg #ECFDF3` / text `#027A48`, warning `#FFFAEB/#B54708`, error `#FEF3F2/#B42318`, info `#EFF8FF/#175CD3`).

### 3.2 Typography
- **Font:** `--font-family-base: 'IBM Plex Sans Arabic', sans-serif` (loaded; used globally).
- **Page title (h1/.page-title):** 22px / 30px lh / 700, `--color-text-primary`.
- **Section (h2, card header):** 18px / 26px / 600.
- **Subheading (h3):** 16px / 24px / 600.
- **Body:** lg 16/24, md 14/20 (body default), sm 12/18.
- **Label/button:** 14px/500, caption 12px/18. Secondary/tertiary utility classes in `_typography.scss`.

### 3.3 Spacing, radii, elevation, layout
- **Spacing scale:** `--space-1 4px` … `--space-10 40px` (SCSS `$space-*` aliases).
- **Radii:** sm 6, md 8, lg 12, xl 16, pill 999px.
- **Shadows:** `--card-shadow: 0 2px 8px rgba(16,24,40,0.10)` (source for `$card-shadow`), `--shadow-xs/sm/md`.
- **Sidebar:** width `--sidebar-width 280px`; content offset `--content-offset 304px` (RTL-aware in layout styles).
- **Patterns:** `--page-banner-pattern: none`, `--modal-pattern: none`.
- **Modal size tokens:** `--modal-size-lg 800px`, `--modal-size-md 600px`, `--modal-size-sm 540px`.

### 3.4 Card styles (mandatory)
Defined in `src/styles/components/_cards.scss`:
- **`.content-card-body` (mandatory base for every card container):** `background: #FFFFFF; padding: 16px 24px 24px 24px; border-radius: 8px; border: none; box-shadow: var(--card-shadow); width: 100%; box-sizing: border-box`.
- **Card header:** `.card-header-block` (title right-aligned, `.card-title` = section typography 18/26/600), optional action; `.card-divider` (1px, `--color-border-default`, respects padding).
- **Modifiers (variations, not replacements):** `.stats-card`, `.financial-card`, `.chart-card`, `.alert-card`, `.table-card` (padding/overflow adjustments), `.operations-panel`, etc. `app-content-card` applies the base + optional header/divider.
- **Legacy compatibility:** `.content-card` extends base with adjusted padding behavior for structured headers (migrate usages to `content-card-body`).

## 4. Shared components and their APIs

All are standalone (Angular) under `src/app/shared/components/` unless noted. Key APIs (actual inputs/outputs/slots):

| Component (`selector`) | Purpose / key API |
|---|---|
| `app-icon-placeholder` | **No icon libs.** Reserves space (image `opacity:0`, no broken icon). Inputs: `size: 'sm'|'md'|'lg'|'xl' = 'md'` (16/20/24/32px), `decorative = true`. |
| `app-circle-icon` | Circular wrapper around placeholder. Inputs: `variant: 'outlined'|'filled'='outlined'`, `size: 'sm'|'md'|'lg'='md'` (32/40/44), `iconSize`, `modifierClass`. |
| `app-content-card` | Card container (always applies `content-card-body`). Inputs: `title: string|null`, `modifierClass`, `showDivider=true`. Projects content. |
| `app-page-banner` | Page header banner. Inputs: `title` (required), `description=''`, `modifierClass`. Supports projected `[banner-actions]` (per usage pattern); pattern via `--page-banner-pattern`. |
| `app-summary-container` | Outer **`content-card-body summary-container`**; flex row, responsive wrap, subtle **vertical dividers** between items (hidden on small screens). Input: `modifierClass`. Projects `app-summary-item`s. |
| `app-summary-item` | **Borderless/transparent/no-shadow** item (inside summary container). Inputs: `label` (req), `hint=''`, `value` (req, string|number), `modifierClass`. Renders outlined `circle-icon` + value/label/hint. |
| `app-data-table` `<T>` | RTL table, empty state, `trackByKey='id'`. Inputs: `columns: DataTableColumn<T>[]` (req; `key, header, width?, cell?(row)=>string`), `rows: T[]` (req), `emptyTitle`, `emptyMessage`. **Content-projected templates:** `#statusCell` (used for `status` **or** `dutyStatus` keys) and `#actionsCell` (`actions` key). `text()` resolves `cell`/field. |
| `app-status-badge` | Status pill. Inputs: `label` (req), `tone: BadgeTone = 'neutral'` (`success|warning|error|info|neutral|primary`). |
| `app-search-bar` | Search input with placeholder icon, RTL label. Inputs/model: `value` (model, two-way), `placeholder`, `label='بحث'`, `inputId`, `width`, `minWidth`. |
| `app-filter-toolbar` | `content-card-body` toolbar row. Model: `[(search)]`. Inputs: `searchPlaceholder/Id/Width`, `showSearch/showFilter/showExport`, `exportLabel`, `margin`. Outputs: `(filterClick)`, `(exportClick)`. Projects `[toolbar-extra]` and extra content. |
| `app-pagination` | Footer pager. Inputs: `page=1`, `pageSize=5`, `total=0`. Output: `(pageChange)` (clamped). Shows range/total and prev/next. |
| `app-stat-card` | Dashboard stat. Inputs: `title`, `value`, `icon` (reserved key), `iconSize='lg'`, `modifierClass`. |
| `app-alert-card` | Alert/action card. Inputs: `count`, `title`, `description`, `actionLabel='عرض'`, `modifierClass`. Output: `(action)`. |
| `app-financial-summary-card` | Financial line item. Inputs: `label`, `value`, `icon` (reserved), `modifierClass`. |
| `app-percentage-badge` | Percent + label row. Inputs: `percent`, `label`, `modifierClass`. |
| `app-progress-stepper` | Horizontal stepper. Input: `steps: StepItem[]` (`number,name,status:'completed'|'in-progress'|'pending'|'locked',statusLabel`). |
| `app-timeline` | Vertical timeline. Input: `events: TimelineEvent[]` (`title,dateTime,description,actor,role`). |
| `app-report-card` | Report entry card linking to report view. Inputs: `title, description, category, categoryTone, link`. |
| `app-loading-state` | Spinner + message (`message` default loading text). |
| `app-empty-state` | Centered placeholder icon + `title`/`message`. |
| `app-page-placeholder` | Scaffold page (banner-like header + "page in preparation" card). Input: `title`, `description`. **Used by** `المستفيدون`. |
| **`app-modal`** + dialog presets | See **§6**. |

## 5. Implemented pages and their requirements

> Implemented pages use banners/summary containers/tables/cards/shared components per the established patterns, with typed mock data separated from templates. RTL Arabic labels are preserved.

| Area / route | Page (component) | Implemented behavior / requirements (actual) |
|---|---|---|
| `/operations/home` | Home / `الصفحة الرئيسية` (`dashboard/pages/home`) | Banner; summary indicators (`app-summary-container`/items); dashboard alerts; financial summary; **dependency-free responsive SVG charts** (monthly orders grouped bars; orders-by-product donut — values isolated in data, incl. 55/20/20 split as specified); latest orders table (`app-data-table` + status template). |
| `/operations/action` | Needs action / `يحتاج إجراء` (`operations/pages/needs-action`) | Banner; summary container (e.g., totals incl. إجمالي الطلبات/بانتظار الإسناد/بانتظار الإشعار/مشاكل وفشل/فشل حفظ أو مرفقات ملف); **8 request types** supported via typed options/data; **horizontal request cards** (`RequestCardComponent`); **search + filter** (status/type) + reset/export/filter UI state; action handling placeholder (in-page feedback). |
| `/operations/requests` | Requests list / `قائمة الطلبات` (`operations/pages/requests-list`) | Banner; summary container; search/filter UI; `app-data-table` with status/actions; **pagination** (page/pageSize, client-side over filtered mock rows); row action navigates to details `/operations/requests/:id`. |
| `/operations/requests/:id/*` | Request details / `تفاصيل الطلب` (`operations/pages/request-details`) | Shared details shell + `RequestDetailsService` (provided in component); loads by route `:id` (`effect` + param subscription). **Progress stepper**, **5 tabs** with child routes: `stages`, `timeline`, `assignments`, `notes`, `issues` (+ info in side panel per template/layout); right panel/status context. |
| `/operations/issues` | Problems / `المشاكل` (`operations/pages/problems`) | Banner (مشاكل الطلبات والتنفيذ); summary container; search/filter UI; table (problem, request, executor, stage, reported/updated, status, actions) over mock rows with client-side filtering/paging state. |
| `/people-organizations/executors` | `المنفذون` | Banner, summary container, table w/ duty `status`/actions. |
| `/people-organizations/agencies` | `الوكالات` | Implemented agencies page (feature module/page present). |
| `/people-organizations/supervisors` | `المشرفون` | Implemented supervisors page. |
| `/people-organizations/clients` | `العملاء` | Implemented clients page (**2-column layout** per project spec intent). |
| `/services/products` | `المنتجات` | Banner; responsive **product cards (3-up on xl)** with image/placeholder, key info (مستحق المنفذ، سعر البيع، المدة المتوقعة، الربح) and actions (عرض التفاصيل، تعديل المنتج). |
| `/services/beneficiaries` | `المستفيدون` | **Scaffold placeholder only** via `PagePlaceholderComponent` ("page in preparation"); not a full implementation. |
| `/finance-reports/reports` | `التقارير` | Banner; grid of `app-report-card`s from `REPORTS_CARDS`, linking to `/finance-reports/reports/:key`. |
| `/finance-reports/reports/:key` | Report view / `عرض التقرير` | **Defined placeholder route** (no invented report content): banner + empty state showing selected `:key`. |
| `/finance-reports/dues` | `المستحقات` | Banner (exact business description text as implemented in component/template context); summary container; `app-filter-toolbar` search + export label; table (executor, product/stage, base amount, net adjustments, final due, actions) with client-side search over mock data. |
| `/system/audit-log` | `سجل التدقيق` | Banner (**description kept per spec/content as provided** in implementation); search bar; table (event, actor, entity, time) with client-side search. |
| `/system/admin-accounts` | `الحسابات الإدارية` | Banner; search bar; table (name, email, role, last login, status badge). |
| `/operations/:tab` (legacy) | Fallback tabbed operations | Loads `OperationsPageComponent` for legacy `:tab` param; primary nav uses explicit `home/action/requests/issues`. |

**Not invented:** no real API integration, auth flows, or backend business rules. Some filters/pagination/actions are basic/client-side or UI placeholders.

## 6. Modal system specifications

### 6.1 Foundation (actual code)
- **Location:** `src/app/shared/components/modal/` — `modal.types.ts`, `modal.component.ts|html|scss`, `index.ts`, `dialogs/*`.
- **Behavior/a11y:** built on **Angular CDK Dialog** (overlay). Global overlay CSS: `@angular/cdk/overlay-prebuilt.css` (`angular.json`) + hooks in `src/styles/components/_modal-system.scss` (`.cdk-*`, `.app-modal-panel`). Focus/restore/auto-focus configured when opening (see presets).
- **Shell:** `app-modal` (standalone). Closes via `(closed)` and, if present, `DialogRef.close()` (optional injection). `Escape` triggers close when `closeOnEscape()` is true (`@HostListener`).

### 6.2 API (`modal.types.ts` / component inputs)
- `modalType: 'right' | 'center'` (default `'right'`)
- `modalSize: 'large' | 'medium' | 'small'` (default `'medium'`) via `MODAL_SIZE_WIDTH` → `--modal-size-lg|md|sm` (800/600/540px)
- `title`, `description`, `ariaLabel` (default label fallback: نافذة حوار)
- `showCloseButton` (default `true`), `showFooter` (default `true`, right layout), `showPattern` (default `true`)
- `closeOnBackdrop` (config flag; actual backdrop/Escape policy at open time via CDK e.g. `disableClose`), `closeOnEscape` (default `true`)
- Output: `(closed)`. Content projection slots: `[modal-subtitle]`, `[modal-body]`, `[modal-footer]` (right) / `[modal-actions]` or `[modal-footer]` (center).

### 6.3 Shared styling & layout rules
- Width = selected size token; **`max-width: calc(100vw - 32px)`**; **`max-height: calc(100vh - 32px)`**, flex column, internal scrolling (`body` scrolls; avoids whole-modal overflow). Mobile: forced responsive width + reduced padding (≤575.98px).
- Background **white** `#FFFFFF`; **subtle top treatment only** `linear-gradient(180deg, var(--teal-50,#E6F6F4) 0%, #FFFFFF 100%)` (top area, not full-modal gradient).
- **Decorative pattern reserved** (`.app-modal__pattern`, `--modal-pattern: none`, configurable later); **no temporary/downloaded/missing/broken image**.
- Radius `--radius-lg`, shadow `--shadow-md`, established typography/tokens.

### 6.4 Layout types
- **Right-aligned (`right`, content-heavy):** header padding **32px**, RTL start-aligned; **right side** icon placeholder + stacked **title/description**; **opposite (inline-start / visually left in RTL)** close placeholder button (when enabled). Body starts **directly below header, no extra top padding**: `padding 0 32px 32px 32px`, `overflow:auto`. Footer: subtle **top border**, buttons aligned to the **right side in RTL** (`justify-content: flex-start`), gap/wrap.
- **Center-aligned (`center`, confirmations):** centered column: **icon (top) → title → description → projected body → actions**; balanced spacing, `min-height` for short dialogs. **Optional** close (corner, `inset-inline-start`); when `showCloseButton=false` no reserved corner space. Actions centered, support 1–2 buttons via shared button classes.

### 6.5 Inaba dialog set (22, PDF pp.1–31 textual structure)
**Location:** `src/app/shared/components/modal/dialogs/` (exported via modal `index`).
- **Generic building blocks:** `simple-confirm.dialog` (center), `confirm-success.dialog` (center success/close), `reason-action.dialog` (right, required reason/note/confirm/size).
- **Specific dialogs:** `assign-order`, `edit-order`, `start-issue-followup`, `import-orders-preview`, `order-creation-success`, `duplicate-file-warning`.
- **Presets:** `openInabaDialogs(dialog: Dialog)` returns openers for all 22 (panel defaults: `panelClass: 'app-modal-panel'`, `autoFocus: 'first-tabbable'`, `restoreFocus: true`). Includes: assign/success, cancel assignment/success, cancel execution/success, remind/success, edit/success, add note/success, delete/success, start issue follow-up, resolve issue, issue follow-up started, freeze video deletion/success, order creation success, import orders preview, duplicate file warning. Content fields/labels/placeholders/required reasons match the provided textual spec (Arabic); forms return values on close for future wiring.

**Current state:** dialog components/presets exist and build; they are **not yet wired into feature page actions**.

## 7. Current implementation progress

**Completed (code present & `npm run build` succeeds):**
- Angular 22 app scaffold in project root, Bootstrap RTL + CDK overlay prebuilt, IBM Plex Sans Arabic, RTL entry, SCSS token/base/components/layout system; `content-card-body`/`$card-shadow`/card patterns.
- `MainLayoutComponent` + `SidebarComponent` (non-clickable section headings, always-visible children, exact labels, solid `#007468`, mobile toggle) + `HeaderComponent`; lazy feature routing.
- Shared components library (cards, banner, summary, table, status badge, icons/placeholders, toolbar/search/pagination, states/placeholders, stat/alert/financial/percentage, stepper, timeline, report-card, modal shell + 22 dialogs/presets).
- Icon policy enforced in implementation (placeholders; **bootstrap-icons not loaded**).
- Pages implemented: operations home/action/requests list + details (stepper, 5 tabs)/problems; executors, agencies, supervisors, clients; products; reports + report-view placeholder; dues; audit log; admin accounts. `services/beneficiaries` = placeholder. Charts = dependency-free SVG.

**Validation:**
- `npm run build` (production config path via CLI build) **succeeds**. **Budget warning:** initial bundle exceeds 500 kB by ~6–7 kB (total ~507 kB) due to Bootstrap RTL/prebuilt/CDK CSS; configured error budget 1 MB.

## 8. Remaining tasks, known issues, and pending decisions

### 8.1 Remaining / next implementation candidates
- **`المستفيدون` (`/services/beneficiaries`):** replace `PagePlaceholderComponent` with full page per requirements (banner/summary/table/cards as applicable).
- **Wire modal dialogs to feature actions:** connect `openInabaDialogs`/specific dialogs to real triggers in request details, requests/issues lists, import flows, etc., and handle result payloads.
- **API integration:** replace typed mock data/services with real endpoints; move loading/error/empty handling to real states.
- **Auth/permissions/business rules:** not implemented (do not invent); add when specified.
- **Filters/pagination:** evolve basic/client-side search/pagination into full server-side/filter-panel behavior where required.
- **Provide actual icon/pattern assets:** supply real images under `src/assets/images/imgs|svg` and set sources/`--page-banner-pattern`/`--modal-pattern` (keeping placeholder-safe behavior).
- **E2E framework** (optional): not configured.
- **Documentation maintenance:** keep this file and README in sync as features evolve.

### 8.2 Known issues / operational notes
- **Stale dev server/cache can show old placeholder content** even when source/routes are correct. Mitigation: stop dev server; remove `.angular/cache` (e.g., `Remove-Item -Recurse -Force .angular\cache -ErrorAction SilentlyContinue`); run `npm start` from `C:\My projects\inaba`; hard refresh browser.
- **`bootstrap-icons` package present but unused:** safe to remove later if desired; **do not load/use** it (icon policy = placeholders only).
- **Bundle budget warning (~507 kB initial):** within error limit but over 500 kB warning; consider budget tuning or CSS strategy if it becomes a constraint.
- **PowerShell console encoding artifacts:** some terminal reads displayed mojibake for Arabic literals; **actual route/model intent and implemented UI labels are Arabic RTL** (verify/edit as UTF-8 in source). Documentation should reference correct labels (e.g., `APP_NAVIGATION`).
- **Modal `closeOnBackdrop` input:** shell handles `closeOnEscape`; backdrop-close behavior is primarily controlled by CDK open config (`disableClose`) — confirm/wire consistently when dialogs are integrated.
- **Dialog #17 variant:** preset opens a standard success title/close; a richer info-fields success variant can be added if the exact PDF layout requires it.

### 8.3 Pending decisions (confirm before implementing)
- Exact **icon asset** filenames/paths and how `iconKey` maps to images (placeholders currently reserve space).
- **Pattern assets** (PNG/SVG) for `--page-banner-pattern` / `--modal-pattern`.
- Whether to **remove `bootstrap-icons`** dependency and/or adjust bundle budgets.
- Full **`المستفيدون`** requirements and data model.
- **Server-side contracts** for lists, filters, pagination, actions, and dialog submissions.
- Consistent **backdrop-click** policy per modal (`disableClose`/config) and any per-dialog overrides.
- Any required **enforcement** of "required reason" fields in `reason-action` dialogs before closing with confirmation (UI/validation behavior to confirm).

---
*End of documentation. Generated/updated as documentation-only; no application functionality or refactors were performed as part of this update.*
