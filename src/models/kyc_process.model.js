import mongoose from "mongoose";
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js";
import {encrypt ,  decrypt} from "../utils/Encrypt_decrypt.js"
const KYC_process = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  personal_kyc: {
        name: { type: String, required: true },
        father_name: { type: String, required: true },
        date_of_birth: { type: String, required: true },
        zip_code: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        alt_no: { type: String },
        aadhar_no: { type: String, required: true },
        pan_no: { type: String, required: true },
        aadhar_docs: { type: String, required: true },
        pan_docs: { type: String, required: true },
        bank_name: { type: String, required: true },
        account_no: { type: String, required: true },
        ifsc_code: { type: String, required: true },
        confirm_account_no: { type: String, required: true },
        bank_statement: { type: String, required: true },
        verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

KYC_process.pre('save',function(next){
    this.status = encrypt(this.status)
    this.personal_kyc.name = encrypt(this.personal_kyc.name)
    this.personal_kyc.father_name = encrypt(this.personal_kyc.father_name)
    this.personal_kyc.date_of_birth = encrypt(this.personal_kyc.date_of_birth)
    this.personal_kyc.zip_code = encrypt(this.personal_kyc.zip_code)
    this.personal_kyc.city = encrypt(this.personal_kyc.city)
    this.personal_kyc.state = encrypt(this.personal_kyc.state)
    this.personal_kyc.country = encrypt(this.personal_kyc.country)
    this.personal_kyc.alt_no = encrypt(this.personal_kyc.alt_no)
    this.personal_kyc.aadhar_no = encrypt(this.personal_kyc.aadhar_no)
    this.personal_kyc.pan_no = encrypt(this.personal_kyc.pan_no)
    this.personal_kyc.aadhar_docs = encrypt(this.personal_kyc.aadhar_docs)
    this.personal_kyc.pan_docs = encrypt(this.personal_kyc.pan_docs)
    this.personal_kyc.bank_name = encrypt(this.personal_kyc.bank_name)
    this.personal_kyc.account_no = encrypt(this.personal_kyc.account_no)
    this.personal_kyc.ifsc_code = encrypt(this.personal_kyc.ifsc_code)
    this.personal_kyc.confirm_account_no = encrypt(this.personal_kyc.confirm_account_no)
    this.personal_kyc.bank_statement = encrypt(this.personal_kyc.bank_statement)
    this.personal_kyc.verification_status = encrypt(this.personal_kyc.verification_status)
    next();
})

export const personalKYC = mongoose.model('kyc_process', KYC_process)