import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://user2000:test123@cluster0.phj7f6k.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0appName=Cluster0")
    } catch (error){
        console.log("Error connecting to Mongodb",error.message)
    }
}

export default connectToMongoDB