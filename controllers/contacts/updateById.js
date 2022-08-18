const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsOperations.updateContact(contactId, req.body);
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

module.exports = updateById;
