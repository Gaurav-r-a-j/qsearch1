import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css'
import { useContext } from 'react';
import { NotificationContext } from '../../components/CustomNotification/CustomNotification';
import { useSelector } from 'react-redux';
import ErrorPage from '../Error/ErrorPage';

const CreatePost = () => {

    const {user} = useSelector((state) => state.user)


    const { showNotification } = useContext(NotificationContext)
    const [formData, setFormData] = useState({
        postImg: '',
        category: '',
        title: '',
        url: '',
        desc: '',
        author: {
            name: '',
            image: ''
        }
    });

    // console.log(formData)

    // Handle input changes
    const handleChange = event => {
        const { name, value } = event.target;
        // console.log(name)
        const fields = name.split('.');
        // console.log(fields)
        if (fields.length === 1) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [fields[0]]: {
                    ...prevData[fields[0]],
                    [fields[1]]: value
                }
            }));
        }
    };




    // Make the API call to create a new post
    const createPost = async (data) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    // 'Content-Type': 'multipart/form-data'
                }
            };
            const response = await axios.post('https://qsearch.onrender.com/api/post/posts', data, config);
            // const response = await axios.post('http://localhost:5500/api/post/posts', data, config);
            response?.data && showNotification('success', 'Post Created Successfully!', 2000, 'top', 'Post Created Successfully!');
            return response.data;

        } catch (error) {
            console.error(error);
            showNotification('error', 'Something Went Wrong!', 2000, 'top', 'Something Went Wrong!');

            throw error;
        }
    };


    // handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Create the data object for the API call
        const data = new FormData();
        data.append('postImg', formData.postImg);
        data.append('category', formData.category);
        data.append('title', formData.title);
        data.append('url', formData.url);
        data.append('desc', formData.desc);
        data.append('author.name', formData.author.name);
        data.append('author.image', formData.author.image);
        // Make the API call
        console.log("formdata 82", data)
        console.log("formdata set", formData)
        data.forEach((value, key) => {
            console.log(key, value);
        });


        const post = await createPost(data);
        console.log(post)
        // Reset the form
        if (post) {
            setFormData({
                postImg: '',
                category: '',
                title: '',
                url: '',
                desc: '',
                author: {
                    name: '',
                    image: ''
                }
            });
        }
    };



    if (user?.role !== "admin") {
        return (
            // {user && (
            //     <Navigate to="/dashboard" replace={true} />
            //   )}
            <ErrorPage />
            
        )
    }

    return (

        <>
            <div className="create_post_container">

                <form className='form_container' onSubmit={handleSubmit}>
                    <label htmlFor="postImg">Post Image:</label>
                    <input
                        type="file"
                        name="postImg"
                        id="postImg"
                        // onChange={handleChange}
                        onChange={(event) => {
                            console.log(event.target.files[0])
                            setFormData({
                                ...formData,
                                postImg: event.target.files[0]
                            });
                        }}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                    <label htmlFor="desc">Description:</label>
                    <textarea
                        name="desc"
                        id="desc"
                        rows={'5'}
                        value={formData.desc}
                        onChange={handleChange}
                    />
                    <label htmlFor="author.name">Author Name:</label>
                    <input
                        type="text"
                        name="author.name"
                        id="author.name"
                        value={formData.author.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="author.image">Author Image:</label>
                    <input
                        type="file"
                        name="author.image"
                        id="author.image"
                        // onChange={handleChange}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                author: {
                                    ...formData.author,
                                    image: event.target.files[0]
                                }
                            });
                        }}

                    />
                    <button type="submit">Create Post</button>
                </form>

            </div>
        </>

    );
};



export default CreatePost