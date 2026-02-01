# Quick Fix: Push to GitHub

## The Problem
Git is trying to use macOS keychain but can't prompt for credentials.

## Solution: Use Token in URL

### Step 1: Get Your Personal Access Token

1. Go to: **https://github.com/settings/tokens**
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Barak Job Portal`
4. Expiration: Choose 90 days or No expiration
5. **Check the box:** `repo` (full control)
6. Click: **"Generate token"**
7. **Copy the token** (starts with `ghp_`) - You won't see it again!

### Step 2: Update Remote URL with Token

Run this command (replace `YOUR_TOKEN` with the token you copied):

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Minor-lazer/barak-job-portal.git
```

**Example:**
```bash
git remote set-url origin https://ghp_abc123xyz456@github.com/Minor-lazer/barak-job-portal.git
```

### Step 3: Push

```bash
git push -u origin main
```

This should work immediately without any prompts!

## Alternative: Use SSH (More Secure)

If you prefer SSH:

```bash
# Change to SSH URL
git remote set-url origin git@github.com:Minor-lazer/barak-job-portal.git

# Push (will use SSH key)
git push -u origin main
```

But you'll need to set up SSH keys first.

## Verify It Worked

After successful push, you'll see:
```
Enumerating objects: ...
Counting objects: 100% ...
Writing objects: 100% ...
To https://github.com/Minor-lazer/barak-job-portal.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Then you're ready to deploy on Vercel! 🚀
