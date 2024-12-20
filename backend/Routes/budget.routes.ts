import { Router } from 'express';
import verifyToken from "../middleware/verifyToken";
import { getBudgetsByUser, updateBudget, deleteBudget, getBudgetAndExpenses } from '../Controllers/budget.controller';

const router = Router();

router.get('/get-budgets', verifyToken, getBudgetsByUser);
router.put('/update-budget/:id', verifyToken, updateBudget);
router.delete('/delete-budget/:id', verifyToken, deleteBudget);
router.get('/summary-budget', verifyToken, getBudgetAndExpenses);

export default router;
