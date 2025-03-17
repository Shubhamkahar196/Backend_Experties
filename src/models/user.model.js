import mongoose,{mongo, Schema} from 'mongoose'


// write like this 
// const userSchema = new mongoose.Schema({})
// write like this 
const userSchema = new Schema({
     username: {
        type:String,
        required: true,
        unique: true,
        lowercase : true,
        trim: true,
        index: true
     },
     email: {
        type:String,
        required: true,
        unique: true,
        lowercase : true,
        trim: true,
       
     },
     fullname: {
        type:String,
        required: true,
        trim: true,
        index: true
     },
     avatar: {
        type:String,  //cloudinary url
        required: true,
     },
     coverImage: {
        type: String, // cloudinary url
     },
     watchHistory: [
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
     ],
     password: {
        type: String,
        required: [true, "Password is required"]

     },
     refreshToken: {
        type:String
     }

     
},{timestamps: true})   //timestamps: true they give createdat 




export const User = mongoose.model("User", userSchema)