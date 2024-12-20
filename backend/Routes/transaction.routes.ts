import express from "express";
import verifyToken from "../middleware/verifyToken";
import { getAllTransactions, getAllTransactionsBYID, getTransactionsByCategory, addTransaction, updateTransaction, deleteTransaction, latestTransaction, totalExpense, totalIncome } from "../Controllers/Transaction.controller";
const router = express.Router();

router.get('/get-all-transactions', verifyToken, getAllTransactions);
router.get('/get-transactions/:id', verifyToken, getAllTransactionsBYID);
router.get('/get-by-category/:category', verifyToken, getTransactionsByCategory);
router.post('/add-transaction', verifyToken, addTransaction);
router.put('/update-transaction/:id', verifyToken, updateTransaction);
router.delete('/delete-transaction/:id', verifyToken, deleteTransaction);
router.get('/transactions/latest', verifyToken, latestTransaction);
router.get('/transactions/total-income', verifyToken, totalIncome);
router.get('/transactions/total-expense', verifyToken, totalExpense);

export default router;  