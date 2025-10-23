import { simPriceTotal } from './price';

export function toCurrency(price: number, currency = 'VND') {
  // check if price is a number
  if (isNaN(price)) {
    return '0 ' + currency;
  }
  return price?.toLocaleString('vi') + currency;
}
export function toNumber(price: number) {
  return price.toLocaleString('vi') + '';
}
export function formatPhoneNumber(phoneNumber: string) {
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  const formattedNumber = cleanedNumber.replace(
    /(\d{4})(\d{3})(\d{3})/,
    '$1 $2 $3',
  );

  return formattedNumber;
}

export const convertSimDataToCheckoutItem = (
  sim: SimData.SimCard,
  simPackage: SimData.Package,
  simType: SimData.SimType,
): Checkout.ProductCheckout => {
  let sim_price = simType == 'USIM' ? sim.usim_price : sim.esim_price;
  let total = simPriceTotal(sim, simType, simPackage.sale_price);
  return {
    product_name: sim.msisdn,
    sim_type: simType,
    pack_code: simPackage.code,
    base_price: sim.base_price,
    sale_price: sim.sale_price,
    quantity: 1,
    pack_price: simPackage.sale_price,
    sim_price: sim_price,
    msisdn_id: sim.msisdn_id,
    product_id: sim.product_id,
    total_price: total.sale_price,
    total_base_price: total.base_price,
  };
};
