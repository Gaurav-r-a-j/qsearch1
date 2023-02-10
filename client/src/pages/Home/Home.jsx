import React, { useState } from 'react'
import './Home.css'
import Categories from '../../components/Category/Categories'
import Posts from '../../components/Posts/Posts'
import Background from '../../components/Background/Background'
// import globe from '../../assets/3.jpeg'



// const speakWelcome = () => {
//     // Check if the browser supports the Web Speech API
//     if ('speechSynthesis' in window) {
//         // Create a new SpeechSynthesisUtterance object
//         const welcomeMessage = new SpeechSynthesisUtterance(`Happpy new year 2023."Wishing you a year filled with love, laughter, and all your heart's desires. Happy New year again.  `);
//         welcomeMessage.pitch = 1
//         // Set the voice and language for the message
//         welcomeMessage.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Female');
//         welcomeMessage.lang = 'en-GB';

//         // Speak the message
//         window.speechSynthesis.speak(welcomeMessage);
//     }
// }

const Home = () => {
    // useEffect(() => {
    //     speakWelcome()
    // }, [])

    const [cat, setCat] = useState("all")
    const [categories, setCategories] = useState([])

    console.log(categories)

    const handleCat = (e) => {
        setCat(e.target.value)
        console.log(e.target)
    }

    // console.log(window)


    return (
        <div className="home ">
            {/* <ImageSlider /> */}
            <Background
                image1={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/3.webp"}
                image2={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/2.webp"}
            // image2={image30}
            />
            <section className="what_we_provide">
                <h2 >What We Provide?</h2>
                <Categories />
            </section>



            {/* <div className="print_ads d-flex-center">
                <img src="https://upload-print-blog.s3.ap-south-1.amazonaws.com/print_banner.png" usemap="#image-map" />

                <map name="image-map">
                    <area target="" alt="print add" title="print now" href="print" coords="142,316,474,382" shape="rect" />
                </map>
            </div> */}


            <section className="select_category ">
                <h2 className="categories_heading">
                    Categories
                </h2>
                <div className="all_categories">
                    <button onClick={handleCat} className={`single_cat ${(cat === 'all') ? 'active-category' : ""}`} value={'all'}>All</button>

                    {
                        categories.map(item => (
                            <button onClick={handleCat} className={`single_cat ${(item === cat) ? 'active-category' : ""}`} value={item}>{item}</button>
                        ))
                    }
                </div>
                <div className="what_we_provide explore_more">
                    <h2> {cat.toUpperCase()} CONTENT </h2>
                    <Posts cat={cat} setCategories={(data) => setCategories(data)} />
                </div>
            </section>



            {/* <section className="what_we_provide explore_more">
                <h2> SSTARX CONTENT </h2>
                <Posts url={true} cat='sstarx' />
            </section> */}

            {/* <section className="what_we_provide explore_more">
                <h2> Explore  More </h2>
                <Posts url={false} />
            </section> */}
        </div>
    )
}

export default Home