const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { auth, validation, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
