import css from "./cashflow-list.module.css";

const cashflowData = [
  {
    id: 1,
    date: "2025-01-15",
    type: "income",
    category: "Salary",
    comment: "Monthly salary payment",
    sum: 3500.0,
  },
  {
    id: 2,
    date: "2025-01-14",
    type: "expense",
    category: "Groceries",
    comment: "Weekly grocery shopping",
    sum: -125.5,
  },
  {
    id: 3,
    date: "2025-01-13",
    type: "income",
    category: "Freelance",
    comment: "Web development project",
    sum: 750.0,
  },
  {
    id: 4,
    date: "2025-01-12",
    type: "expense",
    category: "Utilities",
    comment: "Electricity bill",
    sum: -89.2,
  },
  {
    id: 5,
    date: "2025-01-11",
    type: "expense",
    category: "Transportation",
    comment: "Gas for car",
    sum: -45.0,
  },
  {
    id: 6,
    date: "2025-01-10",
    type: "income",
    category: "Investment",
    comment: "Dividend payment",
    sum: 200.0,
  },
  {
    id: 7,
    date: "2025-01-09",
    type: "expense",
    category: "Entertainment",
    comment: "Movie tickets",
    sum: -25.0,
  },
  {
    id: 8,
    date: "2025-01-08",
    type: "income",
    category: "Bonus",
    comment: "Performance bonus",
    sum: 500.0,
  },
  {
    id: 9,
    date: "2025-01-07",
    type: "expense",
    category: "Healthcare",
    comment: "Doctor visit",
    sum: -150.0,
  },
  {
    id: 10,
    date: "2025-01-06",
    type: "income",
    category: "Rental",
    comment: "Property rental income",
    sum: 1200.0,
  },
];

const CashflowList = () => {
  return (
    <div className={css.listContainer}>
      <ul className={css.list}>
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
              <span className={`${css.value} ${css.comment}`}>{item.comment}</span>
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
              <button className={css.editBtn}>
                <img src="/edit.svg" alt="Edit" className={css.editIcon} />
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CashflowList;
