import CryptoJS from "crypto-js";

const secretKey = "your_secret_key"; // Replace with your secret key

// Encrypt function
export function encryptData(data) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
  return ciphertext.toString();
}

// Decrypt function
export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
