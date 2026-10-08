# Chem Coach

Private, deterministic Phase 1 demo for TRY → DIAGNOSE → TEACH → SCAFFOLD → VERIFY → REVISIT.

## Local setup

Requires Node 22. Run `npm install`, `npm run db:generate`, then apply the generated migration with the starter's local D1 workflow. Start with `npm run dev`. Sites supplies authenticated-user headers in hosted use.

## Verification

Run `npm test`, `npm run lint`, and `npm run build`. Demo provenance is in `DEMO-CONTENT.md`; hands-on checks and gaps are in `MANUAL-TESTS.md`.

## Architecture

Vinext/React provides the responsive interface; a Worker API and D1 provide durable, user-owned records. Grading is a pure deterministic function, separate from UI/storage, so transitions and uncertainty are testable. No provider keys, model calls, protected question sources, or invented class mapping are included.

## Deployment and rollback

Sites applies committed Drizzle migrations before deploying the Worker. Deploy privately. Roll back by selecting the prior saved Site version; migrations are append-only, so old code must remain compatible with applied tables.
