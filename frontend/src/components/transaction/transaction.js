//Income and Expense in Edit transition - color change
import css from "./transaction.module.css";
import calendarCss from "./calendar.module.css";
// import axios from "axios";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import List from "../list/list";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

console.log(Calendar);

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
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState(null);
  const [comment, setComment] = useState("");

  const handleModalClose = () => {
    onItemClick();
  };

  const handleSwitchButton = () => {
    setIsIncome(!isIncome);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCategoryClick = () => {
    setShowCategoryList(!showCategoryList);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryList(false);
  };

  const handleAmountChange = (e) => {
    const value = Number(parseFloat(e.target.value).toFixed(2));
    setAmount(value);
  };

  useEffect(() => {
    const handleInputDate = () => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      setInputDate(formattedDate);
    };

    handleInputDate();
  }, [date]);

  const modalContent = (
    <div className={css.modalOverlay}>
      <div
        className={`${css.formWrapper} ${
          isIncome ? "" : css.expenseFormWrapper
        }`}
      >
        <img
          src="/close.svg"
          alt="Close"
          className={css.closeIcon}
          onClick={handleModalClose}
        />
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
          <div className={css.inputGroupRow}>
            <div className={css.inputGroup}>
              <input
                type="number"
                id="amount"
                name="amount"
                className={`${css.input} ${css.amountInput}`}
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>
            <div className={css.inputGroup}>
              <input
                type="text"
                id="date"
                name="date"
                className={`${css.input} ${css.dateInput}`}
                value={inputDate}
                disabled
                required
              />
              <img
                src="/calendar.svg"
                alt="Calendar icon"
                className={css.calendarIcon}
                onClick={toggleCalendar}
              />
            </div>
          </div>
          <div className={css.inputGroup}>
            <textarea
              id="comment"
              name="comment"
              className={`${css.input} ${css.commentInput}`}
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
        {showCalendar && (
          <div className={calendarCss.calendarContainer}>
            <Calendar
            locale="en-US"
              onChange={(selectedDate) => {
                setDate(selectedDate);
                setShowCalendar(false);
              }}
              value={date}
              className={calendarCss.reactCalendar}
            />
          </div>
        )}
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default TransactionForm;
