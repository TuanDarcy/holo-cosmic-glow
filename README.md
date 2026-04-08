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

## 📄 License

This project was generated with Lovable and customized for Holo - Cosmic Glow platform.

---

**Last Updated**: April 8, 2026  
**Version**: 1.0.0  
See [DOCUMENTATION_LOG.md](./DOCUMENTATION_LOG.md) for implementation details.
