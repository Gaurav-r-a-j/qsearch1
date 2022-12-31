import React, { useState } from 'react'

const OrderForm = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleMessage = () => {
        window.location.href = `https://api.whatsapp.com/send?phone=918582042402&text=Hi , My name is test`

    }
    return (
        <form >
            {/* <UploadButtons /> */}


            <div className='file file--upload'>
                <label
                    onClick={() => document.getElementById('file').click()}
                    htmlFor='input-file'>
                    <i className="material-icons">cloud_upload</i>

                    {selectedFile ? selectedFile.name : 'Upload'}

                </label>
                <input id='input-file' type='file' onChange={handleChange} />
            </div>

            {/* print info starts here  */}
            <div className="print_info">

                <div className="row">
                    <div className='fill_info d-flex-center'>
                        <label htmlFor='pages'>
                            <span className="material-icons ">
                                layers
                            </span>Pages
                        </label>
                        <input id='pages' type='number' />
                    </div>


                    <div className='fill_info d-flex-center'>
                        <label htmlFor='copies'>
                            <span className="material-icons ">
                                content_copy
                            </span>Copies
                        </label>
                        <input id='copies' type='number' />
                    </div>
                </div>


                <div className='fill_info d-flex-center'>
                    <label htmlFor='sides'>
                        <span className="material-icons ">
                            auto_stories
                        </span>Sides
                    </label>
                    {/* <input id='pages' type='number' /> */}
                    <select name="sides" id="sides">
                        <option value="single side">Single Side</option>
                        <option value="Back 2 Back">Back 2 Back</option>
                    </select>
                </div>


                <div className='fill_info d-flex-center span_2'>
                    <label htmlFor='color'>
                        <span className="material-icons ">
                            palette
                        </span>Color
                    </label>
                    {/* <input id='pages' type='number' /> */}
                    <select name="color" id="color">
                        <option value="BW"> Black & White </option>
                        <option value="Colour"> Colour </option>
                    </select>
                </div>


                <div className='fill_info d-flex-center span_2'>
                    <label htmlFor='binding'>
                        <span className="material-icons binding">
                            padding
                        </span>Binding
                    </label>
                    {/* <input id='pages' type='number' /> */}
                    <select name="binding" id="binding">
                        <option value="none"> No </option>
                        <option value="spiral"> Spiral </option>
                    </select>
                </div>

            </div>
            {/* print info ends here  */}



            <div className="price_info">
                <span> &#8377; 200 </span>
            </div>


            <div className="order_now">
                <button type='submit'> Order Now</button>
            </div>

            <div className="get_support">
                <address
                    className='d-flex-center'
                    onClick={handleMessage}
                >
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/152/152740.png" alt="" /> */}
                    <img src="https://ik.imagekit.io/faskf16pg/Branding/Main/whatapp-sharepal_6GcbqnN5e.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657830361133" alt="" />
                    Get Support
                </address>
            </div>
        </form>
    )
}

export default OrderForm