import css from "./cashflow-list.module.css";
import TransactionForm from "../transaction/transaction";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ClipLoader from "react-spinners/ClipLoader";

const CashflowList = () => {
  const [showEditTransaction, setShowEditTransaction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cashflowData, setCashflowData] = useState([]);

  const formatDate = (date) => format(new Date(date), "dd.MM.yyyy");

  const fetchCashflowData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/home", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCashflowData(response.data.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCashflowData();
  }, []);

  return (
    <div className={css.listContainer}>
            {loading ? (
        <div className={css.spinnerContainer}>
          <ClipLoader color="#4A56E2" size={100} />
        </div>
      ) : (
        <>
      <ul className={`${css.list} ${css.mobile}`}>
        {cashflowData.map((item) => (
          <li key={item._id} className={`${css.item} ${css[item.type]}`}>
            <div className={css.section}>
              <span className={css.name}>Date</span>
              <span className={css.value}>{formatDate(item.date)}</span>
            </div>
            <div className={css.section}>
              <span className={css.name}>Type</span>
              <span className={css.value}>{item.type}</span>
            </div>
            <div className={css.section}>
              <span className={css.name}>Category</span>
              <span className={css.value}>
                {item.type === "income" ? "Income" : item.category}
              </span>
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
                {item.amount >= 0
                  ? `${item.amount.toFixed(2)}`
                  : `${Math.abs(item.amount).toFixed(2)}`}
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
            key={item._id}
            className={`${css.tabletItem} ${
              item.type === "income" ? css.tabletIncome : css.tabletExpense
            }`}
          >
            <div className={css.dataContainer}>
              <span className={`${css.value} ${css.date}`}>
                {formatDate(item.date)}
              </span>
              <span className={`${css.value} ${css.typeValue}`}>
                {item.type === "income" ? "+" : "-"}
              </span>
              <span className={`${css.value} ${css.categoryValue}`}>
                {item.type === "income" ? "Income" : item.category}
              </span>
              <span className={`${css.value} ${css.commentValue}`}>
                {item.comment}
              </span>
              <span className={`${css.value} ${css.sum}`}>
                {item.amount >= 0
                  ? `${item.amount.toFixed(2)}`
                  : `${Math.abs(item.amount).toFixed(2)}`}
              </span>
            </div>
            <div className={css.buttons}>
              <button
                className={css.editBtn}
                onClick={() => setShowEditTransaction(true)}
              >
                <img src="/edit.svg" alt="Edit" className={css.editIcon} />
              </button>
              <button className={css.deleteBtn}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </>
      )}
      {showEditTransaction && (
        <div className={css.transactionForm}>
          <TransactionForm
            onItemClick={() => setShowEditTransaction(false)}
            isEditing={true}
          />
        </div>
      )}
    </div>
  );
};

export default CashflowList;
