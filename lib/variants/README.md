# Resume variants

This folder holds **tailored versions** of the resume — one file per
job-description target. A variant overrides a small, safe set of fields
on top of the base [`lib/resume-data.ts`](../resume-data.ts):

| Field | What you can change |
| --- | --- |
| `personal` | Reword `title`, `tagline`, and `summary` to mirror the JD's framing. Other `PersonalInfo` fields (name, email, links) are locked. |
| `experience` | Per-role: reorder/filter achievement bullets, reorder tech chips, reword the one-line description. Targets each base entry by `company` + `role`. Order of jobs themselves stays chronological. Copy bullet text verbatim from the base — don't invent new claims. |
| `skills` | Full replacement — reorder categories and items, drop categories. Don't invent new skills; only re-arrange what's in the base data. |
| `targetRole` | Partial override — typically just `title` and `pitch` to mirror the JD's language. |

Everything else (name, contact info, experience, education, certs,
projects) is shared from the base resume and stays consistent across
versions.

The chat widget on a variant page is **variant-aware** — the AI knows
which JD it's being viewed in the context of and will lean toward
relevant achievements when answering recruiter questions.

## Routes a variant gets for free

| Variant slug | Web page | PDF download |
| --- | --- | --- |
| `stripe-staff-data` | `/v/stripe-staff-data` | `/v/stripe-staff-data/resume.pdf` |

Pages are pre-rendered at build time via `generateStaticParams` and
marked `noindex` so search engines don't surface them. Share the
`/v/<slug>` URL directly with the recruiter — they get a normal-looking
resume site plus a tailored PDF download.

## Workflow: ask Claude Code to create a variant

In a Claude Code session in this repo, paste:

```
Create a new resume variant for this job description:

<paste the full JD here>

Use slug: <company>-<role-short>, e.g. databricks-principal-de.
```

Claude will:

1. Read the JD against `lib/resume-data.ts`.
2. Write `lib/variants/<slug>.ts` with reordered skills and a tailored
   `targetRole` (no invented skills, no fabricated achievements).
3. Register it in `lib/variants/index.ts`.
4. Tell you the share URLs.

Commit, push, and Vercel deploys it — the link is live in ~1 minute.

## Adding a variant manually

1. Copy `stripe-staff-data.ts` to `<slug>.ts` and edit it.
2. In [`index.ts`](./index.ts), import it and add to the `variants` array.
3. `npm run build` to confirm types pass.
4. Push — Vercel deploys.

## Deleting / iterating

To revoke a recruiter link, delete the file and remove it from
`index.ts`. The `/v/<slug>` route 404s on the next deploy.

To regenerate after tweaking the schema, the original JD is stored in
the variant's `jobDescription` field — re-run the prompt with that.
