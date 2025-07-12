import { Message } from "../model/message.schema.js"
import { catchasyncerror } from "../middleware/catchasyncerror.js";
import ErrorHandler from "../middleware/error.js";
import { Activity } from '../model/activity.schema.js';

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
    const msg = await Message.create({firstname,lastname,email,phone,message});
    // Log activity
    await Activity.create({
      type: 'message_received',
      description: `Message received from ${firstname} ${lastname} (${email})`,
      meta: { messageId: msg._id, email, phone }
    });
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

// Delete message function with time-based logic
export const deleteMessage = catchasyncerror(async (req, res, next) => {
  const { id } = req.params;
  
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message not found!", 404));
  }
  
  // Check if message is within 24 hours of creation
  const messageAge = Date.now() - new Date(message.createdAt).getTime();
  const hoursSinceCreation = messageAge / (1000 * 60 * 60);
  
  if (hoursSinceCreation > 24) {
    return next(new ErrorHandler("Messages can only be deleted within 24 hours of creation!", 400));
  }
  
  await Message.findByIdAndDelete(id);
  
  res.status(200).json({
    success: true,
    message: "Message deleted successfully!",
  });
});

// Mark message as read function
export const markMessageAsRead = catchasyncerror(async (req, res, next) => {
  const { id } = req.params;
  
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message not found!", 404));
  }
  
  message.isRead = true;
  await message.save();
  
  res.status(200).json({
    success: true,
    message: "Message marked as read!",
  });
});