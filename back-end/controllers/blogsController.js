import express from "express";
import mongoose from "mongoose";

import BlogPostModel from "../models/blogs.js";
const router = express.Router();

const getAllBlogPost = async (req, res) => {
  try {
    const blogPosts = await BlogPostModel.find();
    res.status(200).json({
      success: true,
      blogPosts,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const addBlogPost = async (req, res) => {
  
  const createNewPost = new BlogPostModel(req.body);

  try {
    await createNewPost.save();
    res
      .status(201)
      .json({ success: true, message: "Post Created Successfully" });
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

const getSingleBlogPost = async (req, res) => {
  const { id } = req.params;

  try {
    const singlePost = await BlogPostModel.findById(id);
    res.status(200).json({
      success: true,
      data: singlePost,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateSingleBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, description, fileUpload, creator, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .send({ success: false, message: `Post ${id} not found` });
  }

  const updatePost = {
    creator,
    title,
    description,
    tags,
    fileUpload,
    _id: id,
  };

  await BlogPostModel.findByIdAndUpdate(id, updatePost, { new: true });
  res.json({
    success: true,
    message: "Post Updated Successfully",
  });
};

const deleeteSingleBlogPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .send({ success: false, message: `Post ${id} not found` });
  }

  await BlogPostModel.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Post Deleted Successfully",
  });
};

const likeBlogPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .send({ success: false, message: `Post ${id} not found` });
  }

  const post = await BlogPostModel.findById(id);

  if (post === null) {
    return res.status(404).send({ success: false, message: `Post not found` });
  }

  await BlogPostModel.findByIdAndUpdate(
    id,
    { upvote: post.upvote + 1 },
    { new: true }
  );

  res.json({
    success: true,
    message: "Post Liked Successfully",
  });
};

export {
  getAllBlogPost,
  addBlogPost,
  getSingleBlogPost,
  updateSingleBlogPost,
  deleeteSingleBlogPost,
  likeBlogPost,
};
