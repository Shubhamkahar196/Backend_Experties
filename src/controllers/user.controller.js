// this is for error handling and avoid writing try catch every time
import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
//  import express from "express"
//  const app = express();
//  app.use(express.json());
//  app.use(express.urlencoded({
//     extended: true
//  }))


const generateAccessAndRefereshToken = async(userId)=>{
  try{
      const user = await User.findById(userId)
     const accessToken =   user.generateAccessToken();
     const refreshToken =  user.generateRefreshToken();

   user.refreshToken = refreshToken
  await user.save({validateBeforeSave: false})

  return {accessToken, refreshToken}
        
  }catch(e){
    throw new ApiError(500, "Something went wrong while  generating referesh and access token")
  }
}

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

  const { fullName, email, password, username } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(409, "User already exists");
  }

  // avatar
  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  //cover image
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file upload failed");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
    // "-password  -refreshToken" this is syntax for select which is not need
  );

  if (!createdUser) {
    throw new ApiError(400, "Something went wrong during registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, " user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body ->data
  // username or email
  // find the user
  // password check
  // access and refresh token
  // send cookie

  const { email, username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "username or password is required");
  }

  const existUser = User.findOne({
    $or: [{ username }, { email }], // find username || email
  });

  if (!existUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await existUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }
   
  const {accessToken,refreshToken} = await generateAccessAndRefereshToken(user._id)
  
   
const loggedInUser = User.findById(existUser._id).select("-password -refreshToken")

// cookies

const options = {
  httpOnly: true,
  secure: true
}

return res.status(200)
.cookie("accessToken", accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
  new ApiResponse(
    200, 
    {
      user: loggedInUser, accessToken,
      refreshToken
  },
  "User logged in Successfully"
)


)

});

export { registerUser, loginUser };

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
