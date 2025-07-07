import mongoose from 'mongoose'
import validator from "validator";  

const messageSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:[3,"firstname must contain 3 character"]
    },

     lastname:{
        type:String,
        required:true,
        minlength:[3,"lastname must contain 3 character"]
    },
     email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide a valid email"]
    },

     phone:{
        type:String,
        required:true,
        minlength:[10,"phone number must contain 10 character"],
        maxlength:[10,"phone number must contain 10 character max"]
    },

     message:{
        type:String,
        required:true,
        minlength:[10,"message must contain 10 character atleast"]
    },

},{
    timestamps:true,

})
export const Message= mongoose.model("message",messageSchema)
