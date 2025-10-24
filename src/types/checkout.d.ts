
namespace Checkout {
  interface CheckoutAPI {
    getCities: () => Promise<Response<{cities: City[]}>>;
    getDistricts: () => Promise<Response<{districts: District[]}>>;
    getWards: () => Promise<Response<{wards: Ward[]}>>;
    createOrder: (checkoutInfo: CheckoutInfo) => Promise<Response<{order_number: string}>>;
    getLinkPayment: (params: ParamsGetLinkPayment) => Promise<Response<{redirectUrl: string}>>;
  }
  interface Response<T> {
    requestId: string | null;
    code: number;
    message: string;
    result: T | null;
    extra: null;
  }
  interface City {
    id: number;
    name: string;
    index: number;
  }

  interface District {
    id: number;
    name: string;
    city_id: number;
    index: number;
  }

  interface Ward {
    id: number;
    name: string;
    district_id: number;
  }

  interface ParamsGetLinkPayment {
    locale: string;
    orderNumber: string;
  }

  interface CheckoutInfo {
    delivery_address?: string;
    payment_method?: string;
    discount_amount?: number;
    shipping_amount?: number;
    contact_phone?: string;
    email?: string;
    city_id?: number;
    district_id?: number;
    ward_id?: number;
    created_by?: string;
    customer_name?: string;
    total_amount?: number;
    items?: ProductCheckout[];
  }

  interface ProductCheckout {
    product_id?: number;
    variant_id?: number;
    msisdn_id?: number;
    pack_price?: number;
    sim_price?: number;
    sale_price?: number;
    quantity?: number;
    sim_type?: string;
    pack_code?: string;
    product_name?: string;
    base_price?: number;
    total_price?: number;
    total_base_price?: number;
  }
}
