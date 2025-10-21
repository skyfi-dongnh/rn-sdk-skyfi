import SimData from "../types/simdata.d";

export const simPriceTotal = ( sim:SimData.SimCard, simType: SimData.SimType, packPrice: number ) => {
	return {
		base_price: basePriceSim( sim, simType ) + packPrice,
		sale_price: priceSim( sim, simType ) + packPrice,
	};

};
export const priceSim = (sim: SimData.SimCard, simType: SimData.SimType = 'USIM') => {
	return simType === 'USIM' ?
		sim.sale_price + sim.usim_price + sim.network_price :
		sim.sale_price + sim.esim_price + sim.network_price;


};
export const basePriceSim = ( sim: SimData.SimCard, simType: SimData.SimType = 'USIM' ) => {
	return simType === 'USIM' ?
		sim.base_price + sim.usim_price + sim.network_price :
		sim.base_price + sim.esim_price + sim.network_price;
};