import { Message } from "../model/message.schema.js"
import { catchasyncerror } from "../middleware/catchasyncerror.js";

export const sendmessage=catchasyncerror(async(req,res)=>{

    //getting from database
    const {firstname,lastname,email,phone,message}=req.body;


    if(!firstname || !lastname || !email || !phone ||!message){
        return res.status(400).json({
            message: `Missing fields: ${[
          !firstname && "firstname",
          !lastname && "lastname",
          !email && "email",
          !phone && "phone",
          !message && "message",
        ].filter(Boolean).join(", ")}`,
        success: false,
      });
    }
    await Message.create({firstname,lastname,email,phone,message});
    return res.status(200).json({
        success:true,
        message:"message send succesfully"
    })
});

export const getallmessage=catchasyncerror(async(req,res,next)=>{
  const message=await Message.find();
  res.status(200).json({
    success:true,
    message
  })
});