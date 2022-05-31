const PostsModel = require('../model/PostsModel');
const UsersModel = require('../model/UsersModel');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const postsControllers = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const allPosts = await PostsModel.find(q).populate({
      path: 'user',
      select: 'name photo',
    }).sort(timeSort);
    // asc 遞增(由小到大，由舊到新) createdAt ;
    // desc 遞減(由大到小、由新到舊) "-createdAt"
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
            user: body.user,
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
            user: body.user,
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
