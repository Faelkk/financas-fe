export interface Transaction {
  id: string;
  transactionDescription: string;
  transactionValue: string;
  transactionType: "EXPENSE" | "INCOME";
  date: Date;
  categoryId: string;
  userId: string;
}
