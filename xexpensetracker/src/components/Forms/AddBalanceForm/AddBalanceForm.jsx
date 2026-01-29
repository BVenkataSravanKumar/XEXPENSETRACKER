import { useState } from "react";
import { useSnackbar } from "notistack";
import Button from "../../Button/Button";
import styles from "./AddBalanceForm.module.css";

export default function AddBalanceForm({ setIsOpen, setBalance }) {
  const [amount, setAmount] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(amount) <= 0) {
      enqueueSnackbar("Income should be greater than 0", {
        variant: "warning",
      });
      return;
    }
    setBalance((prev) => prev + Number(amount));
    setIsOpen(false);
  };

  return (
    <div className={styles.formWrapper}>
      <h3>Add Balance</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Button type="submit" style="primary" shadow>
          Add Balance
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
