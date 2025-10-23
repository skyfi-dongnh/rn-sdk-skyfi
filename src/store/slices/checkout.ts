import { create } from "zustand";

interface SimCheckout {
    data: Array<Checkout.ProductCheckout>;
    setData: (data: Array<Checkout.ProductCheckout>) => void;

}

export const useSimCheckoutStore = create<SimCheckout>((set) => ({
    data: [],
    setData: (data: Array<Checkout.ProductCheckout>) => set({ data })
}));