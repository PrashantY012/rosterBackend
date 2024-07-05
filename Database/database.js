import mongoose from "mongoose";
export const  databaseDB=()=>{
    
mongoose.connect(process.env.MONGO_URI,{
        dbName:"attendanceRoster"
    }).then((c)=>console.log(`Database connected with ${c.connection.host}`)).catch((e)=>console.log(e));
}
