import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../Context/AuthContext"

const useSignup=()=>{
    const [loading, setloading]=useState(false)
    const {setAuthUser} = useAuthContext();
    
    const signup=async({fullName,userName,password,confirmPassword,gender})=>{
    const success=handleInputError({fullName,userName,password,confirmPassword,gender})
    console.log(gender)
    if(!success){
        return
    }
    setloading(true)
    try{
        const res= await fetch("/api/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,userName,password,confirmPassword,gender})
        })
        const data = await res.json();
        if (data.error){
            throw new Error(data.error)
        }
        console.log(data)

    //user data saved in localstorage

    localStorage.setItem("chat-app",JSON.stringify(data))
    setAuthUser(data)

    } catch(error){
        toast.error(error.message)

    } finally{
        setloading(false)
    }
    
    }
    return {loading,signup}
}

export default useSignup

function handleInputError({fullName,userName,password,confirmPassword,gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("Please fill in all field")
        return false
    }
    if(password!==confirmPassword){
        toast.error("Password not matching")
        return false
    }
    if(password.length<6){
        toast.error("Password must be atleast 6 characters")
        return false
    }
    return true
}


