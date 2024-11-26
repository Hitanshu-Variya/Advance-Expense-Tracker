"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../Controllers/auth.controller");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router.post("/check-auth", verifyToken_1.default, auth_controller_1.checkAuth);
router.post("/signup", auth_controller_1.signup);
router.post("/verify-email", auth_controller_1.verifyEmail);
router.post("/forget-password", auth_controller_1.forgetPassword);
router.post("/reset-password/:token", auth_controller_1.resetPassword);
router.post("/login", auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
exports.default = router;
