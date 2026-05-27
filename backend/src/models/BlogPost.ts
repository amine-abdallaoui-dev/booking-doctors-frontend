import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
