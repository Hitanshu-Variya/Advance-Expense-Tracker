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
exports.totalIncome = exports.totalExpense = exports.latestTransaction = exports.deleteTransaction = exports.updateTransaction = exports.addTransaction = exports.getTransactionsByCategory = exports.getAllTransactionsBYID = exports.getAllTransactions = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_model_1 = __importDefault(require("../Models/transaction.model"));
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_model_1.default.find({ createdBy: req.userID });
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
        console.log(error);
    }
});
exports.getAllTransactions = getAllTransactions;
const getAllTransactionsBYID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_model_1.default.find({ _id: req.params.id });
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
        console.log(error);
    }
});
exports.getAllTransactionsBYID = getAllTransactionsBYID;
const getTransactionsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req;
    const { category } = req.params;
    try {
        const transactions = yield transaction_model_1.default.find({ category: category, createdBy: userID });
        const incomeTransactions = transactions.filter(tx => tx.transactionType === 'income');
        const expenseTransactions = transactions.filter(tx => tx.transactionType === 'expense');
        const totalIncome = incomeTransactions.reduce((acc, tx) => acc + tx.amount, 0);
        const totalExpense = expenseTransactions.reduce((acc, tx) => acc + tx.amount, 0);
        res.json({ totalIncome, totalExpense });
    }
    catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});
exports.getTransactionsByCategory = getTransactionsByCategory;
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionName, amount, category, description, paymentMethod, date, transactionType } = req.body;
        const newTransaction = new transaction_model_1.default({
            createdBy: req.userID,
            transactionName,
            amount,
            category,
            description,
            paymentMethod,
            date,
            transactionType: transactionType.toLowerCase()
        });
        yield newTransaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        res.status(400).json({ message: 'Error adding transaction' });
        console.log(error);
    }
});
exports.addTransaction = addTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedTransaction = yield transaction_model_1.default.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(updatedTransaction);
    }
    catch (error) {
        console.error('Error updating transaction:', error);
        res.status(400).json({ message: 'Error updating transaction' });
    }
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield transaction_model_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting transaction' });
    }
});
exports.deleteTransaction = deleteTransaction;
const latestTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req;
        const transactions = yield transaction_model_1.default.find({ createdBy: userID }).sort({ date: -1 }).limit(10);
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});
exports.latestTransaction = latestTransaction;
const totalIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req;
        const userIDObjectId = new mongoose_1.default.Types.ObjectId(userID);
        const [totalIncomeResult] = yield transaction_model_1.default.aggregate([
            { $match: { transactionType: 'income', createdBy: userIDObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const recentIncomeTransactions = yield transaction_model_1.default
            .find({ transactionType: 'income', createdBy: userIDObjectId })
            .sort({ date: -1 })
            .limit(10)
            .select("amount");
        const totalIncome = (totalIncomeResult === null || totalIncomeResult === void 0 ? void 0 : totalIncomeResult.total) || 0;
        const incomeAmounts = recentIncomeTransactions.map(tx => tx.amount);
        res.status(200).json({ totalIncome, transactions: incomeAmounts });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch total income" });
    }
});
exports.totalIncome = totalIncome;
const totalExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req;
        const userIDObjectId = new mongoose_1.default.Types.ObjectId(userID);
        const [totalExpenseResult] = yield transaction_model_1.default.aggregate([
            { $match: { transactionType: 'expense', createdBy: userIDObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const recentExpenseTransactions = yield transaction_model_1.default
            .find({ transactionType: 'expense', createdBy: userIDObjectId })
            .sort({ date: -1 })
            .limit(10)
            .select("amount");
        const totalExpense = (totalExpenseResult === null || totalExpenseResult === void 0 ? void 0 : totalExpenseResult.total) || 0;
        const expenseAmounts = recentExpenseTransactions.map(tx => tx.amount);
        res.status(200).json({ totalExpense, transactions: expenseAmounts });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch total expense" });
    }
});
exports.totalExpense = totalExpense;
