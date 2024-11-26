"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBudgetAndExpenses = exports.deleteBudget = exports.updateBudget = exports.getBudgetsByUser = void 0;
const budget_model_1 = __importDefault(require("../Models/budget.model"));
const transaction_model_1 = __importDefault(require("../Models/transaction.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getBudgetsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req;
    const userIDObjectId = new mongoose_1.default.Types.ObjectId(userID);
    try {
        const budgets = yield budget_model_1.default.find({ userID: userIDObjectId });
        if (budgets.length === 0) {
            return res.status(404).json({ message: 'No budgets found for this user' });
        }
        res.status(200).json(budgets);
    }
    catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getBudgetsByUser = getBudgetsByUser;
const updateBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { category, amount, period } = req.body;
    try {
        const budget = yield budget_model_1.default.findById(id);
        console.log(budget);
        if (!budget)
            return res.status(404).json({ message: 'Budget not found' });
        if (category)
            budget.category = category;
        if (amount)
            budget.amount = amount;
        if (period)
            budget.period = period;
        yield budget.save();
        res.status(200).json({ message: 'Budget updated successfully', budget });
    }
    catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateBudget = updateBudget;
const deleteBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const budget = yield budget_model_1.default.findByIdAndDelete(id);
        if (!budget)
            return res.status(404).json({ message: 'Budget not found' });
        res.status(200).json({ message: 'Budget deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteBudget = deleteBudget;
const getBudgetAndExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req;
    const userIDObjectId = new mongoose_1.default.Types.ObjectId(userID);
    try {
        const budgets = yield budget_model_1.default.find({ userID: userIDObjectId });
        const transactions = yield transaction_model_1.default.find({ createdBy: userIDObjectId });
        if (budgets.length === 0 && transactions.length === 0) {
            return res.status(400).json({ message: 'No budget or expense data found for this user' });
        }
        const expenses = transactions.filter(tx => tx.transactionType === 'expense');
        res.status(200).json({
            budgets,
            expenses,
        });
    }
    catch (error) {
        console.error('Error fetching budget and expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getBudgetAndExpenses = getBudgetAndExpenses;
