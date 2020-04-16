import Transaction from '../models/Transaction';
// import Balance from '../models/Balance';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Result {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTansactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private result: Result;

  private balance: Balance;

  constructor() {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    this.transactions = [];
    this.balance = balance;
    this.result = {
      transactions: this.transactions,
      balance,
    };
  }

  public all(): Result {
    this.result.transactions = this.transactions;
    this.result.balance = this.getBalance();

    return this.result;
  }

  public getBalance(): Balance {
    let somaIncomes = 0;
    let somaOutcome = 0;
    this.transactions.forEach(a => {
      if (a.type === 'income') {
        somaIncomes += a.value;
      } else {
        somaOutcome += a.value;
      }
    });

    this.balance.income = somaIncomes;
    this.balance.outcome = somaOutcome;
    this.balance.total = somaIncomes - somaOutcome;
    return this.balance;
  }

  public create({ title, type, value }: CreateTansactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
