export type PasswordStrengthCheckerProps = {
    password: string;
};

export type FeatureCardProps = {
    imagePath: string;
    cardTitle: string;
    cardDescription: string;
};

export type HeaderProps = {
    name: string;
    page: string;
};

export type Budget = {
    _id: string | null;
    category: string;
    amount: number;
    period: 'week' | 'month' | 'year';
};

export type TransactionStructure = {
    _id: string | null,
    createdBy: string | null,
    transactionName: string,
    amount: number,
    category: string,
    description: string | null,
    paymentMethod: string,
    date: Date,
    transactionType: string
};

export type Category = 'Food' | 'Transport' | 'Health' | 'Education' | 'Entertainment' | 'Shopping' | 'Utilities' | 'Others';

export const categories: Category[] = [
  'Food', 'Transport', 'Health', 'Education', 'Entertainment', 'Shopping', 'Utilities', 'Others'
];