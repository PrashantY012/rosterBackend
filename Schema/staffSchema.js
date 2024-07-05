import mongoose from "mongoose";
let schema=new mongoose.Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const staffCollection=mongoose.model("staff",schema);
export default  staffCollection