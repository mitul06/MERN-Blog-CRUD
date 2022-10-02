import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [String],
  coverImage: {
    type: String,
    required: true,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  author: {
    type: Object,
    required: true
  },
  createdAt: { 
    type: Date,
    default: new Date(),
  },
});

const BlogPostModel = mongoose.model("Blog", blogSchema);

export default BlogPostModel;
