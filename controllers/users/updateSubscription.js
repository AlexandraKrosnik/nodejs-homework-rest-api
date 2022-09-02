const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { subscription = "starter" } = req.body;
  console.log(subscription);
  const { id, email } = req.user;
  const user = await User.findByIdAndUpdate(id, { subscription });
  if (!user) {
    throw NotFound(`User with id=${id} not found!`);
  }
  res.status(200).json({
    message: "success",
    code: 200,
    data: {
      user: { email, subscription },
    },
  });
};

module.exports = updateSubscription;
