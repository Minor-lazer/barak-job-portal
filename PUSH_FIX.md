# Fix: Git Push Not Prompting for Credentials

## Issue
When you run `git push -u origin main`, nothing happens - no prompt appears.

## Solutions

### Solution 1: Use Token in URL (Quickest)

Instead of waiting for a prompt, include the token in the URL:

```bash
# First, get your Personal Access Token from GitHub
# Go to: https://github.com/settings/tokens
# Generate new token (classic) with 'repo' scope

# Then update remote URL with token:
git remote set-url origin https://YOUR_TOKEN@github.com/Minor-lazer/barak-job-portal.git

# Replace YOUR_TOKEN with your actual token (starts with ghp_)
# Example:
# git remote set-url origin https://ghp_xxxxxxxxxxxx@github.com/Minor-lazer/barak-job-portal.git

# Now push:
git push -u origin main
```

### Solution 2: Use SSH Instead

1. **Generate SSH key (if you don't have one):**
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   # Press Enter for defaults
   ```

2. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the entire output
   ```

3. **Add to GitHub:**
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your public key
   - Save

4. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:Minor-lazer/barak-job-portal.git
   git push -u origin main
   ```

### Solution 3: Use GitHub CLI (Easiest)

1. **Install GitHub CLI:**
   ```bash
   brew install gh
   ```

2. **Authenticate:**
   ```bash
   gh auth login
   # Follow the prompts
   ```

3. **Push:**
   ```bash
   git push -u origin main
   ```

### Solution 4: Manual Credential Input

If the prompt isn't showing, try:

```bash
# Clear any cached credentials
git credential-osxkeychain erase
host=github.com
protocol=https
# Press Enter twice

# Or try with explicit credential helper:
GIT_TERMINAL_PROMPT=1 git push -u origin main
```

## Recommended: Use Token in URL

**This is the fastest solution:**

1. **Get token:** https://github.com/settings/tokens → Generate new token (classic)
2. **Update remote:**
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/Minor-lazer/barak-job-portal.git
   ```
3. **Push:**
   ```bash
   git push -u origin main
   ```

## Verify Remote URL

Check your current remote:
```bash
git remote -v
```

## After Successful Push

You should see:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
To https://github.com/Minor-lazer/barak-job-portal.git
 * [new branch]      main -> main
```

Then proceed to deploy on Vercel!
