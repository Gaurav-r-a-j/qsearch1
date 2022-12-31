import Post from "../models/Posts.js";

const postController = {
    create: async (req, res) => {
        try {
            // Create a new post
            // Check if the user is an admin
            // console.log(req.body)

            if (req.user.role !== 'admin') {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // console.log("req.body", req.body, req.res.locals.postImg)

            // Validate the request data
            if (!req.body.title || !req.body.desc || !req.res.locals.fileUrl) {
                return res.status(400).send({ message: 'Missing required fields' });
            }


            // const post = new Post(req.body);
            const post = new Post({
                postImg: req.res.locals.fileUrl,
                category: req.body.category,
                title: req.body.title,
                url: req.body.url,
                desc: req.body.desc,
                author: {
                    name: req.body['author.name'],
                    image: req.body['author.image'],
                },
            });

            await post.save();
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the post' });
        }
    },
    getAll: async (req, res) => {
        try {
            // Get all posts from the database

            // const posts = await Post.find();
            const posts = await Post.find().sort({ createdAt: -1 });
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving the posts' });
        }
    },
    getPostsId: async (req, res) => {
        try {
            // Get all posts from the database
            // const latestPost = await Post.find().sort({ createdAt: -1 }).limit(10);
            //only for _ids
            // const latestPostIds = await Post.find({}, { _id: 1 }).sort({ createdAt: -1 }).limit(10).then(posts => posts.map(post => post._id));
            const latestPosts = await Post.find({}, { _id: 1, title: 1 }).sort({ createdAt: -1 }).limit(10);


            res.json(latestPosts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving the posts' });
        }
    },
    getById: async (req, res) => {
        try {
            // Find the post with the matching id
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving the post' });
        }
    },
    update: async (req, res) => {
        try {
            // Find the post with the matching id and update its fields
            if (req.user.role !== 'admin') {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            // Update the post fields using the request data
            const updatedPost = {
                postImg: req.res.locals.fileUrl,
                category: req.body.category,
                title: req.body.title,
                url: req.body.url,
                desc: req.body.desc,
                author: {
                    name: req.body['author.name'],
                    image: req.body['author.image'],
                },
            };

            // Find the post with the matching id and update its fields
            const post = await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the post' });
        }
    },


    delete: async (req, res) => {
        // console.log(req.body)
        try {
            // Find the post with the matching id and delete it
            if (req.user.role !== 'admin') {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            // res.json(post);
            return res.status(200).json({ message: 'Post deleted successfully', ...post._doc });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the post' });
        }
    },

    searchPosts: async (req, res) => {
        try {
            // Get the search query from the req.query object
            const { q } = req.query;
            // console.log(req.query)

            // Search the posts collection for documents that match the search query
            const results = await Post.find(
                { $or: [{ title: { $regex: q, $options: 'i' } }, { desc: { $regex: q, $options: 'i' } }] }
            );

            // Return the search results to the client
            res.send(results);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while searching the posts' });
        }
    }


};

export default postController;
