import mongoose, { Schema } from "mongoose";

const ExpireSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        index: true,
        trim: true,

    },
    status: {
        type: String,
        index: true,
        default: true
    },
    expireAt: {
        type: String,
        required: true,
        index: true,
    }
},
    {
        timestamps: true
    }
);

export const Expire_link_schema = mongoose.model("expire_links",ExpireSchema )
