import mongoose, { Schema } from "mongoose"

const userLoginActivity = new Schema({
    user_id: {
        type: String,
        required: true,
        index: true
    },
    // loginhistory: {
    //     type: [{
    //         logintime: {
    //             type:String,
    //             required: true,
    //             index:true
    //         },


    //     }],
    // },

},
    {
        timestamps: true
    })