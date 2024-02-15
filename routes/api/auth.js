const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { userSchemas } = require("../../models");
const ctrl = require("../../controllers");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrl.registerUser
);
authRouter.get("/verify/:verificationToken", ctrl.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(userSchemas.verifyEmailSchema),
  ctrl.resendVerifyEmail
);

authRouter.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  ctrl.loginUser
);
authRouter.get("/current", authenticate, ctrl.getCurrentUser);
authRouter.post("/logout", authenticate, ctrl.logoutUser);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = authRouter;
