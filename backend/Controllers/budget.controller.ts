import { Request, Response } from 'express';
import BudgetModel from '../Models/budget.model.ts';
import transaction from '../Models/transaction.model.ts';
import mongoose from 'mongoose';

const getBudgetsByUser = async (req: Request, res: Response) => {
  const { userID } = req;
  const userIDObjectId = new mongoose.Types.ObjectId(userID);
  
  try {
    const budgets = await BudgetModel.find({ userID: userIDObjectId });

    if (budgets.length === 0) {
      return res.status(404).json({ message: 'No budgets found for this user' });
    }

    res.status(200).json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBudget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, amount, period } = req.body;

  try {
    const budget = await BudgetModel.findById(id);
    console.log(budget);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    if (category) budget.category = category;
    if (amount) budget.amount = amount;
    if (period) budget.period = period;

    await budget.save();
    res.status(200).json({ message: 'Budget updated successfully', budget });
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBudget = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const budget = await BudgetModel.findByIdAndDelete(id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBudgetAndExpenses = async (req: Request, res: Response) => {
  const { userID } = req; 
  const userIDObjectId = new mongoose.Types.ObjectId(userID);
  
  try {
    const budgets = await BudgetModel.find({ userID: userIDObjectId });
    const transactions = await transaction.find({ createdBy: userIDObjectId });

    if (budgets.length === 0 && transactions.length === 0) {
      return res.status(400).json({ message: 'No budget or expense data found for this user' });
    }

    const expenses = transactions.filter(tx => tx.transactionType === 'expense');
    res.status(200).json({
      budgets,
      expenses,
    });
  } catch (error) {
    console.error('Error fetching budget and expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getBudgetsByUser, updateBudget, deleteBudget, getBudgetAndExpenses };