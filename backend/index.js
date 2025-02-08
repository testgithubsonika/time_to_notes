import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
//dotenv.config();
mongoose.connect("mongodb+srv://sonika:sonika@mern-auth.j15n1.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=Mern-Auth")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


const app = express();
app.use(express.json());

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});

app.use("/user", userRoutes);
app.use("/auth",authRoutes);
app.use((err, req, res, next) => { 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Server Error';
   return  res.status(statusCode).json({ sucess: false, error:message});
})