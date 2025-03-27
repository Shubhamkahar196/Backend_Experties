
// this is for error handling and avoid writing try catch every time
import { asyncHandler } from '../utils/asyncHandler.js'
import {ApiError} from '../utils/apiError.js'
import {User } from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend (Postman)
    //validation - not empty 
    //check if user already exists: username,email
    //check for images,check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    const {fullname,email,password } = req.body;
    console.log("email:",email);
     
    // if(fullname ===""){
    //     throw new ApiError(400,"fullname is required")
    // }

    // if(
    //     [fullname,email,username,password].some((field)=>
    //         field?.trim()===""
    //     )
    // ){
    //     throw new ApiError(400, "All fields are required")
    // }



});


export { registerUser }




