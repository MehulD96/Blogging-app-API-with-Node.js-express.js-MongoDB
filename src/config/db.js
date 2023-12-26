import mongoose from "mongoose";


export const dbConnection = () => {
    mongoose.connect('database url'
    ).then(() => console.log("connected to database.."))
    .catch((err) =>console.log(err));
};
