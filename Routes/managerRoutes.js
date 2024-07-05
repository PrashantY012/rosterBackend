import express from "express";
const router=express.Router();
const app=express()
import managerCollection from "../Schema/mangerSchema.js"
import bcrypt from "bcrypt"
import { managerAddRoster, managerAssignShiftFunc, managerCreateStaffFunc, managerDeleteRosterEntry, managerDeleteStaff, managerGetAllAttendFunc, managerGetAllShiftFunc,  managerGetAllStaffFunc,  managerGetManagerFunc,   managerLoginFunc, managerLogout, managerRegisterFunc, managerSeeRoster, managerSelf } from "../Functions/managerFunctions.js";
import { manAuthen } from "../Authenticate/manAuthen.js";

router.get("/",(req,res)=>{
    res.send("Manager hu sambhal ke")    
})

router.post("/register",managerRegisterFunc)
router.post("/login",managerLoginFunc)
router.post("/createStaff",manAuthen,managerCreateStaffFunc )
router.post("/addRoster",manAuthen,managerAddRoster )
router.post("/assignShift",manAuthen,managerAssignShiftFunc)
router.post("/deleteRosterEntry",manAuthen,managerDeleteRosterEntry)
router.post("/deleteStaff",manAuthen,managerDeleteStaff)

router.get("/getUsers",manAuthen,managerGetManagerFunc)
router.get("/getAllStaff",manAuthen,managerGetAllStaffFunc)
router.get("/getAllShift",manAuthen,managerGetAllShiftFunc)
router.get("/getAllAttendance",manAuthen,managerGetAllAttendFunc)
router.get("/managerLogout",manAuthen,managerLogout)
router.get("/managerSelf",manAuthen,managerSelf)
router.get("/seeRoster",manAuthen,managerSeeRoster)






export default router