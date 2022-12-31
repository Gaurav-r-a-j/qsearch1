import React, { } from 'react'
import useFetch from '../../hooks/useFetch';
import Card from '../Card/Card'
import LoadingCard from '../Card/LoadingCard';
import './Posts.css'


// export const PostsContext = createContext(null);
const Posts = () => {
    // const [posts, setPosts] = useState([]);

    const { response, isLoading } = useFetch('/post/posts')
    console.log(response)


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
                        postId = {item?._id}
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
        </div>
    )
}




export default Posts