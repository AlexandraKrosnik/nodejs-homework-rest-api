const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw NotFound(`Contact with id=${contactId} not found!`);
  }
  res.json({
    message: "Success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = getById;
