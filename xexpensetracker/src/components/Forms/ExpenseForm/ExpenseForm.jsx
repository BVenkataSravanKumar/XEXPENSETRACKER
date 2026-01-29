import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import Button from "../../Button/Button";
import styles from "./ExpenseForm.module.css";

export default function ExpenseForm({
  setIsOpen,
  expenseList,
  setExpenseList,
  editId,
  setBalance,
  balance,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    date: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (Number(formData.price) > balance) {
      enqueueSnackbar("Price should be less than the wallet balance", {
        variant: "warning",
      });
      return;
    }

    setBalance((prev) => prev - Number(formData.price));

    const lastId = expenseList.length ? expenseList[0].id : 0;
    setExpenseList([{ ...formData, id: lastId + 1 }, ...expenseList]);

    setFormData({ title: "", category: "", price: "", date: "" });
    setIsOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedList = expenseList.map((item) => {
      if (item.id === editId) {
        const priceDiff = item.price - Number(formData.price);

        if (priceDiff < 0 && Math.abs(priceDiff) > balance) {
          enqueueSnackbar("Price should not exceed the wallet balance", {
            variant: "warning",
          });
          return item;
        }

        setBalance((prev) => prev + priceDiff);
        return { ...formData, id: editId };
      }
      return item;
    });

    setExpenseList(updatedList);
    setIsOpen(false);
  };

  useEffect(() => {
    if (editId) {
      const expenseData = expenseList.find((item) => item.id === editId);
      if (expenseData) {
        setFormData({ ...expenseData });
      }
    }
  }, [editId, expenseList]);

  return (
    <div className={styles.formWrapper}>
      <h3>{editId ? "Edit Expense" : "Add Expenses"}</h3>

      <form onSubmit={editId ? handleEdit : handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <Button type="submit" style="primary" shadow>
          {editId ? "Edit Expense" : "Add Expense"}
        </Button>

        <Button
          style="secondary"
          shadow
          handleClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
