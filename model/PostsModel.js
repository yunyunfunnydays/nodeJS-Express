const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    tags: [
      {
        type: String,
        required: [true, '貼文標籤 tags 未填寫'],
      },
    ],
    type: {
      type: String,
      enum: ['group', 'person'],
      required: [true, '貼文類型 type 未填寫'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'user ID 未填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    createAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
);

const PostsModel = mongoose.model('posts', postsSchema);

module.exports = PostsModel;
