import { useEffect } from "react";
import Messages from "./Messages"
import MessagesInput from "./MessageInput"
import {TiMessages} from "react-icons/ti"
import useConversation from "../../zustand/useConversation";
import { AuthContext, useAuthContext } from "../../Context/AuthContext";

const MessageContainer = () => {
    
    const {selectedConversation, setSelectedConversation} = useConversation();

    //component unmount
    useEffect(()=>{
        return()=>setSelectedConversation(null)
    },[setSelectedConversation])

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {/* Header */}
            {!selectedConversation ? (<NoChatSelected />) : ((
                <div className="bg-slate-500 px-4 py-2 mb-2">
                    <span className="label-text">To:</span>
                    <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                </div>
            ))}

            {/* Messages and Input */}
            {selectedConversation && (
                <>
                    <Messages />
                    <MessagesInput />
                </>
            )}
        </div>
    );
};
export default MessageContainer;


const NoChatSelected=()=>{
    const {authUser}= useAuthContext();
    
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {authUser.fullName}</p>
                <p> Select a chat to start Conversation</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    )
}