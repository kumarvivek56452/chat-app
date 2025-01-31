import {useState} from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () =>{
     const [loading, setloading] = useState(false)
     const {messages,setMessages,selectedConversation} = useConversation();

     const sendMessage = async(message)=>{
        setloading(true)
        try{
            const res =await fetch(`/api/message/send/${selectedConversation._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({message})
            })

            const data= await res.json()
            if(data.error) throw new Error(data.error)

            setMessages([...messages,data])

        } catch(error){
            toast.error(error.message)
        } finally{
            setloading(false)
        }
     }

     return {sendMessage, loading}
}

export default useSendMessage;