import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { randomImage } from '../../generic_functions/smallFunctions'
import "./ImageSlider.css"
import svg1 from '../../assets/background.svg'
import svg3 from '../../assets/background3.svg'
import svg4 from '../../assets/background4.svg'
import robot from '../../assets/robot2.png'
// import { PostsContext } from '../Posts/Posts'
// import useFetch from '../../hooks/useFetch'
// import { useRef } from 'react'
import api from '../../axios'

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const sliderImage = [{ urls1: svg3, urls2: svg3 }, { urls1: svg1, urls2: svg1 }, { urls1: svg4, urls2: svg4 },]
const len = sliderImage.length - 1;

const ImageSlider = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // useEffect(() => {
    //     // console.log("inside image slider useev")
    //     const interval = setInterval(() => {
    //         setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    //     }, 2000);
    //     return () => clearInterval(interval);
    // }, [activeIndex]);

    return (
        <div className="slider-container mt62">
            <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} />
            <Arrows
                prevSlide={() =>
                    setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
                }
                nextSlide={() =>
                    setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
                }
            />
            <Dots
                activeIndex={activeIndex}
                sliderImage={sliderImage}
                onclick={(activeIndex) => setActiveIndex(activeIndex)}
            />
        </div>
    )
}

const Arrows = ({ prevSlide, nextSlide }) => {
    return (
        <div className="arrows">
            <span className="prev" onClick={prevSlide}>
                &#10094;
            </span>
            <span className="next" onClick={nextSlide}>
                &#10095;
            </span>
        </div>
    )
}


const Dots = ({ activeIndex, onclick, sliderImage }) => {
    return (
        <div className="all-dots d-flex-center">
            {sliderImage.map((slide, index) => (
                <span
                    key={index}
                    className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
                    onClick={() => onclick(index)}
                ></span>
            ))}
        </div>
    )
}

const SliderContent = ({ activeIndex, sliderImage }) => {

    const handleSlide = () => {
        if (window.innerWidth < 680) {
            window.scrollTo(0, 320)
        } else {
            window.scrollTo(0, 520);
        }
        // console.log("clicked")
    }

    // console.log('this')
    return (
        <section className='homeSlider'>
            {sliderImage.map((slide, index) => (
                <div
                    key={index}
                    className={index === activeIndex ? "slides active" : "inactive"}
                >


                    <picture >
                        <source media="(max-width: 699px)" srcSet={slide.urls2} />
                        <img className='slide-image' src={slide.urls1} alt="home background" />
                    </picture>


                    <div className="robot_image">
                        <img src={robot} alt="" />
                    </div>
                </div>
            ))}

            <div className='slide-title'>
                <h2> Your search for the best<Link to='/print'>  <span > Printing </span> </Link> ends here!</h2>
                <button onClick={handleSlide} className='getStartedBtn br10 fw400'>Print Now</button>
                <Search />
            </div>


        </section>
    )
}

export const Search = () => {
    const [query, setQuery] = useState('');
    // const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        const { data } = await api.get(`/post/search?q=${query}`);
        console.log(data)
        // history.push(`/search?q=${query}`, { results: data });
    };


    return (
        <div className="glassomorphism main_search">
            <form onSubmit={handleSubmit} className="glassomorphism main_search">
                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    type="search"
                    placeholder='Search here' />
                {/* <span>&#128269;</span> */}

                <button type="submit" className='search_button'>
                    <span
                        className="material-icons">
                        search
                    </span>
                </button>

            </form>


        </div>
    )
}

export default ImageSlider