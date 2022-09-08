const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const imageName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarDir, imageName);
  try {
    await fs.rename(tempUpload, resultUpload);
    const file = await jimp.read(resultUpload);
    await file.resize(250, 250).write(resultUpload);
    const avatarURL = path.join("avatars", resultUpload);

    await User.findByIdAndUpdate(req.user.id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
