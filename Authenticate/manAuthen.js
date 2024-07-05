import jwt from "jsonwebtoken"
import express from "express";
import cookieParser from "cookie-parser";
import managerCollection from "../Schema/mangerSchema.js";
export const manAuthen=async(req,res,next)=>{   
    const {manager}=req.cookies;
    // console.log(manager)
    const decoded=jwt.decode(manager,process.env.JWT_SECRET)
    const found=await managerCollection.findOne({ _id:decoded})
    // console.log("managerAuth ",found);
    if(manager)
        {   
            req.manager=found;
            next();
        }
        else
        {
                res.status(401).json({
                    "success":false,
                    "message":"Please Login First"
                })
        }
}
