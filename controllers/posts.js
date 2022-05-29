const PostsModel = require('../model/post');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const postsControllers = {
  async getPosts(req, res) {
    const allPosts = await PostsModel.find();
    handleSuccess(res, allPosts);
  },
  async createPosts(req, res) {
    try {
      const { body } = req;
      if (!body.content) {
        handleError(res);
      } else {
        const newPost = await PostsModel.create(
          {
            name: body.name,
            content: body.content,
            tags: body.tas,
            type: body.type,
          },
        );
        handleSuccess(res, newPost);
      }
    } catch (err) {
      handleError(res, err.message);
    }
  },
  async patchPosts(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      if (!body.content) {
        handleError(res);
      } else {
        const editPost = await PostsModel.findByIdAndUpdate(
          id,
          {
            name: body.name,
            content: body.content,
            tags: body.tas,
            type: body.type,
          },
          {
            returnDocument: 'after',
          },
        );
        handleSuccess(res, editPost);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async deleteAll(req, res) {
    const deletePosts = await PostsModel.deleteMany({});
    handleSuccess(res, deletePosts);
  },
  async deleteById(req, res) {
    const { id } = req.params;
    try {
      const deletePost = await PostsModel.findByIdAndUpdate(id);
      handleSuccess(res, deletePost);
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = postsControllers;
