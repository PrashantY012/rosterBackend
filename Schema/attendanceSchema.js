import mongoose from "mongoose";
import staffCollection from "./staffSchema.js";
const Schema = new mongoose.Schema({
    img: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    date: { type: Date, default:Date.now() },
    staff_id:{type: mongoose.Schema.Types.ObjectId ,ref:staffCollection ,required:true}
    // role: { type: String, enum: ['Manager', 'Staff'], required: true }
});

const attendanceCollection=mongoose.model("attendance",Schema);
export default attendanceCollection