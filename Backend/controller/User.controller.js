import User from '../model/UserSchema.js';
import bcrypt from 'bcrypt';
import { catchasyncerror } from '../middleware/catchasyncerror.js';
import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser'

export const Signup = catchasyncerror(async (req, res, next) => {
  const { firstname, lastname, email, password, confirmpassword, phone, aadhar, dob, gender,role} = req.body;

  // 🔍 Validate required fields
  if (!firstname || !email || !password || !confirmpassword || !dob || !gender || !phone || !aadhar ||!role) {
    return res.status(400).json({
      message: `Missing fields: ${[
        !firstname && "firstname",
        !email && "email",
        !password && "password",
        !confirmpassword && "confirmpassword",
        !phone && "phone",
        !aadhar && "aadhar",
        !dob && "dob",
        !gender && "gender",
        !role && "Role"
      ].filter(Boolean).join(", ")}`,
      success: false
    });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({
      message: "Passwords do not match",
      success: false
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "Email already exists",
      success: false
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    aadhar,
    role,
    password: hashedPassword
  });

  await newUser.save();

  res.status(201).json({
    message: `Signup successful. Welcome, ${firstname} ${lastname} as ${role}!`,
    success: true
  });
});

export const login = catchasyncerror(async (req, res, next) => {
  //showing login in people
  console.log("LOgin", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: `Missing Fields: ${[
        !email && "Email",
        !password && "Password",
      ].filter(Boolean).join(", ")}`,
      success: false
    });
  }

  // Check if user exists
  const user = await User.findOne({ email }).select("+password firstname lastname role");
  if (!user) {
    return res.status(400).json({
      message: "user is not valid or not in database",
      success: false
    });
  }

  // Check password
  const ispassword = await bcrypt.compare(password, user.password);
  if (!ispassword) {
    return res.status(400).json({
      message: "invalid password",
      success: false,
    });
  }

  // Create token
  const jwt_password = process.env.JWT_USER_PASSWORD;
  const token = jwt.sign({
    userId: user._id, email: user.email,
  }, jwt_password, { expiresIn: "1d" });

  // Set cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "Strict"
  });

  // Hide password
  const { password: _, ...userResponse } = user.toObject();
  res.status(200).json({
    message: "LOGIN SUCCESSFULLY DONE",
    success: true,
    user: userResponse,
    token,
  });
});
