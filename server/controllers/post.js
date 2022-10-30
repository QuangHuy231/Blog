import db from "../connectDB.js";

export const addPost = (req, res) => {
  res.json("from controller");
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
    "SELECT `username`, `title` , `desc`, p.img, u.img AS userImg , `cat` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";
  const postId = req.params.id;
  db.query(q, [postId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const deletePost = (req, res) => {};
