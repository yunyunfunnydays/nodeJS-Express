const PostsModel = require('../model/PostsModel');
const UsersModel = require('../model/UsersModel');
const handleSuccess = require('../service/handleSuccess');
const appError = require('../service/appError');

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
  async createPosts(req, res, next) {
    const { body } = req;
    if (!body.content) {
      appError(400, '未有填寫 content 資料', next);
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
  },
  async patchPosts(req, res, next) {
    const { id } = req.params;
    const { body } = req;
    if (!body.content) {
      appError(400, '未有填寫 content 資料', next);
    } else {
      const oriPost = await PostsModel.findById(id);
      if (req.user.id !== oriPost.user.tostring) {
        appError(400, '無編輯權限', next);
      }
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
      if (!editPost) {
        appError(400, '未有對應的id', next);
      } else {
        handleSuccess(res, editPost);
      }
    }
  },
  async deleteAll(req, res, next) {
    const deletePosts = await PostsModel.deleteMany({});
    handleSuccess(res, deletePosts);
  },
  async deleteById(req, res, next) {
    const { id } = req.params;
    const oriPost = await PostsModel.findById(id);
    if (req.user.id !== oriPost.user.tostring) {
      appError(400, '無刪除權限', next);
    }
    const deletePost = await PostsModel.findByIdAndDelete(id);
    if (!deletePost) {
      appError(400, '未有對應的id', next);
    } else {
      handleSuccess(res, deletePost);
    }
  },
};

module.exports = postsControllers;
