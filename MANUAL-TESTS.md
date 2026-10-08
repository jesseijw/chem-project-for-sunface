# Manual test checklist

- Check the responsive layout, keyboard labels, and touch targets.
- Confirm a valid independent setup advances to a fresh verification question.
- Confirm a miss asks one probe, teaches one idea, then scaffolds.
- Confirm invalid input is not treated as wrong evidence.
- Refresh after a graded submission and inspect `/api/state` for server-saved state.
- Submit one idempotency key twice and confirm only one attempt exists.
- Confirm anonymous API calls return 401 and records are filtered by owner ID.

# Known limitations

This is the Phase 1 demo slice. The live class map, photos/OCR, full Practice and AP Check sessions, content administration, exports/deletion, curator roles, weekly aggregation, and provider integrations require the unresolved inputs in the build brief.
