import React from 'react'
import { Link } from 'react-router-dom'


const SearchResultCard = ({ postImg, title, desc, cat, author, slug, postId }) => {
    return (
        <div className=" glassomorphism search_card">
            <div className=" search_result_image">
                <img src={postImg ?? "https://source.unsplash.com/random/?computer"} alt="card__image" className="card__image" />
                {/* tab-brown tag-red also availabel */}
                {/* <span className="tag tag-blue">Technology</span> */}
            </div>
            <div className="card_body search_result_card_body">
                <span className={`tag tag-blue`}>{cat ?? "general"}</span>
                <h4>{title}</h4>
                <p>{desc}</p>

                <div className="card_footer search_result_card_footer">
                    <div className="user">
                        <img src="https://upload-print-blog.s3.ap-south-1.amazonaws.com/ayush.webp" alt="user__image" className="user__image" />
                        <div className="user__info">
                            <h5>{author.name}</h5>
                            <small>2h ago</small>
                        </div>
                    </div>
                    {/* <button className="read_more_btn ">
                        <Link className='glassomorphism' to={`/post/${postId}`}>Read More </Link>
                    </button> */}

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
        </div>

    )
}

export default SearchResultCard