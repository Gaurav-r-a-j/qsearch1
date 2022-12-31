import React, { } from 'react'
import './Home.css'
import Categories from '../../components/Category/Categories'
import Posts from '../../components/Posts/Posts'
import Background from '../../components/Background/Background'
import globe from '../../assets/3.jpeg'



// const speakWelcome = () => {
//     // Check if the browser supports the Web Speech API
//     if ('speechSynthesis' in window) {
//         // Create a new SpeechSynthesisUtterance object
//         const welcomeMessage = new SpeechSynthesisUtterance('Welcome to the page');
//         welcomeMessage.pitch = 0.9
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


    console.log(window)


    return (
        <div className="home ">
            {/* <ImageSlider /> */}
            <Background
                image={globe}
                // image2={image30}
            />
            <section className="what_we_provide">
                <h2>What We Provide?</h2>
                <Categories />
            </section>

            <section className="what_we_provide explore_more">
                <h2>Explore More</h2>
                <Posts />
            </section>
        </div>
    )
}

export default Home