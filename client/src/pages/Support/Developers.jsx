import React from 'react';
import { Link } from 'react-router-dom';
import './Developers.css'

function Developers() {
    return (
        <section className="developers_section">
            <h1>Meet Our Family</h1>
            <div className="developers_grid ">

                <SingleDeveloper
                    image={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/ayush.webp"}
                    name={"Ayush Kumar"}
                    title={"content manager"}
                />
                <SingleDeveloper
                    image={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/gaurav.webp"}
                    name={"Gaurav raj"}
                    title={"Developer"}

                />
                <SingleDeveloper
                    image={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/43.webp"}
                    name={"Unknown"}
                    title="....."

                />

            </div>
        </section>
    );
}


export const SingleDeveloper = ({ image, name, desc, title }) => {
    return (
        <div className="developer glassomorphism">
            <img src={image} alt="Profile pic of Developer 1" />
            <h2>{name}</h2>
            <span>{title}</span>
            <p>{desc}</p>
            <Link to="/developer1">View Profile</Link>
        </div>
    )
}

export default Developers;
