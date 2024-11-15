import mongoose, { Schema, model, Types } from 'mongoose';
import { Budget } from '../Interfaces/Interfaces';

const BudgetSchema = new Schema<Budget>({
  userID: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    enum: ['week', 'month', 'year'],
    required: true,
  },
});

const BudgetModel = model<Budget>('Budget', BudgetSchema);
export default BudgetModel;
