import React, { useEffect, useMemo, useState } from 'react';
import './SinglePostPage.css';
import { Link, useParams } from 'react-router-dom';
import api from '../../axios';
import Background from '../../components/Background/Background';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRef } from 'react';
import { getTimeAgo } from '../../generic_functions/smallFunctions';

function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [postIds, setPostIds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Add this state to track if the form is in edit mode

  const user = useSelector((state) => state.user)
  const { id } = useParams();
  console.log(isLoading)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(`/post/posts/${id}`);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  useMemo(() => {
    const fetchIds = async () => {
      try {
        const postIds = await api.get(`/post/postsId`);
        console.log(postIds);
        setPostIds(postIds.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchIds();
  }, []);


  const topRef = useRef(null)
  const handleScrollTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  }


  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className=" single_post_page">
      <Background />

      {/* {isLoading ? (
        <p>Loading...</p>
      ) : */}

      {!isEditing &&
        (
          <div ref={topRef} className=" single_post_container d-flex-center">


            <div className="left glassomorphism">
              {post && (
                <main className="single_post ">
                  <div className="single_post_image">
                    <img src={post?.postImg} alt={post.title} />
                  </div>
                  <>
                    <h2 className="title">{post?.title}</h2>
                    <p className="single_post_desc">{post?.desc}</p>
                    <div className="author_info">
                      <p>Author: {post?.author?.name ?? "unknown"}
                        <span>"{getTimeAgo(post?.createdAt)}"</span>
                      </p>
                    </div>
                    <p className="single_post_category">Category: {post?.category}</p>
                  </>
                  {user.role === 'admin' && !isEditing && (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                  )}
                </main>
              )}
            </div>


            <div className="right glassomorphism d-flex-center">
              <aside>
                <h2 className='glassomorphism'>Latest Posts </h2>
                <ul>
                  {postIds?.map((item) => (
                    <li key={item._id}>
                      <Link onClick={handleScrollTop} to={`/post/${item._id}`}>{item?.title}</Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        )}

      {/* } */}

      {isEditing && (
        <EditPostForm post={post} closeEdit={() => setIsEditing(false)} setPost={setPost} />
      )}


    </div>
  );
}








export const EditPostForm = ({ post, closeEdit, setPost }) => {
  // Use the useState hook to manage the form data
  const [formData, setFormData] = useState({
    postImg: post.postImg,
    category: post.category,
    title: post.title,
    url: post.url,
    desc: post.desc,
  });


  // Add an onChange event handler to update the form data as the user types
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  // Make the API call to create a new post
  const updatePost = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      const response = await axios.put(`https://qsearch.onrender.com/api/post/posts/${post._id}`, data, config);
      return response.data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  };



  // Add a function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      // Check if the postImg field has changed
      if (formData.postImg !== post.postImg) {
        data.append('postImg', formData.postImg);
      }
      // Check if the category field has changed
      if (formData.category !== post.category) {
        data.append('category', formData.category);
      }
      // Check if the title field has changed
      if (formData.title !== post.title) {
        data.append('title', formData.title);
      }
      // Check if the url field has changed
      if (formData.url !== post.url) {
        data.append('url', formData.url);
      }
      // Check if the desc field has changed
      if (formData.desc !== post.desc) {
        data.append('desc', formData.desc);
      }
      data.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await updatePost(data)
      setPost(response);  // Update the post state with the updated post data
      console.log(response)
      closeEdit()
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <form className='edit-post-form' onSubmit={handleSubmit}>
      {/* Include input fields for each field that you want to update */}
      <label htmlFor="postImg">Post Image</label>
      <input
        type="file"
        id="postImg"
        name="postImg"
        onChange={(event) => {
          setFormData({
            ...formData,
            postImg: event.target.files[0]
          });
        }}
      />
      <br />
      <label htmlFor="category">Category</label>
      <input
        type="text"
        id="category"
        name="category"
        onChange={handleChange}
        value={formData.category}
      // defaultValue={post.category}

      />
      <br />
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={handleChange}
        value={formData.title}
      // defaultValue={post.title}
      />
      <br />
      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        name="url"
        onChange={handleChange}
        value={formData.url}
      />
      <br />
      <label htmlFor="desc">Description</label>
      <textarea
        id="desc"
        name="desc"
        onChange={handleChange}
        value={formData.desc}
      />
      <br />
      <button type="submit">Update Post</button>
    </form>
  );
};



export default SinglePostPage;
