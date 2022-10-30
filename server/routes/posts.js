import express from "express";
import { addPost, getPost, getPosts, deletePost } from "../controllers/post.js";

const router = express.Router();
router.get("/create-post", addPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

export default router;
