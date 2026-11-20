# Homepage hero — "The house that stays lit" (motion hero spec)

Built with the MotionSites web-builder workflow. Keep these tokens when extending the hero.

## Signature
Full-bleed, seamless 9.6s loop cut from the owner's brand film, telling the headline's story:
**day** (drone over the Mickleham estates) → **dusk** (two installers backlit by the sun) → **night**
(headlamp install) → day. A quiet DAY — DUSK — NIGHT indicator (bottom-right) tracks the footage live.

## Composition (bottom-anchored)
- Fixed transparent glass-free header over the film; turns solid paper after 40px scroll.
- Bottom-left column, max 46rem: eyebrow → H1 (2 hand-broken lines) → sub → quote bar → call line.
- Bottom-right: scene indicator + location label (desktop ≥ 900px only).
- Hero height `100vh; 100dvh`, min 640px. Gutters 24px mobile / 64px desktop, bottom padding 56px.

## Tokens
| Token | Value |
|---|---|
| Hero bg (night edge) | `#070d11` |
| Ink | `#fff`, steps 100 / 80 / 60 / 40 % |
| Accent (CTA fill, active scene dot, chip icons — 3 uses only) | `#f2a01f` |
| Scrim | bottom `rgba(7,13,17,.92)` → `.55` @35% → 0 @65%; left `rgba(7,13,17,.55)` → 0 @58% |
| Grain | SVG fractal noise, opacity .07, `mix-blend-mode: overlay` |
| Glass material | `rgba(255,255,255,.06)` + `backdrop-filter: blur(14px) saturate(140%)`, 1px inner highlight, masked gradient edge |

## Type
Bricolage Grotesque variable (self-hosted woff2).
- H1: `clamp(2.6rem, 7.4vw, 7.4rem)`, weight 500, line-height .92, tracking -0.045em. Lines: "The house" / "that stays lit."
- Eyebrow / labels: 12px, weight 600, uppercase, +0.18em, 70% ink.
- Sub: 17px / 1.55, 80% ink, max-width 34rem.

## Copy
- Eyebrow: "5.0★ on Google · Excellence Awards finalist 2023–2026"
- Sub: "Solar by day, battery by night, backup when the grid goes dark — designed and installed by Amrit Singh Thapa's award-finalist team in Mickleham."
- Quote bar label: "Get a free quote — what do you need?" + 6 service chips (chip click = wizard step 1, opens dialog at step 2)
- Call line: "Prefer to talk? 0451 644 220 · Watch the 2-minute film"

## Motion
- Poster paints instantly (CSS background); video fades 0→1 over .8s on `playing`, settles scale 1.06→1 over 1.8s.
- Entrance: header 0s → eyebrow .1s → H1 line rise (mask, 110%→0) .2s / .32s → sub .5s → quote bar .65s → call line .8s → indicator .9s.
  0.8s each, `cubic-bezier(0.22,1,0.36,1)`. CSS-only (no JS dependency → nothing stuck at opacity 0).
- Video pauses off-screen (IntersectionObserver). `prefers-reduced-motion`: no autoplay, poster only, no entrance animation.
- Hovers: chip lift −1px + bg 6→14%, 200ms; `:active` scale .97.
