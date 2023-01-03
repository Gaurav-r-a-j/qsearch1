import React from 'react'




// const LazyLoadingImages = ({ srcs }) => {
//     const [images, setImages] = React.useState([]);

//     React.useEffect(() => {
//         let cancelled = false;

//         srcs.forEach((src) => {
//             window.requestIdleCallback(() => {
//                 if (!cancelled) {
//                     const img = new Image();
//                     img.src = `/images/${src}.jpg`;
//                     img.onload = () => setImages((prevImages) => [...prevImages, img]);
//                 }
//             });
//         });

//         return () => {
//             cancelled = true;
//         };
//     }, [srcs]);

//     return (
//         <div>
//             {images.map((image, index) => (
//                 <img key={index} src={image} alt="A beautiful image" />
//             ))}
//         </div>
//     );
// };

// export default LazyLoadingImages



// for few images like one or two


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
