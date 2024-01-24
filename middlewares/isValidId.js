const { isValidObjectId } = require("mongoose");
const { HtppError } = require("../utils");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    next(HtppError(400, `{id} is not valid id`));
  }
  next();
};

module.exports = {
  isValidId,
};
