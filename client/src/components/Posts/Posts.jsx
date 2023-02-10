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




function filterPosts(posts, category) {
    return posts.filter(function (post) {
        return post.category.toLowerCase() === category.toLowerCase();
    });
}

// console.log(filterPosts(posts,"sstarx"))

const cache = new Map();

const Posts = ({ cat, setCategories }) => {
    // const [posts, setPosts] = useState([]);
    // const { response, isLoading } = useCustomQuery('/post/posts')
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true);
    const [requiredPosts, setRequiredPosts] = useState([])


    // function filterCategory(posts, category) {
    //     return posts.filter(function (post) {
    //         return post.category;
    //     });
    // }

    // setCategories(filterCategory)

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
                const res = await axios.get(`http://localhost:5500/api/post/posts/page?page=${page}&cat=${""}`);

                // const res = await axios.get(`https://qsearch.onrender.com/api/post/posts/page?page=${page}`, { cat:"sstarx" });
                // console.log(posts,res.data)
                setPosts(prevPosts => (prevPosts[0]?._id !== res.data[0]?._id) ? [...prevPosts, ...res.data] : [...prevPosts]);
                setHasMore(res.data.length > 0);
                console.log(res.data)
                if (page <= 3)
                    cache.set(`${page}`, res.data);

                cache.forEach((value, key) => {
                    console.log("cache", `${key}: ${value}`);
                });

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        };

        if (cache.has(`${page}`)) {
            console.log("api not called")
            const cachedData = cache.get(`${page}`);
            setPosts(prevPosts => (prevPosts[0]?._id !== cachedData[0]?._id) ? [...prevPosts, ...cachedData] : [...prevPosts]);

            setHasMore(cachedData?.length > 0);
            setIsLoading(false);
        }
        else {
            console.log("api  called")
            fetchPosts();
        }

        // prevPage.current = page;

    }, [page]);




    useEffect(() => {
        (cat !== "all") ?
            setRequiredPosts(filterPosts(posts, cat))
            :
            setRequiredPosts(posts)

        console.log(cat)
    }, [posts, cat])

    useEffect(() => {
        let categories = Array.from(new Set(posts.map(post => post.category)));
        console.log(categories)
        setCategories(categories)
    }, [posts])


    // console.log(posts.filter((item) => {
    //     return item.category="sstarx"
    // }))


    return (


        <>





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




                    (requiredPosts.map((item, index) => {
                        if (requiredPosts.length === index + 1) {
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



                {isLoading && (
                    <>
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                    </>
                )}





            </div>



        </>

    )
}




export default memo(Posts)