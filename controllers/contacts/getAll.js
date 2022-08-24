const { Contact } = require("../../models");
const getAll = async (_, res) => {
  const contacts = await Contact.find({});
  console.log(contacts);
  res.json({
    message: "Success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
