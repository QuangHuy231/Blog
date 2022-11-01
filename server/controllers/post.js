import db from "../connectDB.js";
import jwt from "jsonwebtoken";

export const creatPost = (req, res) => {
  //Check token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    //userInfo chinh la cai object ở jwt.sign
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO posts (`title`,`desc`,`img`,`cat`,`date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created successfully");
    });
  });
};

export const updatePost = (req, res) => {
  //Check token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    //userInfo chinh la cai object ở jwt.sign
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid`=?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
    const postId = req.params.id;
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated successfully");
    });
  });
};

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
};

//Join 2 tables
export const getPost = (req, res) => {
  const q =
    "SELECT posts.id , `username`, `title` , `desc`, posts.img , users.img AS userImg , `cat` FROM users JOIN posts ON users.id=posts.uid WHERE posts.id = ?";
  const postId = req.params.id;
  db.query(q, [postId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const deletePost = (req, res) => {
  //Check token
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    //userInfo chinh la cai object ở jwt.sign
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id`=? AND `uid`=?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post");

      return res.status(200).json("Post has been deleted successfully");
    });
  });
};
