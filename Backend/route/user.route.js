import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,

  signup,
} from "../controller/User.controller.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/addadmin", isAdminAuthenticated, addNewAdmin);
router.post("/adddoctor",isAdminAuthenticated, addNewDoctor);
router.get("/alldoctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/doctor/me", isPatientAuthenticated, getUserDetails);
router.post("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;