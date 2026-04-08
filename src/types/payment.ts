// Payment related types
export type PaymentMethod =
  | "scratch-card"
  | "bank-qr"
  | "crypto"
  | "zalo-pay"
  | "momo";
export type CardProvider = "vina" | "mobi" | "viettel";
export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";
export type CryptoType = "bitcoin" | "ethereum" | "usdt";

export interface PaymentTransaction {
  id: string;
  orderId: string;
  userId: string;
  method: PaymentMethod;
  amount: number;
  currency: "VND" | "USD";
  status: "pending" | "completed" | "failed";
  transactionId?: string;
  reference?: string;
  createdAt: number;
  updatedAt: number;
  metadata?: {
    provider?: CardProvider;
    bankCode?: string;
    walletAddress?: string;
  };
}

export interface ScratchCardPayload {
  provider: CardProvider;
  serial: string;
  pin: string;
  amount: number;
}

export interface ScratchCardResponse {
  success: boolean;
  amount?: number;
  message: string;
  transactionId?: string;
  provider?: CardProvider;
  timestamp: number;
}

export interface BankQRPayload {
  bankCode: string;
  amount: number;
  description?: string;
}

export interface BankQRResponse {
  success: boolean;
  qrDataURL?: string;
  accountNumber?: string;
  accountName?: string;
  amount?: number;
  reference?: string;
  expiresIn?: number;
  status?: "pending" | "paid" | "timeout";
  message?: string;
}

export interface CryptoPayload {
  cryptoType: CryptoType;
  amount: number;
  usdValue: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentTransaction?: PaymentTransaction;
  couponCode?: string;
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
  loyaltyPoints: number;
  loyaltyTier: "bronze" | "silver" | "gold" | "diamond";
  createdAt: number;
  updatedAt: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
