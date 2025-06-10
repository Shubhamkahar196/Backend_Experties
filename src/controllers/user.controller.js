
// this is for error handling and avoid writing try catch every time
import { asyncHandler } from '../utils/asyncHandler.js'



const registerUser = asyncHandler(async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      console.log("email:", email);
      console.log("fullname:", fullname);
      console.log("password:", password);
  
      res.status(200).json({
        message: "User details received",
        data: {
          fullname,
          email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  
  
  
  export { registerUser }




