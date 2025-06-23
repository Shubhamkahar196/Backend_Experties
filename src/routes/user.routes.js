// import {Router } from 'express';
// import {registerUser} from "../controllers/user.controller.js"
// // import {user} from '../models/user.model.js'

// import {upload} from "../middlewares/multer.middleware.js"


// const router = Router()




// // router.route("/register").post(
// //     upload.fields([
// //         {
// //             name: "avatar",
// //             maxCount : 1
// //         },
// //         {
// //             name: "coverImage",
// //             maxCount: 1
// //         }
// //     ]),
// //     registerUser);

// router.route("/register").post(registerUser);

  
// export default router

// import { Router } from 'express';

// const router = Router();

// router.route("/register").post((req, res) => {
//   res.status(200).json({ message: "ok" });
// });

// export default router;


import { Router } from 'express';
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

export default router;
