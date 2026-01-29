import styles from "./Button.module.css";

export default function Button({
  children,
  handleClick,
  style = "primary",
  shadow = false,
  type = "button",
}) {
  const className = `
    ${styles.button}
    ${styles[style]}
    ${shadow ? styles.shadow : ""}
  `;

  return (
    <button type={type} onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
