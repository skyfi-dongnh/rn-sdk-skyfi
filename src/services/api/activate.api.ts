import Activate from "../../types/activate";
import axiosInstance from "./axios.config";

const ActivateApi: Activate.ActivateAPI = {
	infoIccd: async (param) => {
		return axiosInstance.post('/bss/videocall/get-info-from-iccd', param).then(res => res.data);
	}
};
export default ActivateApi;