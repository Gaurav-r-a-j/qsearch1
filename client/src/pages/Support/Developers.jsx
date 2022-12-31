import React from 'react';
import { Link } from 'react-router-dom';
import './Developers.css'

// import dev2 from '../../assets/33.png'
import dev3 from '../../assets/43.png'

function Developers() {
    return (
        <section className="developers_section">
            <h1>Meet Our Developers</h1>
            <div className="developers_grid ">

                <SingleDeveloper
                    image={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/ayush.webp"}
                    name={"Ayush Kumar"}
                />
                <SingleDeveloper
                    image={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/gaurav.webp"}
                    name={"Gaurav raj"}

                />
                <SingleDeveloper
                    image={dev3}
                    name={"Unknown"}

                />

            </div>
        </section>
    );
}


export const SingleDeveloper = ({ image, name, desc }) => {
    return (
        <div className="developer glassomorphism">
            <img src={image} alt="Profile pic of Developer 1" />
            <h2>{name}</h2>
            <p>{desc}</p>
            <Link to="/developer1">View Profile</Link>
        </div>
    )
}

export default Developers;
