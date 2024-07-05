import jwt from "jsonwebtoken"
import express from "express";
import cookieParser from "cookie-parser";
import staffCollection from "../Schema/staffSchema.js";
export const staffAuthen=async(req,res,next)=>{   
    const {staff}=req.cookies;
    // console.log(manager)
    const decoded=jwt.decode(staff,process.env.JWT_SECRET)
    const found=await staffCollection.findOne({ _id:decoded})
    // console.log("managerAuth ",found);
    if(staff)
        {   
            req.staff=found;
            next();
        }
        else
        {
                res.status(404).json({
                    "success":false,
                    "message":"Please Login First"
                })
        }
}
