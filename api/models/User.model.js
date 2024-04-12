
import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    profilePhoto :{
        type: String,
        default: "https://th.bing.com/th/id/R.c98530977183534ed0e49e6db725bd7d?rik=qRXJBwOokn7dSQ&pid=ImgRaw&r=0",
    } ,
},
{
    timestamps: true,
}
);
const User = mongoose.model('User', UserSchema);
export default User;