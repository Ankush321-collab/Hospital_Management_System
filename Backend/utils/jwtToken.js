import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  let cookieName = "";
  if (user.role === "Patient") cookieName = "patientToken";
  else if (user.role === "Doctor") cookieName = "doctorToken";
  else if (user.role === "Admin") cookieName = "adminToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
