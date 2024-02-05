const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result || result.length === 0) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = getContactById;
