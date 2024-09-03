import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import os from 'os';
import Joi from "joi";
import { getUserDetail } from '../utils/getUserDetail.js';
import { personalKYC } from "../models/kyc_process.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { GetAccessToken } from "../models/access_token.model.js";
import { json } from "express";
import { encrypt, decrypt } from "../utils/Encrypt_decrypt.js";

const kyc_process = asyncHandler(async (req, res) => {
    const user_detail = getUserDetail(req.headers.refreshtoken);

    if (!req.params.kyc_type) {
        return res.json(new ApiError(404, { data: req.params.kyc_type }, "invalid url type"));
    }

    switch (req.params.kyc_type) {

        case "personal-kyc":
            personal_kyc_process(req, res, user_detail);
            break;


        default:
            return res.json(new ApiError(404, { data: req.params.kyc_type }, "invalid url type"));
            break;
    }



});


const personal_kyc_process = async (req, res, user_detail) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        father_name: Joi.string().min(3).max(50).required(),
        date_of_birth: Joi.string().required(),
        zip_code: Joi.number().integer().min(100000).max(999999).required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        alt_no: Joi.number().integer().min(1000000000).max(9999999999).required(),
        aadhar_no: Joi.string().pattern(/^\d{12}$/).required(),
        pan_no: Joi.string().pattern(/^[A-Z]{5}\d{4}[A-Z]{1}$/).required(),
        bank_name: Joi.string().required(),
        account_no: Joi.string().pattern(/^\d+$/).required(),
        confirm_account_no: Joi.string().valid(Joi.ref('account_no')).required().messages({
            'any.only': 'Account number and confirm account number must match'
        }),
        ifsc_code: Joi.string().required(),
        aadhar_status: Joi.boolean().required(),
        pan_status: Joi.boolean().required(),
        bank_status: Joi.boolean().required(),
        signatury: Joi.boolean(),

    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.json(new ApiError(404, {}, error.details[0].message));
    }

    const user_id = user_detail._id;
    const { name, father_name, date_of_birth, zip_code, city, state, country, alt_no, aadhar_no, pan_no, bank_name, account_no, ifsc_code, aadhar_status, pan_status, bank_status, signatury } = req.body;
    let new_aadhar_status = "rejected";
    let new_pan_status = "rejected";
    let new_bank_status = "rejected";
    let verification_status = "pending";
    let new_signatury = false;
    if (aadhar_status === true && pan_status === true && bank_status === true) {
        new_aadhar_status = "verified";
        new_pan_status = "verified";
        new_bank_status = "verified";
        verification_status = "verified";
    }
    if (signatury === true) {
        new_signatury = true;
    }
    const personal_kyc = {
        name: name,
        father_name: father_name,
        date_of_birth: date_of_birth,
        zip_code: zip_code,
        city: city,
        state: state,
        country: country,
        alt_no: alt_no,
        aadhar_no: aadhar_no,
        aadhar_status: new_aadhar_status,
        pan_no: pan_no,
        pan_status: new_pan_status,
        aadhar_docs: "adhar.png",
        pan_docs: "pan.png",
        bank_name: bank_name,
        account_no: account_no,
        ifsc_code: ifsc_code,
        bank_statement: "statement.png",
        bank_status: new_bank_status,
        verification_status: verification_status,
    }
    const signature_detail = [{
        name: name,
        mobile: alt_no,
        aadhar_no: aadhar_no,
        aadhar_docs: "adhar.docs",
        aadhar_status: new_aadhar_status,
        pan_card: pan_no,
        pan_docs: "pan.docs",
        pan_status: new_pan_status,
        bank_name: bank_name,
        account_no: account_no,
        ifsc_code: ifsc_code,
        bank_statement_docs: "bank.statementdocs",
        bank_status: new_bank_status,
        verification_status: verification_status,
        signatury: new_signatury
    }]
    try {
        let create_personal_detail = await personalKYC.create({
            user_id, personal_kyc, signature_detail
        })
        return res.json(new ApiResponse(200, req.body, "personal details saved successfully"));
    } catch (err) {
        return res.json(new ApiError(200, {}, "personal details saved successfully"));
    }
}


export { kyc_process }