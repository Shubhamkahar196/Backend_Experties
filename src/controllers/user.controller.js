
// this is for error handling and avoid writing try catch every time
import { asyncHandler } from '../utils/asyncHandler.js'

 import {ApiError} from '../utils/apiError.js'
 import {User } from "../models/user.model.js"
 import { uploadOnCloudinary } from '../utils/cloudinary.js';
 import { ApiResponse } from '../utils/apiResponse.js';

 const registerUser = asyncHandler(async (req, res) => {
    //  get user details from frontend (Postman)
    // validation - not empty 
    // check if user already exists: username,email
    // check for images,check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

     const {fullname,email,password } = req.body;
     console.log("email:",email);
     console.log("fullname:",fullname);
     console.log("password:",password);
     
     if(fullname ===""){
         throw new ApiError(400,"fullname is required")
     }

     if(
         [fullname,email,username,password].some((field)=>
             field?.trim()===""
         )
     ){
         throw new ApiError(400, "All fields are required")
     }

     const existUser = User.findOne({
      $or: [{username}, {email}]
     })

     if(existUser){
      throw new ApiError(409,"User already exists")
     }

   
     // avatar 
     const avatarLocalPath = req.files?.avatar[0]?.path;

     //cover imgae
     const  coverImageLocalPath = req.files?.coverImage[0]?.path;

     if(!avatarLocalPath){
        throw new ApiError(400,"Avatar files is required")
     }
     
     
     //upload on cloudinary
      const avatar = await uploadOnCloudinary(avatarLocalPath);
      const coverImage = await uploadOnCloudinary(coverImageLocalPath);

      if(!avatar){
        throw new ApiError(400,"Avatar files is required")
      }

      const user = await  User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
      })

      // remove password and refresh token field from response
      const createdUser =  await User.findById(user._id).select(
        "-password  -refreshToken"
        // "-password  -refreshToken" this is syntax for select which is not need 
      )

      if(!createdUser){
        throw new ApiError(400,"Something went wrong during registering the user");
      }


      return res.status(201).json(   
     new ApiResponse(200,createdUser, " user registered successfully")
    )

 });




 export { registerUser }


// const registerUser = asyncHandler(async (req, res) => {
//     try {
//       const { fullname, email, password } = req.body;
//       console.log("email:", email);
//       console.log("fullname:", fullname);
//       console.log("password:", password);
  
//       res.status(200).json({
//         message: "User details received",
//         data: {
//           fullname,
//           email,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
  
  
  
  
//   export { registerUser }




