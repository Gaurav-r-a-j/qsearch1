import React from "react";
import "./Categories.css";
import cat1 from '../../assets/cat1.png'
import cat2 from '../../assets/cat2.png'
import cat3 from '../../assets/cat3.png'
import cat4 from '../../assets/cat4.png'
import cat9 from '../../assets/cat9.png'
import cat10 from '../../assets/cat10.png'


const Categories = () => {
    return (
        <div className="categories">

            {/* calculate colums first then rows */}
            <div className="col">
                {/* this is row 1 in col1*/}
                <div className="row glassomorphism_card">
                    <img
                        src={cat1}
                        alt=""
                    />
                    <a className="link" rel="noopener noreferrer" target="blank" href="https://drive.google.com/drive/folders/12Ko6Uyja64ibM6TkYmgMRMGZkut0ge7x">
                        <button>
                            1st Year
                        </button>
                    </a>
                </div>

                {/* this is row 2 in col 1 */}

                <div className="row glassomorphism_card">
                    <img
                        src={cat2}
                        alt=""
                    />
                    <a rel="noopener noreferrer" target="blank" href="https://drive.google.com/drive/folders/1bB1RjQWypyPhtOZ6ooyg5hpgd9lHAbVa" className="link">
                        <button>
                            2nd Year
                        </button>
                    </a>
                </div>
            </div>


            <div className="col">
                {/* this is row 1 in col 2*/}

                <div className="row big_row glassomorphism_card">
                    {" "}
                    <img
                        src={cat9}
                        alt=""
                    />
                    <a href="/products/1" className="link">
                        <button>
                            New Season
                        </button>
                    </a>
                </div>
            </div>


            <div className="col col_l">
                {/* this is row 1 in col3*/}
                <div className="row">

                    <div className="col">
                        <div className="row glassomorphism_card">
                            <img
                                src={cat3}
                                alt=""
                            />
                            <a href="/products/1" className="link">
                                <button>
                                    Men
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row glassomorphism_card">
                            {" "}
                            <img
                                src={cat4}
                                alt=""
                            />
                            <a href="/products/1" className="link">
                                <button>
                                    Accessories
                                </button>
                            </a>
                        </div>
                    </div>
                </div>


                {/* this is row 2 in cols 3 */}

                <div className="row glassomorphism_card">
                    <img
                        src={cat10}
                        alt=""
                    />
                    <a href="/products/1" className="link">
                        <button>
                            Shoes
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Categories;