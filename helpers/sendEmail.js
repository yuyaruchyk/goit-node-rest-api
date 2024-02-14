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

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "kinedav149@huvacliq.com",
  from: "yulia.yu@meta.ua",
  subject: "Test email",
  html: "<p><strong>Test email</strong> from localhost:3000</p>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

module.exports = email;
