import { create } from "zustand";
import { PaymentTransaction, PaymentMethod } from "@/types/payment";

interface PaymentState {
  currentMethod?: PaymentMethod;
  transaction?: PaymentTransaction;
  loading: boolean;
  error?: string;
  setPaymentMethod: (method: PaymentMethod) => void;
  setTransaction: (transaction: PaymentTransaction) => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
  clear: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  currentMethod: undefined,
  transaction: undefined,
  loading: false,
  error: undefined,

  setPaymentMethod: (method: PaymentMethod) => {
    set({ currentMethod: method, error: undefined });
  },

  setTransaction: (transaction: PaymentTransaction) => {
    set({ transaction });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error?: string) => {
    set({ error });
  },

  clear: () => {
    set({
      currentMethod: undefined,
      transaction: undefined,
      loading: false,
      error: undefined,
    });
  },
}));
