import { BsExposure } from "react-icons/bs"
import {create} from "zustand"

const useConversation=create((set)=>({
    selectedConversation:null,
    setSelectedConversation: (selectedConversation)=> set({selectedConversation}),
    messages:[],
    setMessages: (messages)=>set({messages})
}))

export default useConversation;