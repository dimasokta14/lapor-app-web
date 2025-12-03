# Git Setup - Quick Start Guide

## What's Been Set Up

✅ **Git Repository**: Initialized and ready
✅ **.gitignore File**: Comprehensive and configured
✅ **Documentation**: Full guides provided

---

## Quick Commands

### First Time Setup

```bash
# Configure your git identity
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Verify configuration
git config --list
```

### Daily Workflow

```bash
# Check status (shows what changed)
git status

# See what files Git is tracking/ignoring
git status --short
git status --ignored

# View changes
git diff                    # Unstaged changes
git diff --staged           # Staged changes

# Stage files for commit
git add .                   # Stage all changes
git add src/                # Stage specific folder
git add file.js             # Stage specific file

# Create a commit
git commit -m "Brief description of changes"
git commit -m "
Title of commit (50 chars)

Optional detailed explanation if needed.
Multiple lines are fine.
"

# View commit history
git log                     # Full history
git log --oneline           # Compact view
git log --oneline -10       # Last 10 commits

# Push to remote
git push origin master      # Push to main branch
git push                    # If tracking is set

# Pull from remote
git pull origin master      # Pull from main
git pull                    # If tracking is set
```

---

## Project-Specific Workflow

### Starting Development

```bash
# 1. Clone the repository
git clone https://github.com/user/web-lapor-clone.git
cd web-lapor-clone

# 2. Install dependencies
npm install

# 3. Create local environment file
cp .env.example .env
# Edit .env with your local values

# 4. Start development server
npm run dev

# 5. Check Git status
git status
```

### Making Changes

```bash
# 1. Make changes to source code
# (Edit files in src/, etc.)

# 2. Check what changed
git status
git diff

# 3. Stage your changes
git add .

# 4. Verify staged changes
git status
git diff --staged

# 5. Create a commit
git commit -m "feat: Add report form modal
- Created ReportFormModal component
- Added styling and animations
- Integrated with AuthContext"

# 6. Push to remote
git push
```

### Before Committing

```bash
# DO NOT commit:
node_modules/          ✗
dist/                  ✗
.env                   ✗
.vscode/               ✗
.DS_Store              ✗
*.log                  ✗
coverage/              ✗

# DO commit:
src/                   ✓
package.json           ✓
.gitignore             ✓
README.md              ✓
Documentation files    ✓
vite.config.js         ✓
```

---

## Common Scenarios

### Scenario 1: Undo Changes to a File
```bash
# If not staged yet
git checkout -- filename.js
# or (newer Git)
git restore filename.js

# If already staged
git reset filename.js          # Unstage
git checkout -- filename.js    # Discard changes
```

### Scenario 2: Undo Last Commit
```bash
# Undo commit, keep changes staged
git reset --soft HEAD~1

# Undo commit, keep changes unstaged
git reset --mixed HEAD~1
# or
git reset HEAD~1

# Undo commit, discard changes (⚠️ irreversible)
git reset --hard HEAD~1
```

### Scenario 3: Create a New Branch
```bash
# Create and switch to new branch
git checkout -b feature/new-feature
# or (newer Git)
git switch -c feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push new branch
git push -u origin feature/new-feature
```

### Scenario 4: Switch Between Branches
```bash
# List branches
git branch                  # Local branches
git branch -a               # All branches

# Switch to branch
git checkout branch-name
# or (newer Git)
git switch branch-name

# Delete branch
git branch -d branch-name   # Safe delete
git branch -D branch-name   # Force delete
```

### Scenario 5: Merge Branch into Main
```bash
# Switch to main branch
git checkout main
# or
git switch main

# Pull latest changes
git pull

# Merge feature branch
git merge feature/new-feature

# Push merged changes
git push
```

---

## Files to Know About

### `.gitignore` (Version Controlled)
```
✓ COMMIT this file
✓ Share with team
✓ Controls what Git ignores
```

**Location**: `/home/dimas/Project/web-lapor-clone/.gitignore`

### `.env` (NOT Version Controlled)
```
✗ DO NOT commit
✗ Keep locally
✗ Contains secrets
```

**Setup**: Copy from `.env.example`

### `package.json` (Version Controlled)
```
✓ COMMIT this file
✓ Lists dependencies
✓ Share with team
```

**Usage**: Run `npm install` to restore node_modules

---

## Understanding Git Status

### Green text (Staged)
```
M  modified_file.js     → Ready to commit
A  new_file.js          → New file ready to commit
```

### Red text (Unstaged)
```
M  modified_file.js     → Modified but not staged
?? new_file.js          → Untracked (ignored or just created)
D  deleted_file.js      → Deleted but not staged
```

### How to fix:
```bash
# Stage all changes
git add .

# Or stage specific file
git add modified_file.js

# Verify
git status
```

---

## Important Notes

### Never Commit:
- ❌ `node_modules/` - Install with `npm install`
- ❌ `.env` - Copy from `.env.example`
- ❌ `dist/` - Generated during `npm run build`
- ❌ `.DS_Store` - macOS file (ignored by .gitignore)
- ❌ `.vscode/` - IDE settings (ignored by .gitignore)

### Always Commit:
- ✅ `src/` - Your source code
- ✅ `package.json` - Dependencies list
- ✅ `index.html` - Entry point
- ✅ `.gitignore` - Git configuration
- ✅ Documentation files (*.md)

### On First Clone:
1. `git clone ...`
2. `npm install` (creates node_modules)
3. Copy `.env.example` to `.env`
4. Edit `.env` with local values
5. Run `npm run dev`

---

## Commit Message Best Practices

### Format
```
[Type] Brief description (50 chars max)

Optional detailed explanation if needed.
Can be multiple lines.
Explain WHY not WHAT.

Closes #123 (if fixing an issue)
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation change
- `style:` - Code style (no logic change)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks

### Examples
```bash
# Good
git commit -m "feat: Add report form modal"
git commit -m "fix: Fix carousel layout issue"
git commit -m "docs: Add gitignore guide"

# Too vague (avoid)
git commit -m "Update stuff"
git commit -m "Changes"
git commit -m "WIP"
```

---

## Helpful Aliases

Add these to make Git easier:

```bash
# View short log
git config --global alias.lg "log --oneline --decorate --all"

# View branching
git config --global alias.tree "log --all --oneline --graph --decorate"

# Quick status
git config --global alias.st "status -s"

# View diffs
git config --global alias.d "diff"
git config --global alias.ds "diff --staged"

# Quick add and commit
git config --global alias.ac "!git add -A && git commit"
```

Then use:
```bash
git lg              # instead of git log --oneline --decorate --all
git tree            # View commit tree
git st              # Quick status
git ac -m "message" # Add and commit
```

---

## Troubleshooting

### Issue: "Your branch is ahead of origin/master by X commits"
**Meaning**: You have commits not yet pushed
**Fix**: Run `git push`

### Issue: "Your branch is behind origin/master by X commits"
**Meaning**: Remote has new commits you don't have
**Fix**: Run `git pull`

### Issue: "fatal: not a git repository"
**Meaning**: Not in a Git project directory
**Fix**: `cd` to correct directory or `git init` to start new repo

### Issue: "Untracked files would be overwritten by merge"
**Meaning**: You have files that would conflict
**Fix**:
```bash
git stash          # Save changes temporarily
git pull           # Pull remote changes
git stash pop      # Restore your changes
```

### Issue: "Permission denied (publickey)"
**Meaning**: SSH key not set up
**Fix**:
```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "your@email.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# Add public key to GitHub/GitLab settings
```

---

## Resources

### Git Documentation
- Official Git Book: https://git-scm.com/book/en/v2
- Git Cheat Sheet: https://github.github.com/training-kit/

### Our Project
- `.gitignore`: Configured for Node.js/React
- `.env.example`: Create this if needed
- `GITIGNORE_GUIDE.md`: Detailed .gitignore documentation

---

## Next Steps

1. ✅ Clone the repository
2. ✅ Run `npm install`
3. ✅ Create `.env` from `.env.example`
4. ✅ Start developing with `npm run dev`
5. ✅ Commit regularly with `git commit -m "..."`
6. ✅ Push when ready with `git push`

---

*Created: December 3, 2025*
*Status: Ready to Use*
