import { BankQRPayload, BankQRResponse } from "@/types/payment";
import apiClient from "./apiClient";

// Mock VietQR response
const MOCK_QR_RESPONSE = {
  success: true,
  qrDataURL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  accountNumber: "1234567890",
  accountName: "HOLO COSMIC SHOP",
  amount: 100000,
  reference: `HK-${Date.now()}`,
  expiresIn: 300,
  status: "pending" as const,
};

/**
 * Generate Bank QR code using VietQR API
 * Currently returns mock QR. Will integrate real VietQR.io API when ready.
 */
export async function generateBankQR(
  payload: BankQRPayload,
): Promise<BankQRResponse> {
  try {
    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response with payload data
    return {
      ...MOCK_QR_RESPONSE,
      amount: payload.amount,
      reference: `HK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };

    // TODO: Replace mock with real VietQR API call:
    /*
    const response = await apiClient.post<BankQRResponse>(
      '/api/payment/bank-qr',
      payload
    );
    
    return response.data;
    */
  } catch (error) {
    console.error("Bank QR generation error:", error);
    return {
      success: false,
      message: "Lỗi tạo mã QR. Vui lòng thử lại.",
    };
  }
}

/**
 * Check payment status for Bank QR
 */
export async function checkBankQRStatus(
  reference: string,
): Promise<BankQRResponse> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock: 50% chance payment received
    const isReceived = Math.random() < 0.5;

    return {
      success: isReceived,
      status: isReceived ? "paid" : "pending",
      reference,
      message: isReceived ? "Thanh toán thành công" : "Đang chờ thanh toán",
    };

    // TODO: Replace with real API:
    /*
    const response = await apiClient.get<BankQRResponse>(
      `/api/payment/bank-qr/status/${reference}`
    );
    
    return response.data;
    */
  } catch (error) {
    console.error("Bank QR check status error:", error);
    return {
      success: false,
      message: "Lỗi kiểm tra trạng thái.",
    };
  }
}

/**
 * Get supported banks for QR payments
 */
export function getSupportedBanks() {
  return [
    { code: "MB", name: "MB Bank", icon: "🏦", logo: "mb" },
    { code: "VCB", name: "Vietcombank", icon: "🏦", logo: "vcb" },
    { code: "TCB", name: "Techcombank", icon: "🏦", logo: "tcb" },
    { code: "BID", name: "BIDV", icon: "🏦", logo: "bid" },
    { code: "CTG", name: "Agribank", icon: "🏦", logo: "ctg" },
    { code: "SHB", name: "SHB", icon: "🏦", logo: "shb" },
    { code: "ACB", name: "ACB", icon: "🏦", logo: "acb" },
  ];
}

/**
 * Format account number for display
 */
export function formatAccountNumber(accountNumber: string): string {
  return accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
}
