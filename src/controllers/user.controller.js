
// this is for error handling and avoid writing try catch every time
import { asyncHandler} from '../utils/asyncHandler.js' 


const registerUser = asyncHandler ( async (req,res) =>{
  return  res.status(200).json({
        message : "ok"
    })
})


export { registerUser}
