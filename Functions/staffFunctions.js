import attendanceCollection from "../Schema/attendanceSchema.js";
import rosterCollection from "../Schema/rosterSchema.js";
import staffCollection from "../Schema/staffSchema.js";
import { sendCookie } from "../Utilities/fillCookie.js";
import bcrypt from "bcrypt"
export const staffLogin=async (req,res)=>{
    const {email,password}=req.body
    let found=await staffCollection.findOne({email})
    // console.log(found)
    if(found)
        {
            let correct=await bcrypt.compare(password,found.password);
            if(correct)
            {
                sendCookie("staff",res,found,"Staff Logged in Successfully",201)
                //    console.log(found)
            }
            else
            {
                return res.status(404).
                json({
                        "status":false,
                        "message":"Invalid Credentials"
                })
            }
        }
     else
     {
        return res.status(404).
                json({
                        "status":false,
                        "message":"Invalid Credentials"
                })
     }   
}

export const staffSeeRoster=async (req,res)=>{
    let email=req.staff.email;
    let found=await rosterCollection.find({staffEmail:email}).sort({ date: -1 });
    if(found)
        {
            res.status(201).json({
                "success":true,
                "message":found
            })
        }
        else
        {
            res.status(201).json({
                "sucess":true,
                "message":"No data to display"
            })
        }
}


export const staffLogout=(req,res)=>{
    let maxAge=0;
    sendCookie("staff",res,req.staff,"Staff Logged Out Sucessful",201,maxAge)
}

export const staffAttendance=async (req,res)=>{
    const {img}=req.body;
    const staff_id=req.staff._id;
    const name=req.staff.name
    const email=req.staff.email
    await attendanceCollection.create({img,staff_id,name,email});
    res.status(201).json({
        "success":true,
        "message":"attendance taken successfully"
    })
}

export const selfStaff=(req,res)=>{
    res.status(201).json(
        {
            "status":true,
            "message":req.staff.name
        }
    )

}