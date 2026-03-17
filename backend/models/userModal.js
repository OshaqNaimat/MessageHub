import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      default: null,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
