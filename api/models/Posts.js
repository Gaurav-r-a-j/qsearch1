import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  postImg: {
    type: String,
    required: true
  },
  category: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  desc: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
    }
  },
},{ timestamps: true });

export default mongoose.model('Post', postSchema);


