

# Production-Ready Auth + Email + Payments Audit & Fix

## Current State Assessment

| Area | Status | Issues |
|------|--------|--------|
| **Login** | Magic link only (OTP) | No email/password signup, no password reset, no email verification enforcement |
| **Protected routes** | Working (`ProtectedRoute` component) | Only checks `user`, not email verification |
| **Stripe checkout** | Working with real price IDs | Properly gated behind auth |
| **Webhook** | Working | Updates profiles on subscription changes |
| **check-subscription** | Working | Syncs Stripe state to profiles table |
| **customer-portal** | Working | Already wired to Dashboard |
| **Emails** | No custom domain configured | Using default Lovable auth emails |
| **`lib/supabase/server.ts`** | Dead code | Uses Next.js imports (`next/headers`) — will never work in Vite |

## Key Decisions

**Auth model:** The current login is magic-link only. To add email verification enforcement and password reset, we need to switch to **email + password** auth (with magic link as a secondary option). This gives us:
- Proper signup with email verification
- Password reset flow (`/reset-password` page)
- Email confirmation enforcement before dashboard access

## Plan

### 1. Rewrite Login page to support email + password

**`src/pages/Login.tsx`** — Replace magic-link-only form with a tabbed signup/login form:
- **Sign In tab**: Email + password fields, "Forgot password?" link
- **Sign Up tab**: Email + password + confirm password, submit calls `supabase.auth.signUp()` with `emailRedirectTo: window.location.origin`
- After signup, show "Check your email to verify your account" message
- After login, redirect to `/dashboard`
- Proper validation (email format, password min 8 chars, passwords match)
- Loading states and error toasts
- Keep referral param handling

### 2. Create `/reset-password` page

**`src/pages/ResetPassword.tsx`** — New page:
- Detects `type=recovery` in URL hash from Supabase email link
- Shows "Set new password" form with password + confirm
- Calls `supabase.auth.updateUser({ password })`
- Success → redirect to `/dashboard`
- Add route to `App.tsx`

### 3. Enforce email verification

**`src/components/ProtectedRoute.tsx`** — Update to check `user.email_confirmed_at`:
- If user exists but email not confirmed, show "Please verify your email" screen with resend button
- Only allow through to children if email is confirmed

**`src/hooks/useAuth.tsx`** — Add `isEmailVerified` to context

### 4. Add forgot password flow

**`src/pages/Login.tsx`** — Add "Forgot password?" link that shows an email input and calls:
```
supabase.auth.resetPasswordForEmail(email, {
  redirectTo: window.location.origin + '/reset-password'
})
```

### 5. Configure auth settings

- Do NOT enable auto-confirm (email verification must be enforced)
- Email confirmation is enabled by default in Lovable Cloud

### 6. Set up custom auth emails

Since no email domain is configured, we need to show the email setup dialog so you can configure a sender domain. After that, we'll scaffold branded auth email templates matching your dark cyber theme.

### 7. Delete dead code

- Remove `lib/supabase/server.ts` (Next.js code that can't work in Vite)

### 8. Wire `refreshProfile` after checkout success

**`src/pages/Dashboard.tsx`** — On mount, check for `?checkout=success` query param and call `refreshProfile()` to immediately sync subscription status.

---

## Files Changed

| File | Change |
|------|--------|
| `src/pages/Login.tsx` | Rewrite: email+password signup/login with tabs, forgot password |
| `src/pages/ResetPassword.tsx` | **New**: password reset form |
| `src/components/ProtectedRoute.tsx` | Add email verification check + resend UI |
| `src/hooks/useAuth.tsx` | Add `isEmailVerified` field |
| `src/App.tsx` | Add `/reset-password` route |
| `src/pages/Dashboard.tsx` | Handle `?checkout=success` with `refreshProfile()` |
| `lib/supabase/server.ts` | **Delete** (dead Next.js code) |

## No changes to

- Edge functions (already production-ready)
- RLS policies (already properly configured with privilege escalation protection)
- Blog, matrix, automation scripts, existing content

## Manual Tests After Changes

1. **Signup**: Create account → should see "verify email" message → click link in email → should land on dashboard
2. **Login**: Sign in with email+password → should reach dashboard
3. **Unverified access**: Sign up but don't verify → try to access `/dashboard` → should see verification prompt
4. **Password reset**: Click "Forgot password" → enter email → click reset link → set new password → login with new password
5. **Checkout**: From pricing, click Pro → complete Stripe test checkout → return to dashboard → should show PRO badge
6. **Manage subscription**: On dashboard, click "Manage Subscription" → should open Stripe portal
7. **Protected routes**: Log out → visit `/dashboard` → should redirect to `/login`

