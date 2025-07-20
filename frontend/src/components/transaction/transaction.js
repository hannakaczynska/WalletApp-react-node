//Income and Expense in Edit transition - color change
import css from "./transaction.module.css";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import List from "../list/list";

const categoryOptions = [
  "Main expenses",
  "Products",
  "Car",
  "Self care",
  "Child care",
  "Household products",
  "Education",
  "Leisure",
  "Other expenses",
  "Entertainment",
];

const TransactionForm = ({ onItemClick, isEditing }) => {
  const [isIncome, setIsIncome] = useState(true);
  const [date, setDate] = useState("");
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    setDate(formattedDate);
  }, []);

  const handleModalClose = () => {
    onItemClick();
  };

  const handleSwitchButton = () => {
    setIsIncome(!isIncome);
  };

  const handleCategoryClick = () => {
    setShowCategoryList(!showCategoryList);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryList(false);
  };

  const modalContent = (
    <div className={css.modalOverlay}>
      <div
        className={`${css.formWrapper} ${
          isIncome ? "" : css.expenseFormWrapper
        }`}
      >
        {isEditing ? (
          <h2 className={css.formTitle}>Edit transaction</h2>
        ) : (
          <h2 className={css.formTitle}>Add transaction</h2>
        )}

        <div
          className={
            css.switchContainer + (isEditing ? ` ${css.infoContainer}` : "")
          }
        >
          <div className={isIncome ? css.income : css.text}>Income</div>
          {isEditing ? (
            <img src="/slash.svg" alt="/" className={css.slashIcon} />
          ) : (
            <div className={css.switchButton} onClick={handleSwitchButton}>
              {isIncome ? (
                <img src="/add.svg" alt="Add" className={css.plusIcon} />
              ) : (
                <img src="/minus.svg" alt="Minus" className={css.minusIcon} />
              )}
            </div>
          )}
          <div className={!isIncome ? css.expense : css.text}>Expense</div>
        </div>

        <form className={css.form}>
          {!isIncome && (
            <div className={css.inputGroup} onClick={handleCategoryClick}>
              <input
                type="text"
                id="category"
                name="category"
                className={`${css.input} ${css.categoryInput}`}
                value={selectedCategory}
                placeholder="Select a category"
                disabled
              />
              <img src="/arrow.svg" alt="Arrow" className={css.arrowIcon} />
              {showCategoryList && (
                <div className={css.listContainer}>
                  <List
                    data={categoryOptions}
                    onItemClick={handleCategorySelect}
                    isCategoryList={true}
                  />
                </div>
              )}
            </div>
          )}
          <div className={css.inputGroup}>
            <input
              type="number"
              id="amount"
              name="amount"
              className={`${css.input} ${css.amountInput}`}
              placeholder="0.00"
              required
            />
          </div>
          <div className={css.inputGroup}>
            <input
              type="text"
              id="date"
              name="date"
              className={css.input}
              value={date}
              disabled
              required
            />
            <img
              src="/calendar.svg"
              alt="Calendar icon"
              className={css.calendarIcon}
            />
          </div>
          <div className={css.inputGroup}>
            <textarea
              id="comment"
              name="comment"
              className={`${css.input} ${css.commentInput}`}
              placeholder="Comment"
              required
            ></textarea>
          </div>
          <div className={css.buttonGroup}>
            {isEditing ? (
              <button
                type="submit"
                className={css.saveButton}
                onClick={handleModalClose}
              >
                save
              </button>
            ) : (
              <button
                type="submit"
                className={css.addButton}
                onClick={handleModalClose}
              >
                add
              </button>
            )}
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleModalClose}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default TransactionForm;
