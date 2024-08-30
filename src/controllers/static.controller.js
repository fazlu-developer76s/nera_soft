import { asyncHandler } from "../utils/asyncHandler.js";
import { encrypt,decrypt } from "../utils/Encrypt_decrypt.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const encrypted = (req,res)=>{
    const { data } = req.body;
    const encrypted = encrypt(data);
    return res.json(new ApiResponse(200, encrypted, "Data encrypted successfully"));
};


const decrypted = (req,res)=>{
    const { data } = req.body;
    const decrypted = decrypt(data);
    return res.json(new ApiResponse(200, decrypted, "Data decrypted successfully"));
};

const dashboard = asyncHandler( async (req,res) =>{
    
    return res.json("welcome Dashboard");
})

export { encrypted, decrypted, dashboard }
