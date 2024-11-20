import express from 'express';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://sonika:sonika@mern-auth.j15n1.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=Mern-Auth")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const app = express();

app.listen(3000,() => {
    console.log('Server is running on port 3000');
})