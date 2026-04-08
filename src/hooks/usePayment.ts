import { usePaymentStore } from '@/stores/paymentStore';

export function usePayment() {
  return usePaymentStore();
}
