# Lead form validation provenance

`fields.ts` is a byte-identical copy of the canonical email/phone rules. Do not edit it here;
re-copy it from upstream when the canonical file changes.

| Item | Value |
| --- | --- |
| Upstream repo | `Landing-Pages-Websites/lp-starter` |
| Upstream commit | `c5426bb226175c12e7184ad87f08c40f0707d8d1` |
| File | `src/lib/fields.ts` |
| SHA-256 | `710e8919558be6ab77f4d730cc6efdb915cbf961bc78333628b97afa8b191fc6` |
| Declaration-rule reference (not copied) | `src/lib/leadPayload.ts` at the same commit, SHA-256 `3f4ca5b9a8859a9bb3a583057f71e8368ed53b8d1759463290c51be181e169a6` |

Authority: Director scope amendment on Atlas task `1ee2791d-5ddf-426c-82ef-af74854da8bc`,
comment `96cf3ba1-5e86-4b73-8002-9fd475a9f511` (landing-page-forms §§4a–4c Form Integrity repair).

`leadFields.ts` is the small pre-starter adapter that declares this page's six fields
(`firstName`, `lastName`, `email`, `phone`, `ownsHome`, `timeline`) and is the one validator run by
both the form's submit gate (`LeadForm.tsx`) and `useMegaLeadForm.submit()` before any transport.
It delegates every email and phone decision to `fields.ts`.

Verify the pin: `sha256sum src/lib/fields.ts`

Run the regression tests (no extra dependencies):

```sh
node --import ./tests/register.mjs --test tests/*.test.ts
```
