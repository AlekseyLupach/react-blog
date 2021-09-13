import { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [cats, setCat] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tCats, setTCats] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCat(res.data);
    };
    getCats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: tCats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write container">
      <h1 className="writeTitle">New Post</h1>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeFormContainer" onSubmit={handleSubmit}>
        <div className="writeForm">
          <div className="writeFormGroup">
            <div className="writeFormGroupItem">
              <label className="writeFormGroupItemTitle">Image</label>
              <input
                className="fileInput"
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="writeFormGroupItem">
              <label className="writeFormGroupItemTitle">Categories</label>
              <select onChange={(e) => setTCats(e.target.value)}>
                {cats.map((cat) => (
                  <option>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="writeFormGroup">
            <div className="writeFormGroupItem">
              <label className="writeFormGroupItemTitle">Title</label>
              <input
                type="text"
                placeholder="Title"
                className="writeInput"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroupItem">
              <label className="writeFormGroupItemTitle">Description</label>
              <textarea
                placeholder="Tell your story..."
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <button className="writeSubmit" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
