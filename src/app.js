// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';

// const app = express();


// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))


// app.use(express.json({limit: "16kb"}))  // kinta request lena hai
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())  // for cookie 


// // routes import 

// import userRouter from './routes/user.routes.js'


// // router declaration 
// app.use("/api/v1/users",userRouter)


// //http://localhost:8000/api/v1/users/register


// export { app }

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// app.use(express.json({ limit: "16kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js';

// router declaration
app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export { app };
