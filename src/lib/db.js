import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cached.conn) {
    console.log("➡ Reusing existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "lms-next-db",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  }

  cached.conn = await cached.promise;
  console.log("🟢 MongoDB connected");

  return cached.conn;
};







// import mongoose from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL;

// // Use a global variable to cache the connection
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export const connect = async () => {
//   if (cached.conn) return 
//    console.log("➡ Reusing existing MongoDB connection");
//   cached.conn; // reuse existing connection

//   cached.promise =
//     cached.promise ||
//     mongoose.connect(MONGODB_URL, {
//       dbName: "lms-next-db",
//       bufferCommands: false,
//       connectTimeoutMS: 30000,
//     });

//   cached.conn = await cached.promise;

//    console.log("MongoDB is connected");
   
//   return cached.conn;
// };



// // import mongoose from "mongoose";

// // const MONGODB_URL=process.env.MONGODB_URL

// // window.mongoose = window.mongoose || null;
// // let cached = window.mongoose;

// // if (!cached){
// //     cached=(window).mongoose={
// //         conn:null,
// //         promise:null
// //     }
// // }

// // export const connect = async()=>{
// //     if (cached.conn) return cached.conn;

// //     cached.promise = cached.promise ||
// //     mongoose.connect(MONGODB_URL,{
// //         dbName:'lms-next-db',
// //         bufferCommands:false,
// //         connectTimeoutMS:30000
// //     })
// //     cached.conn=await cached.promise
// //     return cached
// // }