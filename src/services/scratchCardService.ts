import { ScratchCardPayload, ScratchCardResponse } from "@/types/payment";
import apiClient from "./apiClient";

// Mock responses for different scenarios
const MOCK_RESPONSES = {
  success: {
    success: true,
    amount: 50000,
    message: "Nạp tiền thành công",
    transactionId: `TXN-${Date.now()}`,
    provider: "vina" as const,
    timestamp: Date.now(),
  },
  invalidPin: {
    success: false,
    message: "Mã PIN không đúng",
    timestamp: Date.now(),
  },
  invalidSerial: {
    success: false,
    message: "Serial thẻ không đúng",
    timestamp: Date.now(),
  },
  expiredCard: {
    success: false,
    message: "Thẻ đã hết hạn",
    timestamp: Date.now(),
  },
  usedCard: {
    success: false,
    message: "Thẻ đã được sử dụng",
    timestamp: Date.now(),
  },
};

/**
 * Validate scratch card with mock/real API
 * Currently uses mock data. Replace with real VietQR API when ready.
 */
export async function validateScratchCard(
  payload: ScratchCardPayload,
): Promise<ScratchCardResponse> {
  try {
    // Mock validation logic for demo
    const { serial, pin } = payload;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation
    if (serial === "0000 0000 0000 0000" || pin === "0000 0000") {
      return MOCK_RESPONSES.invalidPin;
    }

    if (serial.length < 16) {
      return MOCK_RESPONSES.invalidSerial;
    }

    // 90% success rate for demo
    const isSuccess = Math.random() < 0.9;

    if (isSuccess) {
      return {
        ...MOCK_RESPONSES.success,
        amount: payload.amount,
        provider: payload.provider,
      };
    }

    // Return random error
    const errors = [
      MOCK_RESPONSES.invalidPin,
      MOCK_RESPONSES.expiredCard,
      MOCK_RESPONSES.usedCard,
    ];
    return errors[Math.floor(Math.random() * errors.length)];

    // TODO: Replace mock with real API call below:
    /*
    const response = await apiClient.post<ScratchCardResponse>(
      '/api/payment/scratch-card',
      payload
    );
    
    return response.data;
    */
  } catch (error) {
    console.error("Scratch card validation error:", error);
    return {
      success: false,
      message: "Lỗi kết nối. Vui lòng thử lại.",
      timestamp: Date.now(),
    };
  }
}

/**
 * Get supported card providers and their denominations
 */
export function getCardProviders() {
  return [
    {
      id: "vina",
      name: "Vinaphone",
      icon: "📱",
      denominations: [10000, 20000, 30000, 50000, 100000],
    },
    {
      id: "mobi",
      name: "Mobifone",
      icon: "📱",
      denominations: [10000, 20000, 30000, 50000, 100000],
    },
    {
      id: "viettel",
      name: "Viettel",
      icon: "📱",
      denominations: [10000, 20000, 30000, 50000, 100000],
    },
  ];
}

/**
 * Format card amount to VND
 */
export function formatCardAmount(amount: number): string {
  return `${amount.toLocaleString("vi-VN")}₫`;
}
