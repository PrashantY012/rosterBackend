import express from "express";
import { selfStaff, staffAttendance, staffLogin, staffLogout, staffSeeRoster } from "../Functions/staffFunctions.js";
import { staffAuthen } from "../Authenticate/staffAuthen.js";
const router=express.Router();


router.post("/login",staffLogin)
router.get("/staffSelf",staffAuthen,selfStaff)
router.get("/seeRoster",staffAuthen,staffSeeRoster)
router.get("/staffLogout",staffAuthen,staffLogout)
router.post("/staffAttendance",staffAuthen,staffAttendance)
//function attendance ke liye

export default router;
