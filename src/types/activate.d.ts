namespace Activate {
  interface ActivateAPI {
    infoIccd(param: ParamInfoIccd): Promise<Response<InfoIccdResult>>;
    checkSim(param: ParamCheckSim): Promise<Response<{checkExist: boolean}>>;
    getKycFront(
      image_front_base64: string,
    ): Promise<Response<ResponseKycFront>>;
    checkIsCanRegisterSim(id: string): Promise<Response<any>>;
    getKycOcr(
      image_front_base64: string,
      image_back_base64: string,
    ): Promise<Response<ResponseKycFront>>;
    getFaceMatch(
      image_front_base64: string,
      image_face_base64: string,
    ): Promise<Response<ResponseFaceMatch>>;
    saveLogVideoCall(param: paramSaveLog): Promise<Response<ResponseSaveLogVideoCall>>;
    getContract(
      param: Omit<paramSaveLog, 'img1' | 'img2' | 'img3' | 'img4'>,
    ): Promise<Response<string>>;
    saveVideoNoTeller(param: FormData): Promise<Response<any>>;
  }

  interface ParamInfoIccd {
    barcode: string;
  }
  interface Response<T> {
    requestId: string | null;
    code: number;
    message: string;
    result: T | null;
    extra: null;
  }
  interface InfoIccdResult {
    iccid: string;
    imsi: string;
    status_msisdn: string;
    msisdn: string;
  }

  interface paramSaveLog {
    phone: string;
    isUpdate: boolean;
    agentCode: any;
    videoSource: string | null;
    img1: string | null;
    img2: string | null;
    img3: string | null;
    img4: string | null;
    seri: string | null;
    object: string | null;
    card_type: string;
    expired_date: string;
    idNumber: string | null;
    passport: string | null;
    fullName: string;
    birthDay: string | null;
    gender: 'Male' | 'Female' | null;
    address: string | null;
    issueDate: string;
    issuePlace: string;
    international: string;
    contactPhone: string | null;
    homeTown: string | null;
    city_code: string | null;
    faceMatching: number;
    imsi: string | null;
    sob: string | null;
    district_code: string | null;
    ward_code: string | null;
  }
  interface ParamCheckSim {
    iccid: string;
    msisdn: string;
  }

  interface ResponseKycFront {
    address: string;
    address_detail: AddressDetail;
    address_score: string;
    card_type: string;
    dob: string;
    dob_score: string;
    expired_date: string;
    expired_date_score: string;
    fake_class: any;
    fake_score: any;
    front_or_back: string;
    gender: string;
    gender_score: string;
    idnumber: string;
    idnumber_score: string;
    img_category_id: string;
    img_category_name: string;
    img_size_valid: boolean;
    issue_date: string;
    issue_date_score: string;
    issued_place: string;
    issued_place_score: string;
    name: string;
    name_score: string;
    nationality: string;
    nationality_score: string;
    place_of_origin: string;
    place_of_origin_detail: PlaceOfOriginDetail;
    place_of_origin_score: string;
  }

  interface AddressDetail {
    address: string;
    city: City;
    district: District;
    ward: Ward;
  }

  interface City {
    city_code: string;
    city_name: string;
    original_city: string;
  }

  interface District {
    district_code: string;
    district_name: string;
    original_district: string;
  }

  interface Ward {
    original_ward: string;
    ward_code: string;
    ward_name: string;
  }

  interface PlaceOfOriginDetail {
    address: string;
    city: City2;
    district: District2;
    ward: Ward2;
  }

  interface City2 {
    city_code: string;
    city_name: string;
    original_city: string;
  }

  interface District2 {
    district_code: string;
    district_name: string;
    original_district: string;
  }

  interface Ward2 {
    original_ward: string;
    ward_code: string;
    ward_name: string;
  }

  interface ResponseFaceMatch {
    face_match: string;
    face_score: number;
  }

  interface ResponseSaveLogVideoCall {
    phone: string;
    id: string;
    detail_id: number;
  }
}
export default Activate;
