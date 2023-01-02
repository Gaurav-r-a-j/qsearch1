// import axios from 'axios';
// import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCustomQuery } from '../../hooks/useFetch';
import Card from '../Card/Card'
import LoadingCard from '../Card/LoadingCard';
import './Posts.css'


// export const PostsContext = createContext(null);
const Posts = () => {
    // const [posts, setPosts] = useState([]);

    const { response, isLoading } = useCustomQuery('/post/posts')
    // const { response, isLoading } = useCustomQuery('/post/posts')

    // const [page, setPage] = useState(1);
    // const [posts, setPosts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const observer = useRef();
    // const target = useRef();

    // const onIntersect = useCallback((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             // Increase the page number and fetch the next set of posts
    //             // setPage(page + 1);
    //             axios
    //                 .get(`http://localhost:5500/api/post/posts/page?page=${page}`)
    //                 .then(res => {
    //                     setPosts(prevPosts => [...prevPosts, ...res.data]);
    //                     setPage(page + 1);
    //                 })
    //                 .catch(err => console.error(err));
    //         }
    //     });
    // }, [page]);

    // useEffect(() => {
    //     // Fetch the initial set of posts
    //     axios
    //         .get(`http://localhost:5500/api/post/posts/page?page=${page}`)
    //         .then(res => setPosts(res.data))
    //         .catch(err => console.error(err));

    //     // Set up the IntersectionObserver
    //     const options = {
    //         root: null,
    //         rootMargin: '0px',
    //         threshold: 1.0,
    //     };

    //     // observer.current = new IntersectionObserver(onIntersect, options);
    //     // observer.current.observe(observer.current.target);
    //     observer.current = new IntersectionObserver(onIntersect, options);
    //     observer.current.target = target.current;
    //     observer.current.observe(observer.current.target);

    //     return () => {
    //         // Clean up the IntersectionObserver
    //         observer.current.disconnect();
    //     };

    // }, [onIntersect,page]);




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