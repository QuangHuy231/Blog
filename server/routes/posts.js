import express from "express";
import { addPost, getPosts } from "../controllers/post.js";

const router = express.Router();
router.get("/create-post", addPost);
router.get("/", getPosts);

export default router;
