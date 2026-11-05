# xenogram — agent notes

The repo was renamed from `family-tree` to `xenogram` on 2025-05-12 and has never been
deployed before (the last commit before this one was "Mark project as not maintained").
It is live now as **Xenotree**: https://xenotree.vercel.app

## live infrastructure

| piece | where | notes |
|---|---|---|
| app | Vercel project `xenotree`, id `prj_PI46XYVVIAegNA5QVYknWpoxWkqP` | team `team_gppoFTJOL6naEWSA2YsbUCxu` (Fahad's projects), account `fahadbinhussain001@gmail.com` |
| db | Neon project `xenotree`, id `weathered-credit-35174466` | region `aws-ap-southeast-1` (closest to Dhaka), pg 18, endpoint `ep-aged-violet-az456taz` |
| auth | GCP project `xenogram` (number `728656376284`) | OAuth client `Xenotree`, id `728656376284-8jfpu6cejea89unitlffusih4ek8q0ks.apps.googleusercontent.com` |
| secrets | Bitwarden item `github.com/FahadBinHussain/xenogram / .env (production)` | env vars also live in the Vercel project |

The old `Xenogram` OAuth client (created 2025-05-12) was **deleted** on 2026-11-05 —
it only had localhost redirect URIs and was about to be auto-deleted by Google for
6 months of inactivity. The replacement client is the only one in the project.

## deploy

```powershell
Set-Location C:\Users\Admin\Downloads\xenogram
& pwsh -NoProfile -ExecutionPolicy Bypass -File C:\Users\Admin\Downloads\mainframe\vercel-account.ps1 `
  run fahadbinhussain001@gmail.com deploy --prod --yes --scope team_gppoFTJOL6naEWSA2YsbUCxu
```

The Vercel team has **no GitHub login connection**, so `vercel git connect` fails with
"you need to add a Login Connection to your GitHub account first". There is no
auto-deploy on push — deploys are manual CLI runs. (Fixing it means connecting a
GitHub account to the team in the Vercel dashboard, which needs a browser OAuth grant.)

Project settings that matter:
- `nodeVersion: 22.x` (do not let Vercel pick 26.x)
- `installCommand: npm ci` (the repo has both `package-lock.json` and `pnpm-lock.yaml`)
- `ssoProtection: null` — otherwise Vercel Authentication gates the whole site
- region stays at the default `iad1`; the database is in Singapore, which is what
  actually matters for latency

## what broke the build before (all fixed in `d80a4ed` + `3b0a06f`)

The repo had never been built, so it carried four build-breaking bugs:

1. `AnimatedFeaturesSection.tsx` — narrowing on `ref.current` does not survive into
   the `gsap.context` callback. Capture the refs into locals first.
2. `useGSAP.ts` — `createAnimation` returned `Tween | undefined`; type it
   `gsap.core.Tween | null` and initialise `anim` explicitly.
3. `TrpcProvider.tsx` — in tRPC v10 the `superjson` transformer belongs on
   `trpc.createClient({ transformer })`, not on the link.
4. `server/api/trpc.ts` — `Awaited<ReturnType<typeof getServerSession>>` resolves to
   `unknown`; import `type Session` from next-auth and type the context as
   `Session | null`.
5. Next 15 requires `useSearchParams()` to sit inside a `<Suspense>` boundary, or the
   `/auth/signin` prerender fails.
6. Vercel **refuses to deploy Next.js 15.3.2** ("Vulnerable version of Next.js
   detected"). 15.5.29 is the patched 15.5 backport line.

`postinstall: prisma generate` was added so the Prisma client is generated on Vercel.

## gotchas

- **The OAuth client secret is write-once.** The `Xenotree` client was created after
  June 2025, so Google no longer shows the secret in the console. It lives in the
  Vercel project env (`GOOGLE_CLIENT_SECRET`) and in the Bitwarden vault item
  `github.com/FahadBinHussain/xenogram / .env (production)`. Do not rotate it without
  re-saving it to both. Never write the literal secret into this file — this repo is
  public and GitHub push protection blocks pushes that contain it.
- **NextAuth v4 sign-in is a POST, not a GET.** `GET /api/auth/signin/google` answers
  `302 /auth/signin?...&error=google` — that is the wrong-verb response, not a broken
  client. The real flow is `GET /api/auth/csrf` (keep the cookie) then
  `POST /api/auth/signin/google` with `csrfToken` and `json=true`, which returns the
  `accounts.google.com` authorization URL.
- **The consent screen rejects the whole form if one field is invalid.** An empty
  authorized-domain list silently discarded the app name and home page. Always reload
  the branding page after saving to confirm what stuck.
- **Publishing out of "Testing" needs the branding page complete**: app name,
  application home page, privacy policy link, terms of service link and an authorized
  domain. `/privacy` and `/terms` were added to this repo for exactly that.
- `prisma migrate deploy` against the Neon production DB is run from the local clone
  with `DATABASE_URL` set to the pooled Neon connection string.

## local dev

```powershell
cd C:\Users\Admin\Downloads\xenogram
npm install
npx prisma migrate deploy   # against Neon, DATABASE_URL must be set
npm run dev
```

`npx prisma generate` runs automatically on `npm install` via `postinstall`.
