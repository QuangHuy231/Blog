import React, { useState } from "react";

import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state.desc);
  const [title, setTitle] = useState(state.title);
  const [file, setFile] = useState(state.img);
  const [cat, setCat] = useState(state.cat);

  const upload = async (e) => {
    try {
      const base64 = await convertBase64(file);
      return base64;
    } catch (err) {
      console.log(err);
    }
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await upload();
      await axios.put(`/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img: imgUrl,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          name=""
          id=""
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <input
            className="editor"
            theme="snow"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>

          <span>
            <b>Visiblity:</b> Public
          </span>

          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label className="file" htmlFor="file">
            Upload Image
          </label>

          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="science"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="scinece">Scinece</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cinema"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="design"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="food"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
