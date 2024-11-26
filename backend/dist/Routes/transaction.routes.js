"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const Transaction_controller_1 = require("../Controllers/Transaction.controller");
const router = express_1.default.Router();
router.get('/get-all-transactions', verifyToken_1.default, Transaction_controller_1.getAllTransactions);
router.get('/get-transactions/:id', verifyToken_1.default, Transaction_controller_1.getAllTransactionsBYID);
router.get('/get-by-category/:category', verifyToken_1.default, Transaction_controller_1.getTransactionsByCategory);
router.post('/add-transaction', verifyToken_1.default, Transaction_controller_1.addTransaction);
router.put('/update-transaction/:id', verifyToken_1.default, Transaction_controller_1.updateTransaction);
router.delete('/delete-transaction/:id', verifyToken_1.default, Transaction_controller_1.deleteTransaction);
router.get('/transactions/latest', verifyToken_1.default, Transaction_controller_1.latestTransaction);
router.get('/transactions/total-income', verifyToken_1.default, Transaction_controller_1.totalIncome);
router.get('/transactions/total-expense', verifyToken_1.default, Transaction_controller_1.totalExpense);
exports.default = router;
