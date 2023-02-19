import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../axios'
import { getTimeAgo } from '../../generic_functions/smallFunctions';
import { NotificationContext } from '../CustomNotification/CustomNotification';
import DeleteModal from '../Modal/DeleteModal';
import './Card.css'
const Card = ({ postImg, title, desc, cat, author, slug, postId, postedAt }) => {
    const { showNotification } = React.useContext(NotificationContext);



    const [modalOpen, setModalOpen] = useState(false);
    const handleDelete = async (e) => {
        // showNotification('success', 'Post deleted successfully', 2000, 'top', 'Post Deleted Successfully!');
        e.preventDefault();
        setModalOpen(true)
    }
    const { user } = useSelector((state) => state.user)



    const handleConfirm = async () => {
        // Send a DELETE request to the server to delete the post
        try {
            const { data } = await api.delete(`/post/posts/${postId}`)
            // localhost:5500/api/post/posts/63ac23e52ef56b74f5d82574
            showNotification('info', 'Post deleted successfully', 2000, 'top', 'Post Deleted Successfully!');
            console.log('post deleted', data)
            setModalOpen(false);
        } catch (error) {
            console.log(error)
            showNotification('error', 'Something Went Wrong!', 2000, 'top', 'Something Went Wrong!!');

        }
    }

    const handleCancel = () => {
        // Close the modal
        setModalOpen(false);
    }


    return (
        <>

            {modalOpen &&
                (<DeleteModal
                    text={"post"}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />)
            }

            <div className="card glassomorphism">
                <div className="card_header d-flex-center ">
                    <img src={postImg ?? "https://source.unsplash.com/random/?computer"} alt="card__image" className="card__image" />
                    {/* tab-brown tag-red also available*/}
                    {/* <span className="tag tag-blue">Technology</span> */}
                    {user?.role === 'admin'
                        &&
                        (<span
                            onClick={handleDelete}
                            className="material-icons delete_btn">
                            delete
                        </span>)
                    }
                </div>
                <div className="card_body">
                    <span className={`tag tag-blue`}>{cat ?? "general"}</span>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                </div>
                <div className="card_footer d-flex-spaceb">
                    <div className="user">
                        <img src="https://upload-print-blog.s3.ap-south-1.amazonaws.com/ayush.webp" alt="user__image" className="user__image" />
                        <div className="user__info">
                            <h5>{author?.name ?? "unknown"}</h5>
                            <small>{getTimeAgo(postedAt)}</small>
                        </div>
                    </div>

                    {(slug === "" || null || undefined) ?
                        (<button className="read_more_btn">
                            <Link to={`/post/${postId}`}>Read More </Link>
                        </button>)
                        :
                        (<button className="read_more_btn url_btn">
                            <a href={`${slug}`}> Explore </a>
                        </button>)
                    }
                </div>
            </div>


            {/* <div className="card">
                <div className="card_header">
                    <img src="https://source.unsplash.com/600x400/?food" alt="card__image" className="card__image" width={600} />
                </div>
                <div className="card_body">
                    <span className="tag tag-red">Food</span>
                    <h4>Delicious Food</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!</p>
                </div>
                <div className="card_footer">
                    <div className="user">
                        <img src="https://i.pravatar.cc/40?img=2" alt="user__image" className="user__image" />
                        <div className="user__info">
                            <h5>Jony Doe</h5>
                            <small>Yesterday</small>
                        </div>
                    </div>
                </div>
            </div> */}





            {/* </div> */}
        </>
    )
}




export default Card