// const { User } = require("../../models");
const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.status(200).json({
    message: "success",
    code: 200,
    data: {
      user: { email },
    },
  });
};

module.exports = getCurrent;
