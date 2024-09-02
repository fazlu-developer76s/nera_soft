import mongoose from "mongoose";
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js";
import { encrypt, decrypt } from "../utils/Encrypt_decrypt.js"
const KYC_process = new mongoose.Schema({

  user_id: {
    required: true,
    index: true,
    trim: true,
    // type: mongoose.Schema.ObjectId
    type: String
  },
  personal_kyc: {
    name: { type: String, required: true },
    father_name: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    zip_code: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    alt_no: { type: String, default: null },
    aadhar_no: { type: String, required: true },
    pan_no: { type: String, required: true },
    aadhar_docs: { type: String, required: true },
    aadhar_status: { type: String, required: true, enum: ['rejected', 'verified'], default: 'rejected' },
    pan_docs: { type: String, required: true },
    pan_status: { type: String, required: true, enum: ['rejected', 'verified'], default: 'rejected' },
    bank_name: { type: String, required: true },
    account_no: { type: String, required: true },
    ifsc_code: { type: String, required: true },
    bank_statement: { type: String, required: true },
    bank_status: { type: String, required: true, enum: ['rejected', 'verified'], default: 'rejected' },
    verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now, },
  },
  entity_type: {
    type: String,
    index: true,
    default: null,
  },
  business_kyc: {
    business_name: { type: String, default: null },
    pan_card: { type: String, default: null },
    pan_docs: { type: String, default: null },
    gst_number: { type: String, default: null },
    gst_number_status: { type: String, enum: ['rejected', 'verified'], default: 'rejected' },
    gst_docs: { type: String, default: null },
    msme_number: { type: String, default: null },
    msme_docs: { type: String, default: null },
    partnership_deed_docs: { type: String, default: null },
    certificate_number: { type: String, default: null },
    certificate_docs: { type: String, default: null },
    moa_docs: { type: String, default: null },
    aoa_docs: { type: String, default: null },
    br_docs: { type: String, default: null },
    cancel_cheque_docs: { type: String, default: null },
    verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now, },
  },
  bank_detail: {
    account_name: { type: String, default: null },
    account_number: { type: String, default: null },
    ifsc_code: { type: String, default: null },
    bank_name: { type: String, default: null },
    bank_statement_docs: { type: String, default: null },
    verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now, },
  },
  number_of_partner: {
    type: String,
    default: null,
  },
  signature_detail: [{
    name: { type: String, default: null },
    mobile: { type: String, default: null },
    email: { type: String, default: null },
    aadhar_no: { type: String, default: null },
    aadhar_docs: { type: String, default: null },
    aadhar_status: { type: String, default: 'rejected' },
    pan_card: { type: String, default: null },
    pan_docs: { type: String, default: null },
    pan_status: { type: String, default: 'rejected' },
    bank_name: { type: String, default: null },
    account_number: { type: String, default: null },
    ifsc_code: { type: String, default: null },
    bank_statement_docs: { type: String, default: null },
    bank_status: { type: String, enum: ['rejected', 'verified'], default: 'rejected' },
    verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    signatury: { type: String, default: false },
    createdAt: { type: Date, default: Date.now, },
  }],
  aggrements: {
    signature: { type: String, default: null },
  },
  kyc_status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
},
  { timestamps: true }
)




export const personalKYC = mongoose.model('kyc_process', KYC_process)