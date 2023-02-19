import React from "react";
import "./Categories.css";
import {Link} from 'react-router-dom'
// import cat1 from '../../assets/cat1.png'
// import cat2 from '../../assets/cat2.png'
// import cat3 from '../../assets/cat3.png'
// import cat4 from '../../assets/cat4.png'
// import cat9 from '../../assets/cat9.png'
// import cat10 from '../../assets/cat10.png'
//Copyrigh by Gaurav raj

const Categories = () => {
    return (
        <div className="categories">

            {/* calculate colums first then rows */}
            <div className="col">
                {/* this is row 1 in col1*/}
                <div className="row glassomorphism_car">
                    <img
                        src={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/cat1.webp"}
                        alt=""
                    />
                    <a className="link" rel="noopener noreferrer" target="blank" href="https://drive.google.com/drive/folders/12Ko6Uyja64ibM6TkYmgMRMGZkut0ge7x">
                        <button>
                            1st Year
                        </button>
                    </a>
                </div>

                {/* this is row 2 in col 1 */}

                <div className="row glassomorphism_car">
                    <img
                        src={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/cat2.webp"}
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

                <div className="row big_row glassomorphism_car">
                    {" "}
                    <img
                        src={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/cat9.webp"}
                        alt=""
                    />
                    <Link to="/print" className="link">
                        <button>
                            print
                        </button>
                    </Link>
                </div>
            </div>


            <div className="col col_l">
                {/* this is row 1 in col3*/}
                <div className="row">

                    <div className="col">
                        <div className="row glassomorphism_car">
                            <img
                                src={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/cat3.webp"}
                                alt=""
                            />
                            <a rel="noopener noreferrer" target="blank" href="https://drive.google.com/drive/folders/1SKmAPoqS3dW3ruPtZGmN1-PjiZBwK5-u" className="link">
                                <button>
                                    3rd YEAR
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row glassomorphism_car">
                            {" "}
                            <img
                                src={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/cat4.webp"}
                                alt=""
                            />
                            <a rel="noopener noreferrer" target="blank" href="https://drive.google.com/drive/folders/1PPVFP4xPJcM6nGPnvV0FArsZ4CKm7B4D" className="link">
                                <button>
                                    4TH YEAR
                                </button>
                            </a>
                        </div>
                    </div>
                </div>


                {/* this is row 2 in cols 3 */}

                <div className="row glassomorphism_car">
                    <img
                        src={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/cat10.webp"}
                        alt=""
                    />
                    <a href="/support" className="link">
                        <button>
                            Technology
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Categories;