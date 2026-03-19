import mongoose from "mongoose";
import { timeStamp } from "node:console";

const chatSchema = mongoose.Schema(
  {
    chats: {
      type: Array,
      default: [],
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timeStamp: true,
  },
);

export const Chat = mongoose.model("Chat", chatSchema);
