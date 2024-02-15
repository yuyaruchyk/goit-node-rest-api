const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = User.findOne({ email });
  console.log(user);

  if (!user) {
    throw HttpError(400, "Email not a found");
  }

  if (user.verify) {
    throw HttpError(401, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    from: "yulia.yu@meta.ua",
    subject: "Verify Email!",
    text: "Hello world?",
    html: `<h1>Hello, kindly click on the link below to verify your account✔</h1>
    <a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
