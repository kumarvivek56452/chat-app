import { useAuthContext } from "../../Context/AuthContext"
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message=({message})=>{
    const {authUser} = useAuthContext();
    const {selectedConversation} = useConversation();
    const fromMe=message.senderId === authUser.id;
  
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubblebgColor = fromMe ? "bg-blue-500" : "" ;
    const formatedTime=extractTime(message.createdAt)
    const shakeClass = message.shouldShake ? "shake" : ""
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img alt='user_img' src={profilePic}/>
            </div>
            </div>
            <div className={`chat-bubble text-white  ${bubblebgColor} ${shakeClass}`} >{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white ">{formatedTime}</div>

        </div>
    )
}

export default Message