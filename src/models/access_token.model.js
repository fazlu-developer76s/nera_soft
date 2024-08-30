import mongoose from "mongoose";

const { Schema } = mongoose;

const accessTokenSchema = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId, // Corrected type from 'string' to String
        required: true,
        index: true // Corrected 'indexedDB' to 'index'
    },
    token: {
        type: String, // Corrected type from 'string' to String
        required: true,
        index: true
    },
    token_status: {
        type: Boolean, // Corrected type from 'boolean' to Boolean
        required: true,
        default: true,
        index: true
    }
}, {
    timestamps: true,
});

export const GetAccessToken = mongoose.model("useraccesstokens", accessTokenSchema); // Corrected model name convention
