import {decrypt} from '../utils/Encrypt_decrypt.js';

function sendWelcomeTemplate(User,res){
    let user_id = decrypt(User.user_id);
    let email = decrypt(User.email);
    let name = decrypt(User.name);
    let password = decrypt(User.password);
    let security_pin = decrypt(User.security_pin);
    
    
   }
export  { sendWelcomeTemplate };