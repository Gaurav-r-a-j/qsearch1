import express from 'express'
import postController from '../controllers/post.js';
import verifyToken from '../verifyToken.js';
import awsUpload from '../s3.js';
import { upload } from '../s3.js'
// import formDataParser from '../dataParser.js';


const router = express.Router();

router.get('/posts', postController.getAll);
router.get('/posts/page', postController.getPostLimit);
router.get("/categories", postController.getPostCategories);
router.get('/postsId', postController.getPostsId);
router.get('/posts/:id', postController.getById);
router.get('/search', postController.searchPosts);

router.post('/posts', verifyToken, upload.single('postImg'), awsUpload, postController.create);

// router.put('/posts/:id', verifyToken, upload.single('postImg'), awsUpload, postController.update);

router.delete('/posts/:id', verifyToken, postController.delete);


router.put('/posts/:id', verifyToken, (req, res, next) => {
    // If the postImg field is present, perform the file upload and AWS upload
    // if (req.body.postImg) {
    upload.single('postImg')(req, res, (error) => {
        if (req.file) {
            awsUpload(req, res, (error) => {
                if (error) {
                    // If there is an error during the AWS upload, return an error response
                    return res.status(400).send({ message: 'Error while uploading to AWS' });
                }
                // If the AWS upload is successful, proceed to the next middleware function
                next();
            });
        }
        else {
            next()
        }
    });

}, postController.update);


export default router;
