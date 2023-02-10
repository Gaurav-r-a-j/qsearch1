import React, { } from 'react';
import './Support.css';
import Background from '../../components/Background/Background';
// import phone from '../../assets/phone.png'
// import cat1 from '../../assets/cat1.png'
import image32 from '../../assets/32.png'
import image33 from '../../assets/33.png'
// import cat1 from '../../assets/cat1.png'
import Developers from './Developers';
import FAQ from '../../components/FAQ/FAQ';
// import LazyLoad from '../../components/LazyLoading/LazyLoad';
// import { useRef } from 'react';


const Support = () => {
    // const imageRef = useRef();

    const [girlImage, setGirlImage] = React.useState(null);
    const [whatsappImage, setWhatsappImage] = React.useState(null);
    const [printImage, setPrintImage] = React.useState(null);
    const [boyImage, setBoyImage] = React.useState(null);

    React.useEffect(() => {
        const img1 = new Image();
        img1.src = "https://upload-print-blog.s3.ap-south-1.amazonaws.com/girl.webp";
        img1.onload = () => setGirlImage(img1);

        const img2 = new Image();
        img2.src = "https://upload-print-blog.s3.ap-south-1.amazonaws.com/whatsapp.webp";
        img2.onload = () => setWhatsappImage(img2);

        const img3 = new Image();
        img3.src = "https://upload-print-blog.s3.ap-south-1.amazonaws.com/print.webp";
        img3.onload = () => setPrintImage(img3);

        const img4 = new Image();
        img4.src = "https://upload-print-blog.s3.ap-south-1.amazonaws.com/boy.webp";
        img4.onload = () => setBoyImage(img4);
    }, []);



    const handleMessage = () => {
        window.location.href = `https://api.whatsapp.com/send?phone=918582042402&text=Hey , I have a query ->  `
    }

    return (
        <div className="support_container">
            <Background
                image1={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/4.jpeg"}
                image2={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/45.webp"}
            />

            <div className="main_support_options d-flex-center">
                <div className="support_image">
                    {/* <LazyLoad
                        ref={imageRef}
                        src={"https://upload-print-blog.s3.ap-south-1.amazonaws.com/girl.webp"}
                        alt="image1"
                        placeholder="loading.gif"
                        debounce={200}
                    /> */}

                    {girlImage && <img src={girlImage.src} alt="" />}
                    <h3> Assignments </h3>
                </div>
                <div onClick={handleMessage} className="support_image whatsapp_image">
                    {whatsappImage && <img src={whatsappImage.src} alt="" />}
                    <h3> Whatsapp </h3>
                </div>
                <div className="support_image">
                    {printImage && <img src={printImage.src} alt="" />}
                    <h3> Prints </h3>
                </div>
                <div className="support_image">
                    {boyImage && <img src={boyImage.src} alt="" />}
                    <h3> Needs </h3>
                </div>
            </div>

            <div className="support_sections">
                <SupportSections
                    image="https://upload-print-blog.s3.ap-south-1.amazonaws.com/43.webp"
                    heading={"Expert Support for All Your Needs"}
                    text1={
                        `We understand that as a student, you have a lot on your plate, and printing can be just one more thing to worry about. That's why we've created this service specifically for college students. With our fast, convenient, and affordable printing options, you can focus on your studies and leave the printing to us.`
                    }
                    text2={
                        ` Our print service is available exclusively to college students, so you can trust that you're getting the best deals and top-quality service. We offer a variety of printing options, including black and white, color, and large format printing. We also have a range of paper sizes and finishes to choose from, so you can get exactly what you need for your project.`
                    }

                />
                <SupportSections
                    image={image32}
                    heading={"Connecting You with the Right Resources"}
                    text1={
                        `
                        We're committed to providing excellent customer service, so if you have any questions or concerns, don't hesitate to reach out to us. We'll be happy to help you get the prints you need, when you need them.`
                    }

                    text2={
                        `
                        Need some help with your PDF assignments? We've got you covered. From proofreading to formatting, just drop us a message and we'll get it done for you."
                        `
                    }


                />
                <SupportSections
                    image={image33}
                    heading={"Assistance at Your Fingertips"}
                    liText1="Having trouble with your print order? Give us a buzz on WhatsApp and we'll sort it out for you!"
                    liText2="
                    Need some customization for your print job? Just drop us a message on WhatsApp and we'll make it happen!"
                    liText3="Looking for something special for your print job? Just shoot us a message on WhatsApp and we'll make it happen!"
                    liText4="If you have any questions or need help with your print order, just give us a ping on WhatsApp and we'll be happy to assist you!"
                />
            </div>

            <h2 className='special_text '> Need some help with your PDF assignments? We've got you covered. From proofreading to formatting, just drop us a message and we'll get it done for you.</h2>

            <div className="developers">
                <Developers />
            </div>

            <FAQ />


        </div>
    );
}




export const SupportSections = ({ image, heading, text1, text2, liText1, liText2, liText3, liText4 }) => {
    return (
        <div className="support_section d-flex-center">
            <div className="left d-flex-center ">
                <h2>{heading}</h2>
                <p>
                    {text1}
                </p>

                <p>
                    {text2}
                </p>

                <ul className='d-flex-center'>
                    <li>{liText1}</li>
                    <li>{liText2}</li>
                    <li>{liText3}</li>
                    <li>{liText4}</li>

                </ul>

            </div>
            <div className="right">
                <img src={image} alt="" />
            </div>
        </div>
    )
}


export default Support;
