export interface Transaction {
  transferNumber: number;
  transactionType: string;
  description: string;
  date: Date;
  categoryId: number;
}

export const transactions: Transaction[] = [
  {
    transferNumber: 1245,
    transactionType: "despesas",
    description: "Compra de comida",
    date: new Date("2024-06-27"),
    categoryId: 1,
  },
  {
    transferNumber: 2000,
    transactionType: "despesas",
    description: "Compra de comida",
    date: new Date("2024-06-27"),
    categoryId: 1,
  },

  {
    transferNumber: 1245,
    transactionType: "despesas",
    description: "Cinema",
    date: new Date("2024-06-27"),
    categoryId: 3,
  },
  {
    transferNumber: 1245,
    transactionType: "despesas",
    description: "Cinema",
    date: new Date("2024-06-27"),
    categoryId: 4,
  },
  {
    transferNumber: 1245,
    transactionType: "despesas",
    description: "Compra de comida",
    date: new Date("2024-06-27"),
    categoryId: 1,
  },
  {
    transferNumber: 5000,
    transactionType: "receitas",
    description: "Salário",
    date: new Date("2024-06-15"),
    categoryId: 2,
  },
  {
    transferNumber: 5000,
    transactionType: "receitas",
    description: "Salário",
    date: new Date("2024-06-15"),
    categoryId: 2,
  },
  {
    transferNumber: 1970,
    transactionType: "receitas",
    description: "Salário",
    date: new Date("2024-08-15"),
    categoryId: 2,
  },
];
