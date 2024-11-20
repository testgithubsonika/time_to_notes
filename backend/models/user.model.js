import  Mongoose  from 'mongoose';

const userSchema = new mongoose.userSchema({
    usename:{
        type: String,
        required: true,
        unique: true,
        },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    
    password:{
        type: String,
        required: true,
       
        },
}, {timestamps: true});
const User = mongoose.model('User', userSchema);

export default User;