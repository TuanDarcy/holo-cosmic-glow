# 🐛 TROUBLESHOOTING: Blank Page Issue

## Status: Investigating

### Steps to Debug

#### 1. **Open Developer Console** (F12)
   - Press F12 or Ctrl+Shift+I
   - Go to "Console" tab
   - Look for RED ERROR messages

#### 2. **If You See Red Errors**
   - Take screenshot of error
   - Note the error message
   - Check the file mentioned in error

#### 3. **Common Issues & Fixes**

### Issue #1: Module Not Found Error
**Error looks like**: 
```
Cannot find module '@/...' or similar
```
**Fix**:
- Make sure file exists in the path
- Check import path capitalization
- Verify file extension (.tsx, .ts, etc.)

### Issue #2: "Cannot read property 'length' of undefined"
**Likely cause**: Data/component prop issue
**Fix**:
```bash
npm run build  # Check build errors
```

### Issue #3: CSS Not Loading
**Sign**: Elements visible but no styling
**Fix**:
```bash
# Clear cache and restart
rm -r node_modules/.vite
npm run dev
```

### Issue #4: React Component Crash
**Sign**: Blank page, console has React errors
**Fix**:
- Check console for "Error Boundary" warnings
- Look for component import issues
- Verify component exports are correct

---

## Quick Fixes to Try

### Fix 1: Hard Refresh
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Fix 2: Clear Local Storage
```javascript
// Paste in console:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Fix 3: Check if Navbar Component Works
```javascript
// Paste in console:
console.log("Testing imports...");
try {
  console.log("✅ If you see this, console works");
} catch(e) {
  console.error("❌ Error:", e);
}
```

### Fix 4: Restart Dev Server
```bash
# Terminal:
Ctrl + C  (stop server)
npm run dev  (restart)
```

### Fix 5: Clean Rebuild
```bash
npm run build  # Check for build errors
# If build succeeds, issue is in dev server only
```

---

## What to Check

- [x] Dev server running? (port 8081)
- [x] No console errors? (F12 → Console)
- [x] Page loaded? (Network tab shows HTML)
- [x] Assets loaded? (Network tab shows images)
- [x] React mounted? (Check if `<div id="root">` has content in Elements tab)

---

## Files That Could Cause Blank Page

1. **src/App.tsx** - Router setup
2. **src/pages/Index.tsx** - Home page component
3. **src/components/Navbar.tsx** - Navigation
4. **src/components/HeroSlider.tsx** - Hero section
5. **src/main.tsx** - Entry point
6. **index.html** - HTML root

---

## Browser DevTools Steps

### Step 1: Check Console Tab
```
F12 → Console → Look for red errors
```

### Step 2: Check Network Tab
```
F12 → Network → Reload page
Should see: 
- index.html ✅
- /src/main.tsx ✅
- CSS files ✅
- JS chunks ✅
```

### Step 3: Check Elements Tab
```
F12 → Elements → Inspect <div id="root">
Should contain React components, not be empty
```

### Step 4: Check Sources
```
F12 → Sources → Look for errors
Red X marks indicate problems
```

---

## If Still Blank After Fixes

### Option 1: Check Recent Changes
```bash
git diff  # See what changed
git log --oneline -5  # See recent commits
```

### Option 2: Revert Last Changes
```bash
git checkout HEAD~1  # Go back one commit
npm run dev  # Test if it works
```

### Option 3: Start Fresh Build
```bash
rm -rf dist node_modules/.vite
npm run dev
```

### Option 4: Check Specific Component
Replace contents of src/pages/Index.tsx with:
```jsx
export default function Index() {
  return <div>Test Page Works!</div>;
}
```

---

## Report Format

If blank page persists, check these and report:

```
Issue: [Describe what's blank/not showing]

Console Errors (F12): 
[Paste any red error messages]

Network Status:
- index.html: [✅ / ❌]
- main.tsx: [✅ / ❌]
- CSS: [✅ / ❌]

Root Element (F12 Elements):
- Contains content?: [Yes / No]
- Console errors?: [Yes / No]

Recently changed files:
[List any files edited before issue]
```

---

## Quick Command Reference

```bash
# Restart dev server
npm run dev

# Full rebuild
npm run build && npm run preview

# Check for errors
npm run type-check

# Clean and reinstall
npm ci

# View logs
# See: logs/phase1/PHASE1_LOG.md
```

---

## Additional Resources

- **Full Logs**: `logs/README.md`
- **Quick Start**: `QUICK_START.md`
- **Navigation**: `NAVIGATION_GUIDE.md`
- **File Manifest**: `FILE_MANIFEST.md`

---

**Created**: Troubleshooting guide for blank page issues
**Status**: Ready to help debug

Once you check console (F12) and report errors, we can fix! 🔧

