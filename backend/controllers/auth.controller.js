import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next) => {
    const {username,email,password} =req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({username,email,password:hashedPassword });
   try{ await newUser.save() 
    res.status(201).json({ message: "User created successfully"});
   }catch(error){
    next(errorHandler(300,"something went wrong"));
   }
};
export const signin = async (req,res,next) => {
    const {email,password} =req.body;
    try{
        const validUser =await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Invalid '));
     const token = jwt.sign({ id: validUser._id},process.env.jwt);
     const {password: hashedPassword, ...rest } = validUser._doc; //_doc use so that get all data 
     res
     .cookies('access_token', token, { httpOnly: true})
     .status(200)
     .json(rest)
    }
     catch(error) {
        next(error);
    }}