import css from "./cashflow-list.module.css";
import TransactionForm from "../transaction/transaction";
import { useState } from "react";

const cashflowData = [
  {
    id: 1,
    date: "15.01.25",
    type: "income",
    category: "Salary",
    comment: "Gift for your wife",
    sum: 3500.0,
  },
  {
    id: 2,
    date: "14.01.25",
    type: "expense",
    category: "Groceries",
    comment: "Weekly grocery shopping",
    sum: -125.5,
  },
  {
    id: 3,
    date: "13.01.25",
    type: "income",
    category: "Freelance",
    comment: "Web development project",
    sum: 750.0,
  },
  {
    id: 4,
    date: "12.01.25",
    type: "expense",
    category: "Utilities",
    comment: "Electricity bill",
    sum: -89.2,
  },
  {
    id: 5,
    date: "11.01.25",
    type: "expense",
    category: "Transportation",
    comment: "Gas for car",
    sum: -45.0,
  },
  {
    id: 6,
    date: "10.01.25",
    type: "income",
    category: "Investment",
    comment: "Dividend payment",
    sum: 200.0,
  },
  {
    id: 7,
    date: "09.01.25",
    type: "expense",
    category: "Entertainment",
    comment: "Movie tickets",
    sum: -25.0,
  },
  {
    id: 8,
    date: "08.01.25",
    type: "income",
    category: "Bonus",
    comment: "Performance bonus",
    sum: 500.0,
  },
  {
    id: 9,
    date: "07.01.25",
    type: "expense",
    category: "Healthcare",
    comment: "Doctor visit",
    sum: -150.0,
  },
  {
    id: 10,
    date: "06.01.25",
    type: "income",
    category: "Rental",
    comment: "Property rental income",
    sum: 1200.0,
  },
];

const CashflowList = () => {
  const [showEditTransaction, setShowEditTransaction] = useState(false);

  return (
    <div className={css.listContainer}>
      <ul className={`${css.list} ${css.mobile}`}>
        {cashflowData.map((item) => (
          <li key={item.id} className={`${css.item} ${css[item.type]}`}>
            <div className={css.section}>
              <span className={css.name}>Date</span>
              <span className={css.value}>{item.date}</span>
            </div>
            <div className={css.section}>
              <span className={css.name}>Type</span>
              <span className={css.value}>{item.type}</span>
            </div>
            <div className={css.section}>
              <span className={css.name}>Category</span>
              <span className={css.value}>{item.category}</span>
            </div>
            <div className={css.section}>
              <span className={css.name}>Comment</span>
              <span className={`${css.value} ${css.comment}`}>
                {item.comment}
              </span>
            </div>
            <div className={css.section}>
              <span className={css.name}>Sum</span>
              <span className={css.value}>
                {item.sum >= 0
                  ? `${item.sum.toFixed(2)}`
                  : `${Math.abs(item.sum).toFixed(2)}`}
              </span>
            </div>
            <div className={css.buttons}>
              <button className={css.deleteBtn}>Delete</button>
              <button
                className={css.editBtn}
                onClick={() => setShowEditTransaction(true)}
              >
                <img src="/edit.svg" alt="Edit" className={css.editIcon} />
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ul className={`${css.list} ${css.tablet}`}>
        <div className={css.header}>
          <span>Date</span>
          <span className={css.type}>Type</span>
          <span>Category</span>
          <span className={css.comment}>Comment</span>
          <span>Sum</span>
        </div>
        {cashflowData.map((item) => (
          <li
            key={item.id}
            className={`${css.tabletItem} ${
              item.type === "income" ? css.tabletIncome : css.tabletExpense
            }`}
          >
            <div className={css.dataContainer}>
              <span className={`${css.value} ${css.date}`}>{item.date}</span>
              <span className={`${css.value} ${css.typeValue}`}>
                {item.type === "income" ? "+" : "-"}
              </span>
              <span className={`${css.value} ${css.categoryValue}`}>
                {item.category}
              </span>
              <span className={`${css.value} ${css.commentValue}`}>
                {item.comment}
              </span>
              <span className={`${css.value} ${css.sum}`}>
                {item.sum >= 0
                  ? `${item.sum.toFixed(2)}`
                  : `${Math.abs(item.sum).toFixed(2)}`}
              </span>
            </div>
            <div className={css.buttons}>
              <button className={css.editBtn} onClick={() => setShowEditTransaction(true)}>
                <img src="/edit.svg" alt="Edit" className={css.editIcon} />
              </button>
              <button className={css.deleteBtn}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {showEditTransaction && (
        <div className={css.transactionForm}>
          <TransactionForm onItemClick={() => setShowEditTransaction(false)} isEditing={true} />
        </div>
      )}
    </div>
  );
};

export default CashflowList;
