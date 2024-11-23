import { Schema, model, Types } from "mongoose";
import { TransactionStructure } from "../Interfaces/Interfaces";

const TransactionSchema = new Schema<TransactionStructure>({
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transactionName: {
        type: String,
        maxlength: 25, 
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['Food', 'Transport', 'Health', 'Education', 'Entertainment', 'Shopping', 'Utilities', 'Others'],
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'credit', 'debit', 'other'],
        default: 'cash'
    },
    date: {
        type: Date,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['income', 'expense'],
        default: 'income'
    }
}, {timestamps: true});

const transaction = model<TransactionStructure>("Transaction", TransactionSchema);
export default transaction;