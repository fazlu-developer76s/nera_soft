import CryptoJS from 'crypto-js';

const secretKey = "mySecretKey123";
// Encryption function
function encrypt(text) {
    
    const data = text;
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
     return encryptedData;
    
}
// Decryption function
function decrypt(encryptedText) {
    
    const encryptedData1 = encryptedText;
    const bytes = CryptoJS.AES.decrypt(encryptedData1, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt};

