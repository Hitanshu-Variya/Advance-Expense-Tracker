"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("../Controllers/profile.controller");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router.get('/get-profile', verifyToken_1.default, profile_controller_1.getProfile);
router.put('/update-profile', verifyToken_1.default, profile_controller_1.updateProfile);
exports.default = router;
