import mongoose from "mongoose";
import staffCollection from "./staffSchema.js";
const Schema = new mongoose.Schema({
    shift:{type:String,required:true},
    day: { type: String, required: true},
    date: { type: String, required: true },
    staff_id:{type: mongoose.Schema.Types.ObjectId ,ref:staffCollection },
    staffEmail:{type:String ,required:true}
    // role: { type: String, enum: ['Manager', 'Staff'], required: true }
});

const rosterCollection=mongoose.model("roster",Schema);
export default rosterCollection