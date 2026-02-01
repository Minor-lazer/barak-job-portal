# Fix GitHub Authentication Issue

## Problem
GitHub no longer accepts passwords for Git operations. You need to use a **Personal Access Token (PAT)** or **SSH**.

## Solution 1: Use Personal Access Token (Easiest)

### Step 1: Create a Personal Access Token

1. **Go to GitHub:**
   - Visit: https://github.com/settings/tokens
   - Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token:**
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Name it: `Barak Job Portal`
   - Expiration: Choose 90 days or No expiration
   - **Select scopes:** Check `repo` (full control of private repositories)
   - Click **"Generate token"**

3. **Copy the token immediately!** (You won't see it again)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Use Token to Push

**Option A: Use token in URL (one-time)**
```bash
git push -u origin main
# When prompted:
# Username: Minor-lazer
# Password: paste-your-token-here (not your GitHub password!)
```

**Option B: Store credentials (recommended)**
```bash
# Push with token
git push -u origin main
# Enter username: Minor-lazer
# Enter password: paste-your-token-here

# Or use credential helper to save it
git config --global credential.helper store
git push -u origin main
# Enter credentials once, they'll be saved
```

## Solution 2: Use SSH (More Secure)

### Step 1: Check for SSH Key
```bash
ls -al ~/.ssh
```

### Step 2: Generate SSH Key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
# Press Enter for default location
# Press Enter for no passphrase (or set one)
```

### Step 3: Add SSH Key to GitHub
```bash
# Copy your public key
cat ~/.ssh/id_ed25519.pub
# Copy the entire output
```

1. Go to: https://github.com/settings/keys
2. Click **"New SSH key"**
3. Title: `MacBook Air` (or any name)
4. Paste your public key
5. Click **"Add SSH key"**

### Step 4: Change Remote to SSH
```bash
git remote set-url origin git@github.com:Minor-lazer/barak-job-portal.git
git push -u origin main
```

## Quick Fix (Easiest - Use Token)

1. **Get token:** https://github.com/settings/tokens → Generate new token (classic) → Check `repo` → Generate
2. **Copy the token** (starts with `ghp_`)
3. **Push again:**
   ```bash
   git push -u origin main
   ```
4. **When prompted:**
   - Username: `Minor-lazer`
   - Password: `paste-your-token-here` (the token, not your password!)

## Verify It Worked

After successful push, you should see:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
To https://github.com/Minor-lazer/barak-job-portal.git
 * [new branch]      main -> main
```

Then you can proceed to deploy on Vercel!
