const tryCatch = (controller_func) => async (req, res, next) => {
  try {
    controller_func(req, res, next);
  } catch (err) {
    console.log('tryctahc error : ',err);
    next(err);
  }
};

module.exports = tryCatch;