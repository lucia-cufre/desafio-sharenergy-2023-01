import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, 'Please add an username']
    },
    password:{
        type:String,
        required:[true, 'Please add a password']
    }

})

export default module.exports = mongoose.model('User', userSchema)

