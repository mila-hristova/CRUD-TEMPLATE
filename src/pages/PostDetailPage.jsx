import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function PostDetailPage() {
  const [post, setPost] = useState({});
  const params = useParams();
  const url = `https://react-crud-10294-default-rtdb.firebaseio.com/posts/${params.id}.json`;
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(url);
      const postData = await response.json();
      console.log(postData);
      setPost(postData);
    }

    getPosts();
  }, [url]);

  function navigateToUpdate() {
    navigate(`/posts/${params.id}/update`);
  }

  async function handleDelete() {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (shouldDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1> {post.caption}</h1>
        <PostCard post={post} />
        <div className="btns">
          <button className="btn-cancel" onClick={handleDelete}>
            {" "}
            Delete post{" "}
          </button>
          <button onClick={navigateToUpdate}> Update post </button>
        </div>
      </div>
    </section>
  );
}
