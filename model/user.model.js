import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const user = new Schema({
    name:{
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true
    },
    password:{
        type:string,
        required:true
    }
});
const User = mongoose.model('User',user);
export default User;