const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.status(201).json(result);
};

module.exports = createContact;
