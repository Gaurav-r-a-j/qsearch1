import React, { } from 'react'
import './Print.css'
import svg2 from '../../assets/background2.svg'
import image42 from '../../assets/42.png'
import PrintOrderForm from '../../components/OrdrContainer/printOrderForm'
import Search from '../../components/Search/Search'



const Print = () => {


    return (
        <div className="print">
            <div className="print_banner">
                <figure>
                    <img src={svg2} alt="banner for printing informatin" />
                </figure>

                <div className="print_search">
                    <Search />
                </div>
            </div>

            <div className="print_container">


                <div className="left d-flex-center">
                    <figure>
                        <img src="https://upload-print-blog.s3.ap-south-1.amazonaws.com/42.webp" alt="print file example" />
                    </figure>
                </div>


                <div className="right">

                    {/* <OrderForm /> */}
                    <PrintOrderForm />

                    {/* form ends here  */}


                </div>


            </div>
        </div>
    )
}







export const UploadButtons = () => {
    // const [selectedFile, setSelectedFile] = useState(null);

    return (
        <div className="variants">
            {/* <div className='file'>
                <label htmlFor='input-file'>
                    <i className="material-icons">cloud_queue
                    </i>Select a file
                </label>
                <input id='input-file' type='file' />
            </div> */}

            <div className='file file--upload'>
                <label htmlFor='input-file'>
                    <i className="material-icons">cloud_upload</i>Upload
                </label>
                <input id='input-file' type='file' />
            </div>



            {/* <div className='file file--uploading'>
                <label htmlFor='input-file'>
                    <i className="material-icons">cloud_upload</i>Uploading
                </label>
                <input id='input-file' type='file' />
            </div> */}

            {/* <div className='file file--success'>
                <label htmlFor='input-file'>
                    <i className="material-icons">cloud_done</i>Success
                </label>
                <input id='input-file' type='file' />
            </div>

            <div className='file file--danger'>
                <label htmlFor='input-file'>
                    <i className="material-icons">cloud_off</i>Error
                </label>
                <input id='input-file' type='file' />
            </div>

            <div className='file file--disabled'>
                <label htmlFor='input-file'>
                    <i className="material-icons">lock</i>Disabled
                </label>
                <input id='input-file' type='file' />
            </div> */}
        </div>

    )
}

export default Print