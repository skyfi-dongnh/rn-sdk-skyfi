

namespace SimData {
	interface SimDataAPI {
		randomSim: () => Promise<Response<SimCard[]>>;
		getPackagesByMsisdnId: (msisdn_id: number) => Promise<Response<Package[]>>;
		getListSim: (param: ParamListSim) => Promise<Response<SimCard[]>>;
	}

	interface Response<T> {
		requestId: string | null;
		code: number;
		message: string;
		result: T | null;
		extra: null;
	}
	interface SimCard {
		msisdn_id: number;
		msisdn: string;
		name: string;
		base_price: number;
		sale_price: number;
		product_id: number;
		variant_id: number;
		usim_price: number;
		esim_price: number;
		network_price: number;
		packages: Package[];
	}

	interface Package {
		code: string;
		name: string;
		cycle: string;
		is_main: number;
		price: number;
		brief: string;
		data_per_day: number;
		data_per_month: number;
		is_outstanding: number;
		index: number;
		sale_price: number;
		status: number;
		arr_reg_code: string;
		on_buy_sim: number;
		reg_code_tkc: string;
		reg_code_0d: string;
		description_detail: string;
		id: number;
		is_internal_package: number;
		free_call_minute: number;
		free_sms: number;
		validity_day: number;
		is_default: number;
		bhm_createsub: null;
		data_day_unit: string;
		data_month_unit: string;
		type: string;
		discount_percent: number;
		description: string[];
	}

	interface ParamListSim {
		filters: Filters;
		page: number;
		pageSize: number;
	}

	interface Filters {
		search: string;
	}

	type SimType =
		'USIM' |
		'ESIM';
}

export default SimData;