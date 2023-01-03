import axios from 'axios';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
// import { useCustomQuery } from '../../hooks/useFetch';
import Card from '../Card/Card'
import LoadingCard from '../Card/LoadingCard';
import './Posts.css'



// const fetchPosts = async () => {
//     try {
//         const res = await axios.get(`http://localhost:5500/api/posts/page?page=${page}`);
//         const fetchedPosts = res.data;
//         setPosts(prevPosts => [...prevPosts, ...fetchedPosts]);
//         setPage(page + 1);
//         setIsLoading(false);
//         if (fetchedPosts.length === 0) {
//             setHasMore(false);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };
const Posts = () => {
    // const [posts, setPosts] = useState([]);
    // const { response, isLoading } = useCustomQuery('/post/posts')
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true);


    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log("increase page value")
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]);

    // const prevPage = useRef(page);

    useEffect(() => {
        // if (prevPage.current === page) return;
        console.log("re rendered")

        const fetchPosts = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`http://localhost:5500/api/post/posts/page?page=${page}`);
                // const res = await axios.get(`https://qsearch.onrender.com/api/post/posts/page?page=${page}`);
                // console.log(posts,res.data)
                setPosts(prevPosts => (prevPosts[0]?._id !== res.data[0]?._id) ? [...prevPosts, ...res.data] : [...prevPosts]);
                setHasMore(res.data.length > 0);
                console.log(res.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchPosts();
        // prevPage.current = page;

    }, [page]);








    return (


        <div className="card_container">

            {
                // (isLoading) ?
                //     <>
                //         <LoadingCard />
                //         <LoadingCard />
                //         <LoadingCard />
                //     </>

                //     :

                // (response?.map((item) => (
                //     <Card
                //         key={item?._id}
                //         postId={item?._id}
                //         postImg={item?.postImg}
                //         title={item?.title}
                //         desc={item?.desc}
                //         cat={item?.category}
                //         author={item?.author ?? "unknwon"}
                //         slug={item?.url}
                //         postedAt={item?.createdAt}
                //     />
                // )))


                (posts.map((item, index) => {
                    if (posts.length === index + 1) {
                        return (
                            <div
                                ref={lastPostElementRef}
                                key={item._id}>
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
                            </div>
                        );
                    } else {
                        return (
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
                        )
                    }
                }))

            }

            {/* <div className='errorLoading'> */}


            {isLoading && (
                <>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </>
            )}



            {/* {error &&
                    <pre>Error....</pre>
                } */}
            {/* </div> */}


        </div>
    )
}




export default memo(Posts)