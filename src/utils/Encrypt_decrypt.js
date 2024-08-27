
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

function encrypt(data) {
  const cipherText = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  return cipherText;
}
function decrypt(data) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
    if (bytes.sigBytes > 0) {
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } else {
      throw new Error('Decryption Failed Invalid Key')
    }
  } catch (error) {
    throw new Error('Decryption Failed Invalid Key')
  }
}


export { encrypt, decrypt };
