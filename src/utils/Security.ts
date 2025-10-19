import CryptoJS from 'crypto-js';

const HASH_KEY = 'c2t5ZmkyMDI1'; // Thay bằng key thực tế

export class Security {
  static hashSecureCode(password: string): string {
    const hmac = CryptoJS.HmacSHA256(password, HASH_KEY);
    return hmac.toString(CryptoJS.enc.Hex);
  }
}

export default Security;
