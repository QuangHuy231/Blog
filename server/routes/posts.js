import express from "express";
import {
  getPost,
  getPosts,
  deletePost,
  updatePost,
  creatPost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.post("/", creatPost);

export default router;
