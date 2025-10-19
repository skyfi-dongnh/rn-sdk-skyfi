import Activate from '../../types/activate';
import axiosInstance from './axios.config';

const configVideoCall = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1QgZm9yIGFwb3RhIiwiaWF0IjoxNjkzMTg0MjYwLCJleHAiOjE3MjQ3MjAyNjAsImF1ZCI6InJhci5pZGNoZWNrLmNvbS52biIsInN1YiI6ImFwb3RhQGlkY2hlY2suZGV2IiwiUm9sZSI6Ik1hbmFnZXIifQ.aqrv1yApu2S-p53dZnhQLFLVShD92Xn5-1AmHpXE5RU',
};
const baseURL = 'https://ocr-api-uat.ekyc.solutions/api';

const ActivateApi: Activate.ActivateAPI = {
  infoIccd: async param => {
    return axiosInstance
      .post('/bss/videocall/get-info-from-iccd', param)
      .then(res => res.data);
  },
  checkSim: async param => {
    return axiosInstance
      .post('/bss/videocall/check-sim-exist', param)
      .then(res => res.data);
  },
  getKycFront: async image_front_base64 => {
    return axiosInstance
      .post(
        '/ekyc/v1/front',
        {image_front_base64},
        {
          headers: configVideoCall,
          baseURL: baseURL,
        },
      )
      .then(res => res.data);
  },
  checkIsCanRegisterSim: async id => {
    return axiosInstance
      .post(`/bss/videocall/check-number-sim-registered`, {id_number: id})
      .then(res => res.data);
  },
  getKycOcr: async (image_front_base64, image_back_base64) => {
    return axiosInstance
      .post(
        '/ekyc/v1/ocr',
        {image_front_base64, image_back_base64},
        {
          headers: configVideoCall,
          baseURL: baseURL,
        },
      )
      .then(res => res.data);
  },
  getFaceMatch: async (image_front_base64, image_face_base64) => {
    return axiosInstance
      .post(
        '/ekyc/v1/face_matching',
        {image_front_base64, image_face_base64},
        {
          headers: configVideoCall,
          baseURL: baseURL,
        },
      )
      .then(res => res.data);
  },
  saveLogVideoCall: async param => {
    return axiosInstance
      .post('/bss/videocall/save-log-video-call', param)
      .then(res => res.data);
  },
  getContract: async param => {
    return axiosInstance
      .post('/bss/videocall/get_img4_app', param)
      .then(res => res.data);
  },
  saveVideoNoTeller: async param => {
    return axiosInstance
      .post('/bss/videocall/save-video-busy', param, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

  },
};
export default ActivateApi;
