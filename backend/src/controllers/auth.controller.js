import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import dotenv from "dotenv"
dotenv.config();

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required."})
        }

        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters."})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format."})
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "Email already in use."})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL)
            } catch (error) {
                console.log("Failed to send welcome email.", error)
            }
        }
        else{
            return res.status(400).json({message: "Invalid user data."})
        }
    } catch (error) {
        console.log("Error in signup controller: ", error)
        return res.status(500).json("Internal Server Error.")
    }
}