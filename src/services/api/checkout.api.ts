import axiosInstance from "./axios.config";

const CheckoutService: Checkout.CheckoutAPI = {
    getCities: async () => axiosInstance.get('/bss/app/get-cities').then(res => res.data),
    getDistricts: async () => axiosInstance.get(`/bss/app/get-districts`).then(res => res.data),
    getWards: async () => axiosInstance.get('/bss/app/get-wards').then(res => res.data),
    createOrder: async (checkoutInfo) => axiosInstance.post('/bss/app/create-order', checkoutInfo).then(res => res.data),
};

export default CheckoutService;