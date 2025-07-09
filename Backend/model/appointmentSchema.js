import mongoose from 'mongoose'
import validator from 'validator'


const appointmentSchema=new mongoose.Schema({

    firstName:{
        type:String,
        required:[true,"firstname is required"],
        minLengthL:[3,"firstname should be atleast 3 character"],
    },
    lastName:{
        type:String,
        required:[true,"lastname is required"],
        minLength:[3,"lastname must contain atleat 3 charater"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:[validator.isEmail,"provise a valid emaail"],

    },
    phone: {
        type: String,
        required: [true, "Phone Is Required!"],
        minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
      },

      aadhar:{
        type: String,
        required: [true, "NIC Is Required!"],
        minLength: [13, "NIC Must Contain Only 13 Digits!"],
        maxLength: [13, "NIC Must Contain Only 13 Digits!"],

      },
      dob:{
        type:Date,
        reuired:[true,"Dob is required"],
      },

      gender: {
        type: String,
        required: [true, "Gender Is Required!"],
        enum: ["Male", "Female"],
      },
      appointment_date: {
        type: String,
        required: [true, "Appointment Date Is Required!"],
      },
      department: {
        type: String,
        required: [true, "Department Name Is Required!"],
      },
      doctor: {
        firstName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
        lastName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
      },
      hasVisited: {
        type: Boolean,
        default: false,
      },
      address: {
        type: String,
        required: [true, "Address Is Required!"],
      },
      doctorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor Id Is Invalid!"],
      },
      patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient Id Is Required!"],
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },


},{
    timestamps:true,
})

export const Appointment=mongoose.model("Appointmnet",appointmentSchema)