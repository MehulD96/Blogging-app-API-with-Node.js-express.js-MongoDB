import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true,
    },

    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },

    image:{
        type:String,
        contentType:String,
    }

    
})

export default mongoose.model("Blog", blogSchema);