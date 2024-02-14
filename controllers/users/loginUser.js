const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password invalid" });
  }
  if (!user.verify) {
    return res.status(401).json({ message: "Email not varified" });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({ message: "Password is wrong" });
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  const { subscription } = user;
  res.status(200).json({
    token,
    user: { email, subscription },
  });
};

module.exports = loginUser;
