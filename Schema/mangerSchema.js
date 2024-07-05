import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, enum: ['Manager', 'Staff'], required: true }
});

const managerCollection=mongoose.model("Manager",userSchema);
export default managerCollection