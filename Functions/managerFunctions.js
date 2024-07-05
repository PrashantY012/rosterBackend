import staffCollection from "../Schema/staffSchema.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../Utilities/fillCookie.js";
import managerCollection from "../Schema/mangerSchema.js";
import rosterCollection from "../Schema/rosterSchema.js";
import attendanceCollection from "../Schema/attendanceSchema.js";

export const managerRegisterFunc=async (req,res)=>{
    // console.log(req.body);
    try{
    const {name,email,password}=req.body;
    let found=await managerCollection.findOne({email:email});
    // console.log(found)
    if(found)
        {
           return res.status(401).json({
                "success":false,
                "message":"manager already exist",
            })
            
        }
    let hashedPswd=await bcrypt.hash(password,10)    
       
    let manager=await  managerCollection.create({name,email,password:hashedPswd})
    // console.log(name,email,password)
    sendCookie("manager",res,manager,"Manager registered successfully",201)
}
catch(e){
    res.json({
        "errorManagerRegisterFunc":e
    })
    console.log(e);
}
}

export const managerLoginFunc=async (req,res)=>{
    const {email,password}=req.body
    let found=await managerCollection.findOne({email})
    // console.log(found)
    if(found)
        {
            let correct=await bcrypt.compare(password,found.password);
            if(correct)
                {
                   sendCookie("manager",res,found,"Manager Logged in Successfully",201)
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


export const managerGetManagerFunc=(req,res)=>{
    res.json({
        "message":req.manager
    })
}

export const managerCreateStaffFunc=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        let found=await staffCollection.findOne({email:email});
        // console.log(found)
        if(found)
            {
               return res.status(404).json({
                    "success":false,
                    "message":"staff already exist",
                })
                
            }
        let hashedPswd=await bcrypt.hash(password,10)    
        let staff=await  staffCollection.create({name,email,password:hashedPswd})
        // console.log(name,email,password)
        // sendCookie("manager",res,manager,"Manager registered successfully",201)
        return res.json({
            "success":true,
            "message":"staff registered successfully",staff
        })
    }
    catch(e){
        res.json({
            "errorManagerRegisterFunc":e
        })
        console.log(e);
    }
}


export const managerAssignShiftFunc=async (req,res)=>{
    const {timing,date,staff_id,day}=req.body;
    console.log(timing,date,staff_id,day);  
    let found=await staffCollection.findOne({"_id":staff_id})
    if(found)
        {   
            let temp=await rosterCollection.create({timing,date,staff_id,day});
            return res.status(201).json({
                "success":true,
                "message":"Staff's schedule updated successfully",
            })
        }
        else
        {
            return res.status(404).json({
                "success":false,
                "message":"staff member id doesn't exist"
            })
        }
    res.json({
        "success":true,
        "message":"assign shift"
    })
}


export const managerAddRoster=async(req,res)=>{
    const {staffEmail,day,date,shift}=req.body;
    let found=await staffCollection.find({email:staffEmail})

    if(found.length>0)
        {   
            found=await rosterCollection.find({date})
            if(found.length>0)
                {
                    res.status(401).json({
                        "success":false,
                        "message":"Already scheduled"
                    })
                }
            else
            {    
            await rosterCollection.create({staffEmail,day,date,shift})
            res.status(201).json({
                "success":true,
                "message":"Roster Added"
            })
        }
        }
        else
        {
            res.status(401).json({
                "success":false,
                "message":"User doesn't exist"
            })
        }
}
export const managerDeleteRosterEntry=async (req,res)=>{
    let resp=await rosterCollection.deleteOne({_id:req.body._id})
    res.status(201).json({
        "success":true,
        "message":"Deleted Entry Successfully"
    })
}

export const  managerGetAllShiftFunc=async (req,res)=>{
    let found=await rosterCollection.find({});
    console.log(found);
    if(found)
        {
            return res.json({
                "success":true,
                "message":found,
            })
        }
        else
        {
            return res.json({
                "success":false,
                "message":"Nothing to display",
            })
        }
}

export const managerGetAllAttendFunc=async (req,res)=>{
    let found=await attendanceCollection.find({}).sort({date:-1});
    res.status(201).json({
        "success":true,
        "message":found
    })
}
export const managerSeeRoster=async (req,res)=>{
    let found=await rosterCollection.find().sort({ date: -1 });
    res.status(201).json({
        "success":true,
        "message":found
    })
}

export const managerLogout=(req,res)=>{
    let maxAge=0;
    sendCookie("manager",res,req.manager,"Manger Logged Out Sucessful",201,maxAge)
}
    
export const managerSelf=(req,res)=>{
    res.status(201).json(
    {
        "status":true,
        "message":req.manager.name
    })
}
export const managerGetAllStaffFunc=async(req,res)=>{
    let found=await staffCollection.find({});
    res.status(201).json({
        "success":true,
        "message":found
    })
}
export const managerDeleteStaff=async (req,res)=>{
    const staffEmail=req.body.staffEmail;
    let found=await staffCollection.find({email:staffEmail})
    if(found.length>0)
    {
    await staffCollection.deleteMany({email:staffEmail})    
    await attendanceCollection.deleteMany({email:staffEmail})    
    await rosterCollection.deleteMany({staffEmail})    
    res.status(201).json({
        "success":true,
        "message":"Staff Deleted Successfully"
    })
}
    else{
        res.status(401).json({
            "success":false,
            "message":"Staff Doesn't exist"
        })
    }

}
