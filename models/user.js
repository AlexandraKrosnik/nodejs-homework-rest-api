const { Schema, model } = require("mongoose");
const Joi = require("joi");

const regEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: regEmail,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(regEmail),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(regEmail),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const User = model("user", userSchema);

module.exports = { User, joiRegisterSchema, joiLoginSchema };
