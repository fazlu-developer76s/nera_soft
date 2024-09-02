import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import os from 'os';
import { personalKYC } from "../models/kyc_process.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { GetAccessToken } from "../models/access_token.model.js";
import { json } from "express";
import { encrypt, decrypt } from "../utils/Encrypt_decrypt.js";

const kyc_process = asyncHandler(async(req, res) => {
    
    



    
    const user_id = 12;
    const personal_kyc = {
        name:"fazlu rehman", 
        father_name: "mohd talib",
        date_of_birth: "11/08/2003",
        zip_code: "110094",
        city: "delhi",
        state: "delhi",
        country: "india",
        alt_no: "7291067314",
        aadhar_no: "3222 2425 2552",
        pan_no: "FQBPR8887Q",
        aadhar_docs: "adhar.png",
        pan_docs: "pan.png",
        bank_name: "Kotal",
        account_no: "157428059960",
        ifsc_code: "KKBK00078",
        confirm_account_no: "157428059960",
        bank_statement: "statement.png",
        verification_status: "pending",
    }
    const signature_detail = [{
        name:"fazlu rehman"

    },{
        name:"fazlu rehman"

    }]
    try{
        let create_personal_detail = await personalKYC.create({
           user_id,
           personal_kyc,signature_detail
        })
        res.status(200).json({ success:"personal detail save successfully"})

    }catch(err){
        res.status(500).json({error : err.message});
    }
 });


 export { kyc_process }