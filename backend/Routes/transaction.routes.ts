import express from "express";
import verifyToken from "../middleware/verifyToken.ts";
import { getAllTransactions, addTransaction, updateTransaction, deleteTransaction, latestTransaction, totalExpense, totalIncome } from "../Controllers/Transaction.controller.ts";
const router = express.Router();

router.get('/data/get-all-transactions', verifyToken, getAllTransactions);
router.post('/data/add-transaction', verifyToken, addTransaction);
router.put('/data/update-transaction/:id', verifyToken, updateTransaction);
router.delete('/data/delete-transaction/:id', verifyToken, deleteTransaction);
router.get('/data/transactions/latest', verifyToken, latestTransaction);
router.get('/data/transactions/total-income', verifyToken, totalIncome);
router.get('/data/transactions/total-expense', verifyToken, totalExpense);

export default router;  