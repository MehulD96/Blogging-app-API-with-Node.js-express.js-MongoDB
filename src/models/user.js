import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    address:{
        type:String,
        required:true,
    },

    Phone:{
        type:Number,
        required:true
    },

    isDeleted:{
        type:Boolean,
        default: false,
    },

    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog", required:true}]
})

export default mongoose.model("User", userSchema);