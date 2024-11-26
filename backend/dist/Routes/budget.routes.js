"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const budget_controller_1 = require("../Controllers/budget.controller");
const router = (0, express_1.Router)();
router.get('/get-budgets', verifyToken_1.default, budget_controller_1.getBudgetsByUser);
router.put('/update-budget/:id', verifyToken_1.default, budget_controller_1.updateBudget);
router.delete('/delete-budget/:id', verifyToken_1.default, budget_controller_1.deleteBudget);
router.get('/summary-budget', verifyToken_1.default, budget_controller_1.getBudgetAndExpenses);
exports.default = router;
