import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;


// const { Schema, model, models } = require("mongoose");



// const UserSchema= new Schema({
//  clerkId:{
//     type:String,
//     required:true,
//     unique:true
//  },
//  email:{
// type:String,
//     required:true,
//     unique:true
//  },
//  username:{
// type:String,
//     required:true,
//  }, 
//  photo:{
// type:String,
//     required:true,
//  },
//  firstName:{
// type:String,
//     required:true,
//  },
//  lastName:{
// type:String,
//     required:true,
//  },
// })

// const User =models?.User|| model("User",UserSchema)

// export default User;