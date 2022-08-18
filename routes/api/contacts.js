const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { contactsSchema } = require("../../schemas");
const { validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();
const validateMiddelware = validation(contactsSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddelware, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validateMiddelware, ctrlWrapper(ctrl.updateById));

module.exports = router;
