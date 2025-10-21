import SimData from '../../types/simdata';
import axiosInstance from './axios.config';

const SimDataApi: SimData.SimDataAPI = {
	randomSim: async () => {
		return axiosInstance.get('/bss/app/get-random-msisdn').then(res => res.data);
	},
	getPackagesByMsisdnId: async msisdn_id => {
		return axiosInstance.get(`/bss/app/get-package-by-msisdn/${msisdn_id}`).then(res => res.data);
	},
	getListSim: async param => {
		return axiosInstance.post('/bss/app/get-phone-numbers', param).then(res => res.data);
	},

}

export default SimDataApi;