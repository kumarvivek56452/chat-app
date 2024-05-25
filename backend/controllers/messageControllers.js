import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async(req, res)=>{
    try{
        const {message}=req.body;
        const {id : recieverId} = req.params;
        console.log(req.user)
        const senderId = req.user._id
        
       
        let conversation = await Conversation.findOne({participants:{$all:[senderId, recieverId]}})

        if (!conversation){
            conversation = await Conversation.create({participants:[senderId,recieverId]})
        }

        const newMessage = new Message({
            senderId, recieverId,message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();

        //optimise by running both parallel as below

        await Promise.all([conversation.save(),newMessage.save()]) 

        //SOCKET.IO Functionality here
        const receiverSocketId = getRecieverSocketId(recieverId)
        //io.to() is used to send to specific while io.emit is used to send to all
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        

        res.status(201).json(newMessage)



    } catch(error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
};

export const getMessages = async(req, res) =>{
    try{ 
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")

        if(!conversation){
            return res.status(200).json([])
        }

        res.status(200).json(conversation.messages)


    } catch(error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
}