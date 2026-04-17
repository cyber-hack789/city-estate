// ============================================
// Chat Mongoose Model
// ============================================

import mongoose, { Schema, models, model, Document, Types } from "mongoose";

export interface IChatMessage {
  sender: Types.ObjectId;
  content: string;
  readAt?: Date;
  createdAt: Date;
}

export interface IChat {
  participants: Types.ObjectId[];
  property?: Types.ObjectId;
  messages: IChatMessage[];
  lastMessage?: string;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatDocument extends IChat, Document {
  _id: Types.ObjectId;
}

const ChatSchema = new Schema<IChatDocument>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
        },
        readAt: {
          type: Date,
          default: null,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastMessage: {
      type: String,
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ChatSchema.index({ participants: 1 });
ChatSchema.index({ participants: 1, lastMessageAt: -1 });

const Chat =
  (models.Chat as mongoose.Model<IChatDocument>) ||
  model<IChatDocument>("Chat", ChatSchema);

export default Chat;
