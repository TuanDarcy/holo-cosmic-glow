# ⚡ EMERGENCY QUICK FIX

## Trang trắng? Làm ngay cái này:

### Step 1: Visit Test Page (2 seconds)
```
http://localhost:8081/test
```

**Nếu thấy text như "Test Page Works":**
→ React OK, vấn đề ở Index component
→ Go to Step 3

**Nếu vẫn trắng:**
→ Vấn đề ở App level
→ Go to Step 2

---

### Step 2: Open Console (3 seconds)
- Press: `F12`
- Click: "Console" tab
- Look for: 🔴 RED ERRORS

**Note down the error message and go to Step 4**

---

### Step 3: Check Home Page (5 seconds)
```
http://localhost:8081/
```

**Nếu `/test` OK nhưng `/` blank:**
- Problem: Index component
- Solution: Check Navbar hoặc HeroSlider import

Open F12 Console và tìm lỗi

---

### Step 4: Report Error

Paste error message như format này:

```
Error Type: [e.g., "Cannot find module", "Unexpected token", etc.]
Error Line: [Screenshot từ console thứ mấy]
Error Message: [Exact text từ console]
URL: [http://localhost:8081/xxx]
```

---

## Troubleshooting Paths

```
Blank Page
    ├─→ /test visible?
    │   ├─→ YES: Issue in Index component
    │   │   └─→ Check Navbar or HeroSlider imports
    │   │
    │   └─→ NO: Issue in App level
    │       ├─→ Check console for errors
    │       └─→ Check App.tsx imports
    │
    └─→ Has F12 console error?
        ├─→ YES: Fix based on error type
        └─→ NO: Issue with rendering (CSS? Data?)
```

---

## Quick Commands

```bash
# Restart dev server
npm run dev

# Check TypeScript errors
npm run type-check

# View logs folder structure
ls -la logs/

# View Phase 1 log
cat logs/phase1/PHASE1_LOG.md
```

---

## 3 Most Common Issues

### 1️⃣ Import Path Error
**Console shows**: `Cannot find module '@/components/...'`
**Fix**: Check file exists and path is correct

### 2️⃣ Missing Asset Image
**Console shows**: `Failed to load image`
**Fix**: Verify image in `src/assets/` folder exists

### 3️⃣ Component Render Error
**Console shows**: `React error boundary caught`
**Fix**: Check component code for syntax errors

---

## Files to Check (In Order)

1. **Console Error** (F12) → Copy exact error
2. **src/App.tsx** → Check imports & routes
3. **src/main.tsx** → Check if simple
4. **src/pages/Index.tsx** → Check component syntax
5. **src/components/Navbar.tsx** → Check import

---

## Need Help?

Check these docs:
- `TROUBLESHOOTING_BLANK_PAGE.md` - Full guide
- `logs/README.md` - Log system guide
- `WORK_DONE_TODAY.md` - Summary of changes

---

**Made**: Test page + logging system  
**Need you to**: Check `/test` page and report console errors

Go to: `http://localhost:8081/test` now! 🚀

