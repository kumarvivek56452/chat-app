import { useState } from "react";
import {BsSend} from "react-icons/bs"
import useSendMessage from "../../hooks/useSendMessage";
const MessagesInput=()=>{
    const [message, setMessage]=useState("")
    const {sendMessage, loading} = useSendMessage();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(!message) return 
        await sendMessage(message)
        setMessage("")
    }

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
            <input type="text" className="border text-sm rounded-lg black w-full p-2.5 bg-gray-700 border-gray-600 text-white" placeholder="Send a Message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 text-white rounded-r-lg">
            {loading ? <span className="loading loading-spinner"></span> : <BsSend />}
            </button>
            </div>
        </form>
    )
}

export default MessagesInput