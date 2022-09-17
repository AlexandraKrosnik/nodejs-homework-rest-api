const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

const reVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw BadRequest("Missing required field email");
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  const { verificationToken } = user;
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm the email</a>`,
  };
  await sendEmail(mail);
  res.json({
    email,
  });
};

module.exports = reVerifyEmail;
