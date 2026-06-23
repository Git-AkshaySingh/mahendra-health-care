## Issue
The Footer's "Terms of Service" link points to `/terms`, but the route registered in `src/App.tsx` is `/terms-and-conditions`. Clicking it falls through to the NotFound page.

## Fix
Update the Footer link in `src/components/Footer.tsx` (line 25) from `/terms` to `/terms-and-conditions` so it matches the registered route and renders the `TermsAndConditions` page.

No other files or routes need changes.