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
        doctorId,
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
            !doctorId ||
            !address
          ) {
            return next(new ErrorHandler("Please Fill Full Form!", 400));
          }

    const doctor = await User.findOne({
      _id: doctorId,
      role: "Doctor",
      doctorDepartment: department,
    });
    if (!doctor) {
      return next(new ErrorHandler("Doctor not found in database", 400));
    }
    const patientId = req.user._id;
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
        firstName: doctor.firstName,
        lastName: doctor.lastName,
      },
      hasVisited,
      address,
      doctorId: doctor._id,
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