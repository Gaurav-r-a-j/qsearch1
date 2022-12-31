import React from 'react';
import { Link } from 'react-router-dom';
import './Developers.css'

import dev1 from '../../assets/32.png'
// import dev2 from '../../assets/33.png'
import dev3 from '../../assets/43.png'
import dev4 from '../../assets/45.png'

function Developers() {
    return (
        <section className="developers_section">
            <h1>Meet Our Developers</h1>
            <div className="developers_grid ">

                <SingleDeveloper
                    image={dev1}
                    name={"Developer 1"}
                />
                <SingleDeveloper
                    image={dev4}
                    name={"Developer 2"}

                />
                <SingleDeveloper
                    image={dev3}
                    name={"Developer 3"}

                />

            </div>
        </section>
    );
}


export const SingleDeveloper = ({ image, name, desc }) => {
    return (
        <div className="developer glassomorphism">
            <img src={image} alt="Profile pic of Developer 1" />
            <h2>Developer 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <Link to="/developer1">View Profile</Link>
        </div>
    )
}

export default Developers;
