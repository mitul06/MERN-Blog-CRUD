import express from "express";
import {
  getAllBlogPost,
  addBlogPost,
  getSingleBlogPost,
  updateSingleBlogPost,
  deleeteSingleBlogPost,
  likeBlogPost,
} from "../controllers/blogsController.js";

const router = express.Router();

router.get("/all", getAllBlogPost);
router.post("/add", addBlogPost);
router.get("/get/:id", getSingleBlogPost);
router.patch("/update/:id", updateSingleBlogPost);
router.delete("/delete/:id", deleeteSingleBlogPost);
router.patch("/liked/:id", likeBlogPost);

export default router;
