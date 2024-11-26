"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BudgetSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Types.ObjectId,
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
const BudgetModel = (0, mongoose_1.model)('Budget', BudgetSchema);
exports.default = BudgetModel;
