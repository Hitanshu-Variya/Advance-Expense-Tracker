"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    createdBy: {
        type: mongoose_1.Types.ObjectId,
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
        required: true,
        default: 'Food'
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
}, { timestamps: true });
const transaction = (0, mongoose_1.model)("Transaction", TransactionSchema);
exports.default = transaction;
