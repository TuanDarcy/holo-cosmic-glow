# ✨ Holo - Cosmic Glow

A modern, cosmic-themed e-commerce platform for buying & selling Roblox game accounts and in-game currency. Built with React, TypeScript, Vite, and Shadcn/UI with a stunning dark theme featuring cyan & purple glowing effects.

---

## 🌟 Features

### 🏪 Shop & Browse

- **Blox Fruits Accounts**: Premium accounts with various fruit combinations (Leopard, Dragon, Venom, Buddha, Dough, etc.)
- **Pet Simulator X Accounts**: Rare pet collections including Crowned Corgis, Dark Matter Galaxy Foxes, Rainbow exclusive bundles
- **Robux Currency**: Instant delivery of Robux in multiple denominations (100-5,000 Robux)
- **Product Cards**: Display with images, prices, level indicators, item counts, and hot/sale/premium/rare tags
- **Quick Stats Dashboard**: Live statistics on active users, accounts sold, pet services, and Robux delivered

### 📊 User Dashboard

- **Overview Tab**: Quick metrics for total spent, orders count, and active services
- **Orders Tab**: Track all transactions with order IDs, items, amounts, statuses (Delivered/Processing/Pending)
- **Leveling Progress**: Monitor account leveling across Blox Fruits, Pet Simulator X, Murder Mystery 2
- **Settings Tab**: Account management and preferences
- **Responsive Sidebar**: Navigation with icons (Desktop & Mobile friendly)

### 💳 Flexible Payments

- **Visa/MasterCard**: International card payments
- **ATM/Bank Transfer**: All Vietnamese banks supported
- **MoMo Wallet**: Instant payment confirmation
- **Amount Selection**: Multiple preset amounts from 50,000₫ to 2,000,000₫
- **QR Code Payment**: Visual payment reference with copy-to-clipboard

### 🎨 Premium UI/UX

- **Dark Cosmic Theme**: Professional dark background with cyan & purple accents
- **Glass Panels**: Frosted glass effect on all card elements
- **Iridescent Borders**: Glowing borders that respond to hover states
- **Text Glow Effects**: Cyan and violet text glows for emphasis
- **Smooth Animations**: Fade-in animations, pulse effects, transitions
- **Responsive Design**: Mobile-first approach with proper breakpoints (md, sm, etc.)
- **Navigation Bar**: Sticky navbar with branding and quick links

---

## 📁 Project Structure

```
webacc/
├── public/               # Static assets
├── src/
│   ├── pages/
│   │   ├── Index.tsx     # Home page with products & hero
│   │   ├── Dashboard.tsx # User dashboard with orders
│   │   ├── Deposit.tsx   # Payment page
│   │   └── NotFound.tsx  # 404 page
│   ├── components/
│   │   ├── Navbar.tsx    # Navigation bar
│   │   ├── HeroSlider.tsx        # Hero banner slider
│   │   ├── ProductCard.tsx       # Reusable product display
│   │   ├── SectionHeader.tsx     # Section titles
│   │   └── ui/           # Shadcn/UI components
│   ├── App.tsx           # Main app with routing
│   ├── App.css           # App styles
│   ├── index.css         # Global styles & Tailwind
│   └── main.tsx          # React entry point
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind customization
└── index.html            # HTML entry point
```

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (ultra-fast bundler)
- **Styling**: Tailwind CSS + Shadcn/UI component library
- **Routing**: React Router v6
- **State Management**: React Query (TanStack)
- **Forms**: React Hook Form with Zod validation
- **UI Components**: 30+ Radix UI primitives
- **Icons**: Lucide React
- **Testing**: Vitest
- **Package Manager**: npm / Bun

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or Bun package manager

### Installation

1. **Install dependencies**:

```bash
npm install
# or
bun install
```

2. **Start development server**:

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173` (default Vite port)

### Build for Production

```bash
npm run build
# or
bun run build
```

Optimized build output goes to `dist/` folder.

### Preview Production Build

```bash
npm run preview
# or
bun run preview
```

---

## 📝 Available Scripts

| Command              | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Create optimized production build        |
| `npm run build:dev`  | Build in development mode                |
| `npm run preview`    | Preview production build locally         |
| `npm run lint`       | Run ESLint code quality checks           |
| `npm test`           | Run Vitest test suite once               |
| `npm run test:watch` | Run tests in watch mode                  |

---

## 🎨 Design System

### Color Palette

- **Primary Cyan**: `#00D9FF` (Used for highlights, glows, primary actions)
- **Secondary Purple**: `#B925D1` (Used for accents, alternative highlights)
- **Background**: `#0F0F1A` (Deep cosmic dark)
- **Foreground**: `#E8E8EA` (Light text)
- **Muted**: `#696977` (Muted text)
- **Borders**: `#252532` (Subtle borders)

### Visual Effects

- **Glass Panels**: Semi-transparent backgrounds with backdrop blur
- **Iridescent Borders**: Shimmering border effects on hover
- **Text Glow**: Cyan and violet text shadows for emphasis
- **Animations**: Fade-in, pulse, and smooth transitions
- **Responsive Spacing**: Adaptive padding/margins for all screen sizes

---

## 📱 Pages Overview

### Home (`/`)

- Hero slider with featured products
- Quick statistics cards
- Product showcase for Blox Fruits, Pet Simulator, and Robux
- Call-to-action buttons
- Fully responsive grid layout

### Dashboard (`/dashboard`)

- User account dashboard
- Overview with key metrics
- Order history with status indicators
- Current leveling progress for active games
- Sidebar navigation (desktop) with collapsible menu (mobile)
- Account management section

### Deposit (`/deposit`)

- Payment method selection
- Amount selector with common presets
- QR code display for scanning
- Transaction reference copy button
- Multi-currency support (Vietnamese Dong, Robux, etc.)

### Not Found (`*`)

- 404 error page for undefined routes
- User-friendly error message
- Link back to home

---

## 🔄 Routes

```
/              → Home page (featured products, stats)
/dashboard     → User dashboard
/deposit       → Payment / Deposit page
*              → 404 Not Found page
```

---

## 🚀 Deployment

### Local Development

Already covered in "Getting Started" section above.

### To Host Online

1. Build the project: `npm run build`
2. Upload `dist/` folder to your hosting (Vercel, Netlify, GitHub Pages, etc.)
3. For platforms like Vercel/Netlify, simply connect your Git repo

**Recommended Platforms**:

- **Vercel** (Next-gen hosting for React apps)
- **Netlify** (GitHub integration, auto deployment)
- **GitHub Pages** (Free static hosting)

---

## 📦 Dependencies Highlights

### UI & Components

- **@radix-ui/** - 30+ accessible component primitives
- **shadcn/ui** - Pre-built, customizable components
- **lucide-react** - 1,000+ beautiful icons

### State & Data

- **@tanstack/react-query** - Powerful data fetching and caching
- **@hookform/resolvers** - Form validation resolvers
- **react-router-dom** - Client-side routing

### Utilities

- **clsx** - Dynamic class name combining
- **date-fns** - Date manipulation library
- **embla-carousel-react** - Carousel component

---

## 🛑 Rules for Modifications

To maintain the cosmic vibe and professional design:

1. ✅ **Preserve Visual Style**: Don't modify colors, glows, animations unless explicitly required
2. ✅ **Keep Component Structure**: Don't refactor existing components without approval
3. ✅ **Maintain Responsive Design**: All changes must work on mobile, tablet, and desktop
4. ✅ **Use Existing Component Library**: Leverage Shadcn/UI components first
5. ✅ **Follow Code Patterns**: Match existing code style (TypeScript, React hooks, Tailwind classes)
6. ✅ **Test Before Commit**: Always test changes locally before pushing

---

## 📞 Support & Issues

For questions or issues:

1. Check the existing code comments for context
2. Review Shadcn/UI documentation: https://ui.shadcn.com/
3. Check Tailwind CSS docs: https://tailwindcss.com/
4. Review React documentation: https://react.dev/

---

## � Phase 1 Implementation Status (April 8, 2026)

### ✅ What Was Completed

**Phase 1: Payment System & Admin Dashboard**

- 24 component files created (3,200+ lines of code)
- Payment system with 4 methods: Scratch Card (Thẻ cào), Bank QR, Crypto, ZaloPay
- Shopping cart with coupon system
- Complete admin dashboard (6 views, charts, product/order/user management)
- Firebase integration setup
- TypeScript strict mode, Zustand state management

**Components Added**:

- Admin: AdminLayout, AdminDashboard, ProductsTable, OrdersTable, Analytics, UsersManagement
- Payment: PaymentMethodSelector, ScratchCardPayment, BankQRPayment, CryptoPayment, ZaloPayPayment
- Cart: Cart, CartSummary
- Pages: Checkout, TestPage
- Services: apiClient, scratchCardService, bankQRService
- Stores: cartStore, paymentStore, userStore
- Hooks: useAuth, useCart, usePayment, useLocalStorage
- Utilities: formatters, validators, constants

### 🔧 Recent Fixes Applied

**April 8, 2026 - Fixed Blank Page Issue**:

- Fixed QRCodeSVG import error in BankQRPayment.tsx (was `import QRCode from "qrcode.react"` → now `import { QRCodeSVG } from "qrcode.react"`)
- Production build now succeeds (npm run build ✅)
- Dev server running on port 8081 ✅
- Organized Phase 1 documentation into `logs/phase1/` folder for better file organization

**Files organized**:

- Moved PHASE1_COMPLETED.md, PHASE1_READY.md, NAVIGATION_GUIDE.md, FINAL_SUMMARY.md, FILE_MANIFEST.md → `logs/phase1/`
- Kept core documentation in root: QUICK_START.md, IDEA.md, PHASE_TRACKER.md, etc.

### ⚠️ Known Issues to Fix

**Priority**: These need manual fixes before continuing to Phase 2

1. **Component Imports & Implementation**
   - Some phase 1 components may have partial implementation
   - Need to verify all imports are correct and components render
   - TestPage available at `/test` for debugging

2. **Data/API Integration**
   - Mock data currently in use
   - Real payment API endpoints need to be configured
   - Firebase database schema needs finalization

3. **UI/UX Polish**
   - Some components may need styling adjustments
   - Responsive design needs mobile testing
   - Animation/transition timing may need tweaking

### 📁 Documentation Location

**For Phase 1 Details**: See `logs/phase1/` folder

- PHASE1_LOG.md - Main tracking log
- PHASE1_COMPLETED.md - Detailed completion report
- NAVIGATION_GUIDE.md - Component URLs and routes
- FINAL_SUMMARY.md - Executive summary
- FILE_MANIFEST.md - All files list

**For Troubleshooting**:

- TROUBLESHOOTING_BLANK_PAGE.md - Debug guide
- QUICK_FIX_BLANK_PAGE.md - Quick action steps

### 🚀 Next Steps

**PAUSED**: All phases are on hold pending manual review and fixes

- Please review Phase 1 implementation
- Identify what needs correction
- Create issues/tasks for remaining work
- Ready to continue when approved

### 🔐 Git & Deployment

**Latest Commit**: Phase 1 implementation with QRCode fix and file reorganization

- Commit ID: 13eabb3
- Changes: 46 files changed, 8617 insertions
- Status: Ready to push to GitHub (requires authentication)

**To Push Changes**:

```bash
git push origin main
# Note: May require GitHub authentication (SSH key or Personal Access Token)
```

---

## 📄 License

This project was generated with Lovable and customized for Holo - Cosmic Glow platform.

---

**Last Updated**: April 8, 2026  
**Version**: 1.0.0 (Phase 1 Complete but needs review & fixes)  
See [logs/phase1/PHASE1_LOG.md](./logs/phase1/PHASE1_LOG.md) for implementation details.
See [DOCUMENTATION_LOG.md](./DOCUMENTATION_LOG.md) for additional logs.
