import Modal from "react-modal";
import styles from "./Modal.module.css";

Modal.setAppElement("#root");

export default function ModalWrapper({ isOpen, setIsOpen, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      {children}
    </Modal>
  );
}
