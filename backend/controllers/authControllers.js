import User from "../model/user_model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generatetokens.js";

export const signup = async(req, res)=>{
    try{
        const {fullName, userName, password, confirmPassword,gender,profilePic}=req.body;
        if (password!=confirmPassword){
            return res.status(400).json({error:"Password mismatch"})
        }
        const user = await User.findOne({userName});
        if (user){
            return res.status(400).json({error:"Username already exist"})
        }
        // Hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,userName,password:hashedPassword,gender,profilePic:gender=="Male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            //generate JWT token
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
        res.status(201).json({_id:newUser._id,
        fullName:newUser.fullName,
        userName:newUser.userName,
        password:newUser.password,
        profilePic:newUser.profilePic
    })
        } else{
            return res.status(400).json({error:"Invalid User data"})
        }

    } catch(error){
        console.log("Error in signup controller", error.message)
        res.status(500).json({error:"internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(password)
        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Find the user by username
        const userName = username
        const user = await User.findOne({ userName });
        console.log(user)
        // Check if the user exists
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Verify the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        // Check if the password is correct
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);

        // Respond with user data
        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            username: user.userName,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout= async(req, res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})

    } catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}