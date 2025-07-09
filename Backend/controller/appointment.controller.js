import { Appointment } from '../model/appointmentSchema.js'
import { catchasyncerror } from "../middleware/catchasyncerror.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../model/UserSchema.js";


export const postappointment=catchasyncerror(async(req,res,next)=>{
    const { firstName,
        lastName,
        email,
        phone,
        aadhar,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,}=req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !aadhar ||
            !dob ||
            !gender ||
            !appointment_date ||
            !department ||
            !doctor_firstName ||
            !doctor_lastName ||
            !address
          ) {
            return next(new ErrorHandler("Please Fill Full Form!", 400));
          }
//now we are checking from user schema of doctor with appointment schema

const isconflict=await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
})
//if anything does not match then doctor is not there is schema

if(isconflict.length===0){
    return next(new ErrorHandler("DOctor not found in ddatabse",400))
}

if(isconflict.length>1){
    return next(new ErrorHandler("DOctor conflicts please contact through email or phone",404))
}

const doctorId=isconflict[0]._id;
const patientId=req.user._id;

const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    aadhar,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Sent! We will provide you an update soon",
  });
});

export const getallappointment=catchasyncerror(async(req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        success:true,
        appointments
    })
})
///to update appointment

export const updateappointment=catchasyncerror(async(req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);

    if(!appointment){
        return next(new ErrorHandler("Appointment not found ",404))
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        appointment,
        message: "Appointment updated successfully"
    });
});

export const deleteappointment = catchasyncerror(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found and could not delete", 404));
    }
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
});