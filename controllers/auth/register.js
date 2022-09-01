const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    message: "succes",
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = register;
