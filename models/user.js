import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
 
    password:{
        type:String,
        required:true,
    },
}, { timestamps: true });

//Export the model
const User = mongoose.model("User",userSchema);
export default User