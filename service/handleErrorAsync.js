const handleErrorAsync = (func) => (res, req, next) => {
  func(res, req, next)
    .catch((err) => {
      next(err);
    });
};

module.exports = handleErrorAsync;
