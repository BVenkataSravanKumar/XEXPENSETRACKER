import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import styles from "./Pagination.module.css";

export default function Pagination({ updatePage, currentPage, totalPages }) {
  const handlePrev = () => {
    if (currentPage > 1) updatePage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) updatePage((prev) => prev + 1);
  };

  return (
    <div className={styles.paginationWrapper}>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        <IoIosArrowRoundBack />
      </button>

      <p>{currentPage}</p>

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        <IoIosArrowRoundForward />
      </button>
    </div>
  );
}
