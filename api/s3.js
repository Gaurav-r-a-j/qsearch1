import AWS from 'aws-sdk';
import multer from 'multer';
// import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config();


const storage = multer.memoryStorage();
// Set up Multer to parse the file field
// export const upload = multer({ dest: 'uploads/' });
export const upload = multer({ storage: storage });


// Set up AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});

// Middleware function to handle file uploads
const awsUpload = (req, res, next) => {
    console.log(req)
    // Upload the file to S3
    const s3 = new AWS.S3();
    const params = {
        Bucket: 'upload-print-blog',
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        // ACL: 'public-read'
    };
    s3.upload(params, (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }

        // Set the URL of the uploaded file in the response body
        // res.locals.postImg = data.Location;
        res.locals.fileUrl = data.Location;

        // Call the next middleware function
        next();
    });
};




export default awsUpload



