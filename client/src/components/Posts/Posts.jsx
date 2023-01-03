// import axios from 'axios';
// import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCustomQuery } from '../../hooks/useFetch';
import Card from '../Card/Card'
import LoadingCard from '../Card/LoadingCard';
import './Posts.css'



// const fetchPosts = async (page) => {
//     try {
//         const res = await axios.get(`http://localhost:5500/api/posts/page?page=${page}`);
//         const posts = res.data;
//         return posts;
//     } catch (error) {
//         console.error(error);
//     }
// };

// export const PostsContext = createContext(null);
const Posts = () => {
    // const [posts, setPosts] = useState([]);

    const { response, isLoading } = useCustomQuery('/post/posts')


    return (


        <div className="card_container">

            {(isLoading) ?
                <>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </>

                :

                (response?.map((item) => (
                    <Card
                        key={item?._id}
                        postId={item?._id}
                        postImg={item?.postImg}
                        title={item?.title}
                        desc={item?.desc}
                        cat={item?.category}
                        author={item?.author ?? "unknwon"}
                        slug={item?.url}
                        postedAt={item?.createdAt}
                    />
                )))

            }

            {/* <div ref={target}></div> */}

        </div>
    )
}




export default Posts