import { Request, Response } from 'express';
import { Types } from 'mongoose';
import transaction from '../Models/transaction.model';

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transaction.find({ createdBy: req.userID });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
    console.log(error);
  }
};

const addTransaction = async (req: Request, res: Response) => {
  try {
    const { transactionName, amount, category, description, paymentMethod, date, transactionType } = req.body;
    const newTransaction = new transaction({
      createdBy: req.userID as unknown as Types.ObjectId, 
      transactionName,
      amount,
      category,
      description,
      paymentMethod,
      date,
      transactionType
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error adding transaction' });
    console.log(error);
  }
};

const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const { userID } = req; 

    const updatedTransaction = await transaction.findOneAndUpdate({ _id: id, createdBy: userID }, req.body, {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(updatedTransaction);

  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(400).json({ message: 'Error updating transaction' });
  }
};


const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting transaction' });
  }
};

const latestTransaction = async (req: Request, res: Response) => {
  try {
    const { userID } = req; 
    const transactions = await transaction.find({ createdBy: userID }).sort({ date: -1 }).limit(10);
    res.status(200).json(transactions);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

const totalIncome = async (req: Request, res: Response) => {
  try {
    const [totalIncomeResult] = await transaction.aggregate([
      { $match: { transactionType: 'income' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const recentIncomeTransactions = await transaction
      .find({ transactionType: 'income' })
      .sort({ date: -1 }) 
      .limit(10)          
      .select("amount");  

    const totalIncome = totalIncomeResult?.total || 0;
    const incomeAmounts = recentIncomeTransactions.map(tx => tx.amount);

    res.status(200).json({ totalIncome, transactions: incomeAmounts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total income" });
  }
};

const totalExpense = async (req: Request, res: Response) => {
  try {
    const [totalExpenseResult] = await transaction.aggregate([
      { $match: { transactionType: 'expense' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const recentExpenseTransactions = await transaction
      .find({ transactionType: 'expense' })
      .sort({ date: -1 })  
      .limit(10)           
      .select("amount");   

    const totalExpense = totalExpenseResult?.total || 0;
    const expenseAmounts = recentExpenseTransactions.map(tx => tx.amount);

    res.status(200).json({ totalExpense, transactions: expenseAmounts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total expense" });
  }
};

export { getAllTransactions, addTransaction, updateTransaction, deleteTransaction, latestTransaction, totalExpense, totalIncome };