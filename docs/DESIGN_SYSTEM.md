# Vocab Brain: Design System

Premium, modern EdTech with the calm of a productivity app. Mobile-first, accessible, not childish.

## Principles

1. **One screen, one primary decision.** Multi-question input uses `StepFlow`: progress, back, one question, one pinned primary CTA.
2. **Always show the next action.** Every hub and placeholder offers something to do now.
3. **Colour carries meaning, not decoration.** Neutral surfaces; indigo marks Mino, progress and selection.
4. **Honest states.** Planned features say "In development"; unverified data says so.

## Tokens (`app/globals.css`)

| Token | Use |
| --- | --- |
| `background` | Off-white page (`oklch(0.985 0.003 264)`) |
| `foreground` | Deep navy text |
| `primary` | Deep navy: primary buttons, avatars |
| `brand` / `brand-soft` | Indigo accent: Mino, progress, selection, active states |
| `success` / `warning` / `destructive` (+ `-soft`) | Status only |
| `muted` / `muted-foreground` | Secondary surfaces and text |
| `border` | Hairlines |
| `--radius` | 14px base; cards use `rounded-2xl` |

Light and dark palettes are both defined; dark mode is ready for a future toggle.

## Type scale

| Role | Class |
| --- | --- |
| Page title | `text-2xl md:text-3xl font-semibold tracking-tight` |
| Card title / key value | `text-lg`–`text-xl font-semibold` |
| Body | `text-[15px]` or `text-base` |
| Secondary | `text-sm text-muted-foreground` |
| Section label | `text-sm font-semibold uppercase tracking-wide text-muted-foreground` |
| Micro label | `text-xs` (labels only, never body copy) |

Numbers use `tabular-nums`.

## Spacing

4px base. Screen sections `space-y-8`; cards within a section `space-y-5`; card padding `p-5`;
list rows `px-4 py-3`, min height 64px. Screen gutter 16px mobile, 32px desktop.

## Components (`components/ds`)

| Component | Purpose |
| --- | --- |
| `PageHeader` | Title, subtitle, optional back link and action |
| `Section` | Labelled group of content |
| `Panel` | Standard card (`default`, `brand` for Mino, `muted` for prompts) |
| `RowGroup` + `ListRow` | Grouped tappable rows with icon, description, trailing chip and chevron |
| `StatusChip` | Small status label (`neutral`, `brand`, `success`, `warning`, `danger`) |
| `IconBadge` | Tinted icon container |
| `ProgressBar` | Accessible progress (`role="progressbar"`) |
| `Callout` | Inline notice for trust, source and status messages |
| `ChoiceGrid` | Large single-select options (`role="radiogroup"`) |
| `StepFlow` | Full-screen one-decision flow |
| `EmptyState`, `ErrorState`, `ScreenSkeleton` | Empty, error and loading states |

Buttons (`components/ui/button.tsx`): `default` (navy) for the primary action, `brand` for
Mino actions, `outline`/`ghost` for secondary. Default height is 40px and `lg` is 48px for primary mobile CTAs.

## Navigation

- Mobile: fixed `BottomNav` with icons and labels: Home · IELTS · Mino · Abroad · Profile. Mino has an indigo icon and label; when active it gets a solid indigo pill.
- md and up: `SideNav` rail with the same destinations. Mino carries a small "AI" tag.
- Focus flows (`/setup/*`) hide navigation.

## Accessibility

Touch targets at least 40px. Visible focus rings (`ring-ring/40`). Every icon-only control has an `aria-label`.
Progress uses ARIA values. Choice controls expose radio semantics. The layout respects the safe-area insets.
