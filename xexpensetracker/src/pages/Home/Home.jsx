import { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import TransactionList from "../../components/TransactionList/TransactionList";
import ExpenseForm from "../../components/Forms/ExpenseForm/ExpenseForm";
import Modal from "../../components/Modal/Modal";
import AddBalanceForm from "../../components/Forms/AddBalanceForm/AddBalanceForm";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);

  const totalExpense = useMemo(
    () =>
      expenseList.reduce(
        (sum, item) => sum + Number(item.price),
        0
      ),
    [expenseList]
  );

  const { categorySpends, categoryCount } = useMemo(() => {
    const spends = {
      food: 0,
      entertainment: 0,
      travel: 0,
    };

    const count = {
      food: 0,
      entertainment: 0,
      travel: 0,
    };

    expenseList.forEach(({ category, price }) => {
      spends[category] += Number(price);
      count[category]++;
    });

    return { categorySpends: spends, categoryCount: count };
  }, [expenseList]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));

    setBalance(storedBalance ? Number(storedBalance) : 5000);
    setExpenseList(storedExpenses || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }
  }, [expenseList, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance, isMounted]);

  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>

      <div className={styles.cardsWrapper}>
        <Card
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={() => setIsOpenBalance(true)}
        />

        <Card
          title="Expenses"
          money={totalExpense}
          buttonText="+ Add Expense"
          buttonType="failure"
          success={false}
          handleClick={() => setIsOpenExpense(true)}
        />

        <PieChart
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ]}
        />
      </div>

      <div className={styles.transactionsWrapper}>
        <TransactionList
          title="Recent Transactions"
          transactions={expenseList}
          editTransactions={setExpenseList}
          balance={balance}
          setBalance={setBalance}
        />

        <BarChart
          data={[
            { name: "Food", value: categoryCount.food },
            { name: "Entertainment", value: categoryCount.entertainment },
            { name: "Travel", value: categoryCount.travel },
          ]}
        />
      </div>

      <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <ExpenseForm
          setIsOpen={setIsOpenExpense}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          balance={balance}
          setBalance={setBalance}
        />
      </Modal>

      <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <AddBalanceForm
          setIsOpen={setIsOpenBalance}
          setBalance={setBalance}
        />
      </Modal>
    </div>
  );
}
