import Conversation from "./Conversation"
import useGetConversations from "../../hooks/useGetConversations"
import { getFunEmoji } from "../../utils/emoji"
const Conversations = () =>{
    const {loading,conversations} = useGetConversations()
 
    return (
        <div className="py-2 flex flex-col overflow-auto">
        
       
      {conversations.map((conversation,idx)=>(
             <Conversation conversation={conversation} key={conversation._id} emoji={getFunEmoji()} lastIdx={idx === conversations.length-1}/>
        ))}

        
    
        {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
        
        
        </div>
    )
}

export default Conversations



// Starter code snippit

// import Conversation from "./Conversation"
// const Conversations = () =>{
//     return (
//         <div className="py-2 flex flex-col overflow-auto">
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
        
//         </div>
//     )
// }

// export default Conversations




