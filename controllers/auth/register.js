const { User } = require("../../models");
const { Conflict } = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm the email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    message: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
