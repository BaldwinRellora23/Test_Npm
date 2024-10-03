import CryptoJS from "crypto-js";

const EncyptionKey = "@S+P3+3rDm1sK3y$";
const EncyptionIV = "@S+P3+3rDm1sIvKy";

const encodeToBase64 = (text: string) => {
  return btoa(text);
};

export const encryptData = (plainText: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(plainText),
    CryptoJS.enc.Base64.parse(encodeToBase64(EncyptionKey)),
    {
      iv: CryptoJS.enc.Base64.parse(encodeToBase64(EncyptionIV)),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};
export const decryptData = (cipherText: string) => {
  const decrypted = CryptoJS.AES.decrypt(
    cipherText,
    CryptoJS.enc.Base64.parse(encodeToBase64(EncyptionKey)),
    {
      iv: CryptoJS.enc.Base64.parse(encodeToBase64(EncyptionIV)),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);
  return decryptedText;
};
