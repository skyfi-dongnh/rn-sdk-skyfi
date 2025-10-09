namespace Activate {
	interface ActivateAPI {
		infoIccd(param: ParamInfoIccd): Promise<Response<InfoIccdResult>>;
	}

	interface ParamInfoIccd {
		barcode: string;
	}
	interface Response<T> {
		requestId: string | null;
		code: number;
		message: string;
		result: T | null;
		extra: null
	}
	interface InfoIccdResult {
		iccid: string,
		imsi: string,
		status_msisdn: string,
		msisdn: string

	}
}
export default Activate;