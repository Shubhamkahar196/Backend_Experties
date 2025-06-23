// import mongoose from 'mongoose';

// import { DB_NAME } from '../constrants.js';


// const connectDB = async() =>{
//    try{
//       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
//    }catch(error){
//     console.log("MONGODB connection error", error);
//     process.exit(1)
//    }
// }

// export default connectDB;



import mongoose from 'mongoose';

import { DB_NAME } from '../constrants.js';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    if (!DB_NAME) {
      throw new Error('DB_NAME is not defined');
    }

    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MONGODB connection error', error);
    process.exit(1);
  }
};

export default connectDB;
