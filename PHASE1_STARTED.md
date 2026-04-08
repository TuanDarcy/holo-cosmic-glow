# 🔥 PHASE 1: SETUP & PAYMENT SYSTEM - STARTED

**Status**: 🟢 IN PROGRESS  
**Start Time**: April 8, 2026  
**Estimated Duration**: 2-3 hours

---

## 📋 CONFIRMED REQUIREMENTS

```
✅ API Approach: MOCK (Option A)
✅ Authentication: Firebase
✅ Database: Deploy-ready (Firebase Realtime DB)
✅ Admin: Include in Phase 1 (Option A)
✅ Payment Focus:
   1. Thẻ cào (nhà mạng) + 3rd party API validation
   2. Bank QR (VietQR.io API)
   3. Backup: Crypto, Zalo Pay (mock)
```

---

## 🔐 FIREBASE SETUP REQUIREMENTS

### **What You Need to Do (Right Now):**

#### **Step 1: Create Firebase Project**

```
1. Go to: https://console.firebase.google.com/
2. Click "+ Add project"
3. Project name: "holo-cosmic-glow"
4. Select region: Singapore (closest to Vietnam)
5. Create
```

#### **Step 2: Enable Services**

```
Left sidebar → Build:
□ Authentication
  → Enable "Email/Password"
  → Enable "Anonymous" (optional, for guests)

□ Realtime Database
  → Create database
  → Choose region: asia-southeast1 (Singapore)
  → Security rules: Start in test mode (for dev)

□ Firestore (alternative to Realtime DB - optional)
  → Create database
  → Same region
```

#### **Step 3: Get Config**

```
Project Settings (⚙️ icon) →
Your apps →
Select web app (or create if not exist) →

Copy these values:
- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId

→ Save in: .env.local file
```

#### **Step 4: Security Rules** (for test mode)

```json
// Realtime Database Rules
{
  "rules": {
    ".read": "auth != null || true",
    ".write": "auth != null || true"
  }
}
```

---

## 📝 FIREBASE CONFIG FILE

### **What I'll Create**

Create file: `d:\code\webacc\.env.local`

```env
VITE_FIREBASE_API_KEY=YOUR_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

# Payment APIs (Mock for now, real keys later)
VITE_VIETQR_API_KEY=mock_key_vietqr
VITE_SCRATCH_CARD_API_KEY=mock_key_scratch
VITE_ZALO_PAY_KEY=mock_key_zalopay
```

---

## 🛠️ DEPENDENCIES TO ADD

```bash
npm install \
  firebase \
  zustand \
  react-hook-form \
  zod \
  axios \
  react-icons \
  qrcode.react \
  recharts \
  date-fns
```

---

## 📁 FOLDER STRUCTURE TO CREATE

```
src/
├── config/
│   └── firebase.ts              (Firebase initialization)
│
├── components/
│   ├── payment/
│   │   ├── PaymentMethodSelector.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── ScratchCardPayment.tsx      ⭐ PRIMARY
│   │   ├── BankQRPayment.tsx           ⭐ PRIMARY
│   │   ├── CryptoPayment.tsx           (backup/mock)
│   │   ├── ZaloPayPayment.tsx          (backup/mock)
│   │   ├── PaymentProcessing.tsx
│   │   ├── PaymentSuccess.tsx
│   │   └── PaymentError.tsx
│   │
│   ├── cart/
│   │   ├── Cart.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── Checkout.tsx
│   │
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── ProductsTable.tsx
│   │   ├── OrdersTable.tsx
│   │   └── Analytics.tsx
│   │
│   └── common/
│       └── CouponInput.tsx
│
├── hooks/
│   ├── useCart.ts
│   ├── usePayment.ts
│   ├── useAuth.ts
│   └── useLocalStorage.ts
│
├── stores/
│   ├── cartStore.ts
│   ├── paymentStore.ts
│   ├── userStore.ts
│   └── filterStore.ts
│
├── services/
│   ├── firebase.ts
│   ├── apiClient.ts
│   ├── paymentService.ts
│   ├── scratchCardService.ts    ⭐ PRIMARY
│   ├── bankQRService.ts         ⭐ PRIMARY (VietQR)
│   ├── cryptoService.ts
│   └── zaloPay.ts
│
├── types/
│   ├── payment.ts
│   ├── product.ts
│   ├── user.ts
│   └── admin.ts
│
└── utils/
    ├── formatters.ts
    ├── validators.ts
    └── constants.ts
```

---

## 🎯 PHASE 1 BREAKDOWN

### **Section 1: Firebase Setup** (~30 mins)

```
✓ firebase.ts - Initialize Firebase
✓ .env.local - Store credentials
✓ useAuth.ts - Auth hook (mock + real)
✓ Create test users
```

### **Section 2: State Management** (~20 mins)

```
✓ cartStore.ts - Cart management
✓ paymentStore.ts - Payment state
✓ userStore.ts - User state
✓ filterStore.ts - Filter state
```

### **Section 3: Payment - Scratch Card** (~40 mins) ⭐

```
✓ scratchCardService.ts
  - Provider selection (Vina/Mobi/Viettel)
  - Serial + PIN validation
  - Mock 3rd party API integration
  - Response: success/invalid/expired

✓ ScratchCardPayment.tsx
  - Provider selector (radio buttons)
  - Serial input (masked)
  - PIN input (masked)
  - Amount converter (card → VND)
  - Submit button
  - Loading state
  - Error handling
```

### **Section 4: Payment - Bank QR** (~40 mins) ⭐

```
✓ bankQRService.ts
  - Integrate VietQR API
  - Generate QR code
  - Bank selection
  - Amount input
  - Transaction tracking

✓ BankQRPayment.tsx
  - Bank selector dropdown
  - Amount input
  - QR code display
  - Copy account number button
  - Transaction reference
  - Status tracking (pending/paid)
```

### **Section 5: Payment - Backup Methods** (~30 mins)

```
✓ CryptoPayment.tsx (mock BTC, ETH, USDT)
✓ ZaloPayPayment.tsx (mock Zalo Pay)
✓ PaymentMethodSelector.tsx (tab interface)
✓ PaymentForm.tsx (dynamic form)
```

### **Section 6: Shopping Cart** (~30 mins)

```
✓ cartStore.ts (Zustand store)
✓ Cart.tsx (display items)
✓ CartSummary.tsx (totals + coupon)
✓ Checkout.tsx (multi-step flow)
```

### **Section 7: Admin Dashboard** (~40 mins)

```
✓ AdminLayout.tsx (sidebar + main)
✓ AdminDashboard.tsx (KPI cards + charts)
✓ ProductsTable.tsx (grid view)
✓ OrdersTable.tsx (order tracking)
✓ Analytics.tsx (revenue + charts)
```

### **Section 8: Integration & Polish** (~20 mins)

```
✓ Updated pages/Checkout.tsx
✓ Updated Navbar.tsx (cart icon)
✓ Type definitions
✓ Utilities & formatters
✓ Error boundaries
```

---

## 📊 PAYMENT FLOW (DETAILED)

### **Scratch Card Flow**

```
User → Select Payment
   ↓
Choose "Thẻ Cào"
   ↓
Select Provider (Vina/Mobi/Viettel)
   ↓
Input Serial (16 digits, masked)
   ↓
Input PIN (Code on card, masked)
   ↓
Show conversion: "Card 50k = 50,000₫"
   ↓
Click [Xác Nhận Thanh Toán]
   ↓
API Call → 3rd party validates
   ↓
Response:
   ✅ SUCCESS → Card amount credited, order complete
   ❌ INVALID SERIAL → Show error "Serial sai"
   ❌ INVALID PIN → Show error "Mã PIN sai"
   ❌ USED CARD → Show error "Thẻ đã sử dụng"
   ❌ EXPIRED → Show error "Thẻ hết hạn"
```

### **Bank QR Flow**

```
User → Select Payment
   ↓
Choose "Bank QR"
   ↓
Select Bank (MB, Agribank, Vietcombank, etc.)
   ↓
Display Bank Account Holder: "HOLO COSMIC SHOP"
   ↓
Generate QR Code (VietQR.io API)
   ↓
Show:
   - QR Code image
   - Account: 1234567890
   - Amount: 450,000₫
   - Ref: HK-2024-00123
   ↓
[Sao chép số tài khoản] [Tôi đã chuyển rồi]
   ↓
User transfers money from bank
   ↓
System checks webhook/callback
   ↓
✅ Money received → Order complete
⏳ Waiting... (30s timeout, then manual confirm)
```

---

## 🔧 MOCK DATA STRUCTURE

### **Scratch Card Response (Mock)**

```typescript
interface ScratchCardResponse {
  success: boolean;
  amount: number;        // 10000, 20000, etc.
  message: string;
  transactionId: string;
  provider: 'vina' | 'mobi' | 'viettel';
  timestamp: number;
}

// Mock examples:
{
  success: true,
  amount: 50000,
  message: "Nạp tiền thành công",
  transactionId: "SC-2024-001234",
  provider: "vina",
  timestamp: Date.now()
}

{
  success: false,
  amount: 0,
  message: "Mã PIN không đúng",
  transactionId: null,
  provider: "mobi",
  timestamp: Date.now()
}
```

### **Bank QR Response (Mock/Real)**

```typescript
interface BankQRResponse {
  success: boolean;
  qrCode: string;        // QR code image data/URL
  accountNumber: string;
  accountName: string;
  amount: number;
  reference: string;
  expiresIn: number;     // seconds
  status: 'pending' | 'paid' | 'timeout';
}

// VietQR.io API response mock
{
  status: 00,
  data: {
    qrDataURL: "data:image/png;base64,...",
    qrCode: "00020101021238550010A000000727...",
    accountNumber: "1234567890",
    accountName: "HOLO COSMIC SHOP",
    amount: 450000,
    addInfo: "HK-2024-00123",
    countDown: 300
  }
}
```

---

## 🛑 IMPORTANT: Before I Code

**CONFIRM THESE:**

### **Firebase Setup:**

```
Have you created Firebase project yet?
A) Yes, I have API keys ready → Give me the keys
B) No, I'll create now → Wait 10 mins for me
C) Can you help me setup? → I'll guide you step by step
```

### **VietQR Integration:**

```
For Bank QR, should I:
A) Use VietQR Mock (fake QR, just for demo)
B) Integrate real VietQR.io API
   → You provide API key later
C) Other bank QR provider?
```

### **Scratch Card 3rd Party:**

```
Currently I'll mock it, but later need:
A) Which service to use? (VTPass, Nganluong, etc.)
B) You'll provide API key when ready
C) Just keep it mock for now
```

---

## ✅ READY TO START?

**Before I code, tell me:**

```
1. Firebase: Have keys or need help?
   [ ] Have keys → Send me
   [ ] Need help → I guide
   [ ] Not setup yet → Wait 10 mins

2. Bank QR: Use real or mock?
   [ ] Real VietQR API
   [ ] Mock for now

3. Scratch Card: Use real or mock?
   [ ] Real provider
   [ ] Mock for now
```

Once you confirm, I'll code immediately - all 18-22 files, 2-3 hours non-stop.

---

**STATUS**: Waiting for Firebase confirmation  
**Next**: Start coding Phase 1
