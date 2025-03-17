import mongoose,{mongo, Schema} from 'mongoose'
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

//checking password
userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)