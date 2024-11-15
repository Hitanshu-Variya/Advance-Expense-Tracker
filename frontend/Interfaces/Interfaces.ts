export type PasswordStrengthCheckerProps = {
    password: string;
}

export type FeatureCardProps = {
    imagePath: string;
    cardTitle: string;
    cardDescription: string;
}

export type HeaderProps = {
    name: string;
    page: string;
}

export type Budget = {
    _id: string | null;
    category: string;
    amount: number;
    period: 'week' | 'month' | 'year';
}

export type Category = 'Food' | 'Transport' | 'Health' | 'Education' | 'Entertainment' | 'Shopping' | 'Utilities' | 'Others';

export const categories: Category[] = [
  'Food', 'Transport', 'Health', 'Education', 'Entertainment', 'Shopping', 'Utilities', 'Others'
];