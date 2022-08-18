const { BadRequest } = require("http-errors");

const contactsOperations = require("../../models/contacts");

const add = async (req, res) => {
  const contact = await contactsOperations.addContact(req.body);
  if (!contact) {
    throw BadRequest(
      `Contact with phone=${req.body.phone} has already been added!`
    );
  }

  res.status(201).json({
    message: "Success",
    code: 201,
    data: {
      contact,
    },
  });
};

module.exports = add;
