import Button from "../Button/Button";
import styles from "./Card.module.css";

export default function Card({
  title,
  money,
  buttonText,
  buttonType,
  handleClick,
  success = true,
}) {
  const amountClass = success ? styles.success : styles.failure;

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        {title}: <span className={amountClass}>₹{money}</span>
      </h3>

      <Button style={buttonType} handleClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  );
}
