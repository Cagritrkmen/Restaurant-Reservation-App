import mongoose from "mongoose";

const dbConnection =()=> {
    mongoose.connect(process.env.MONGO_URİ)
}