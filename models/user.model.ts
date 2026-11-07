import { userTypes } from "@/types/types";
import mongoose, { models } from "mongoose";




const userSchema = new mongoose.Schema<userTypes>({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
},{
    timestamps:true
})






// because nextjs run on edge machine so check if already exist this model so dont create again
const USER = models?.USER || mongoose.model("USER", userSchema)

export default USER;