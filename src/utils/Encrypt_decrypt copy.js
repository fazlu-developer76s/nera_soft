
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

function encrypt(data){
  return crypto.createHmac("sha256", ENCRYPTION_KEY).update(data).digest("hex");
}

function decrypt(encryptedMessage){
   const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPTION_KEY);
   const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);   
   return decryptedMessage;
}


export { encrypt, decrypt };
