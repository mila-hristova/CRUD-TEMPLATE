import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePage() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  console.log(params);
  const url = `https://react-crud-10294-default-rtdb.firebaseio.com/posts/${params.id}.json`;
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(url);
      const postData = await response.json();
      console.log(postData);
      setCaption(postData.caption);
      setImage(postData.image);
    }

    getPosts();
  }, [url]);

  async function handleSubmit(event) {
    event.preventDefault();

    const postToUpdate = { caption, image };

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(postToUpdate),
    });

    if (response.ok) {
      navigate(`/posts/${params.id}`);
    } else {
      console.log("Error updating post data");
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <section className="page" id="update-page">
      <div className="container">
        <h1> Update post </h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="caption">Caption</label>
          <input
            id="caption"
            name="caption"
            type="text"
            value={caption}
            aria-label="caption"
            placeholder="Write a caption..."
            onChange={(e) => setCaption(e.target.value)}
          />
          <label htmlFor="image-url">Image</label>
          <input
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="image-preview"></label>
          <img
            id="image-preview"
            className="image-preview"
            src={
              image
                ? image
                : "https://placehold.co/600x400?text=Paste+an+image+URL"
            }
            alt="Choose"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
          />
          <div className="btns">
            <button>Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}
