import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must be at least 3 characters"]
  },

  lastname: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name must be at least 3 characters"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false // Important: Password won't be returned in queries
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: [10, "Phone number must be 10 digits"],
    maxlength: [10, "Phone number must be 10 digits"]
  },

  aadhar: {
    type: String,
    required: [true, "Aadhar number is required"],
    minlength: [12, "Aadhar must be 12 digits"],
    maxlength: [12, "Aadhar must be 12 digits"]
  },

  
dob:{
        type:String,
        required:[true,"Dob is required"]

    },

    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },

    role:{
        type:String,
        required:true,
        enum:["admin","patient","doctor"]

    },
   doctordepartment: {
    type:String

    },
    docavatar:{
        public_id:String,
        url:String
        
    },
  

  

  
}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema);
export default User;
