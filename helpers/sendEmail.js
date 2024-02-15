const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "yulia.yu@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (emailOptions) => {
  transporter
    .sendMail(emailOptions)

    .catch((err) => console.log(err.message));
};

module.exports = sendEmail;
