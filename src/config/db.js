import mongoose from "mongoose";


export const dbConnection = () => {
    mongoose.connect('mongodb+srv://Admin:IbOJvqtM0bEkK5GQ@cluster0.9dlts1f.mongodb.net/Blog?retryWrites=true&w=majority'
    ).then(() => console.log("connected to database.."))
    .catch((err) =>console.log(err));
};
