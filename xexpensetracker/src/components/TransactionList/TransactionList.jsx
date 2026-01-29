import { useEffect, useState } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import ExpenseForm from "../Forms/ExpenseForm/ExpenseForm";
import styles from "./TransactionList.module.css";

const MAX_RECORDS = 3;

export default function TransactionList({
  transactions,
  title,
  editTransactions,
  balance,
  setBalance,
}) {
  const [editId, setEditId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleDelete = (id) => {
    const transaction = transactions.find((item) => item.id === id);
    if (!transaction) return;

    setBalance((prev) => prev + Number(transaction.price));
    editTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setShowEditor(true);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * MAX_RECORDS;
    const endIndex = currentPage * MAX_RECORDS;

    setCurrentTransactions(transactions.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(transactions.length / MAX_RECORDS));
  }, [currentPage, transactions]);

  useEffect(() => {
    if (currentPage > totalPages && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className={styles.transactionsWrapper}>
      {title && <h2>{title}</h2>}

      {transactions.length ? (
        <div className={styles.list}>
          <div>
            {currentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                details={transaction}
                handleDelete={() => handleDelete(transaction.id)}
                handleEdit={() => handleEdit(transaction.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              updatePage={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <div className={styles.emptyTransactionsWrapper}>
          <p>No transactions!</p>
        </div>
      )}

      <Modal isOpen={showEditor} setIsOpen={setShowEditor}>
        <ExpenseForm
          editId={editId}
          expenseList={transactions}
          setExpenseList={editTransactions}
          setIsOpen={setShowEditor}
          balance={balance}
          setBalance={setBalance}
        />
      </Modal>
    </div>
  );
}
