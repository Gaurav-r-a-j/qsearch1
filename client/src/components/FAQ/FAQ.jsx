import React from 'react'
import './faq.css'
const FAQ = () => {
    return (
        <>
            <div className="faq_section">
                <div className='faq_heading'>
                    <h2>FAQs</h2>
                    <p>Answers to the most frequently asked questions.</p>
                </div>



                <SingleFaq
                    questoin={"What types of notes and assignments do you offer?"}
                    answer={"We offer notes and assignments for various colleges and universities of India."}
                />

                <SingleFaq
                    questoin={"Are the notes and assignments written by experts in the field ?"}
                    answer={"Yes, all of our notes and assignments are written by experienced professors or subject matter experts."}
                />

                <SingleFaq
                    questoin={"Do you offer notes and assignments for all college years?"}
                    answer={"Yes, we offer notes and assignments for all college years, including freshman, sophomore, junior, and senior."}
                />

                <SingleFaq
                    questoin={"Can I request a specific note or assignment if it is not available on your website?"}
                    answer={"Yes, you can contact us to request a specific note or assignment. We will do our best to fulfill your request."}
                />

                <SingleFaq
                    questoin={"How do I access the notes and assignments?"}
                    answer={"You can access the notes and assignments by our home page section by choosing your year it will directly open your your drive from there you can get the notes and assignment."}
                />

                <SingleFaq
                    questoin={"How do I access the notes and assignments?"}
                    answer={"You can access the notes and assignments by our home page section by choosing your year it will directly open your your drive from there you can get the notes and assignment."}
                />
                <SingleFaq
                    questoin={"Is there a cost to access the notes and assignments ?"}
                    answer={"No there is no charge and subscription this platform is non profitable and it doesn't charge any type of money."}
                />
                <SingleFaq
                    questoin={"Do you also offer a blog on your website??"}
                    answer={"Yes, we have a blog on our website that covers a variety of topics related to college and education. Our blog features articles, tips, and resources for students to help them succeed in college and beyond."}
                />

                {/* //Copyrigh by Gaurav raj */}

            </div>
        </>
    )
}


const SingleFaq = ({ questoin, answer }) => {
    return (
        <details>
            <summary>
                <h4>{questoin} </h4>
                <span className="material-icons">expand_more</span>
            </summary>
            <p> {answer}</p>
        </details>
    )
}


export default FAQ