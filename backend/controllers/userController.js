import User from "../model/user_model.js"

export const getUserforSidebar = async(req, res)=>{
    try{
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)

    } catch{
        console.log('Error in sidebar | ', error.message)
        res.status(500).json({error:"Internal server error"})
    }
}