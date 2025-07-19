import css from "./diagram.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";
import List from "../list/list";

const data = [
  { name: "Other expenses", value: 610.0 },
  { name: "Leisure", value: 1230.0 },
  { name: "Education", value: 3400.0 },
  { name: "Household products", value: 300.0 },
  { name: "Child care", value: 2208.5 },
  { name: "Self care", value: 800.0 },
  { name: "Car", value: 1500.0 },
  { name: "Products", value: 3800.74 },
  { name: "Main expenses", value: 8700.0 },
];

const COLORS = [
  "#00AD84",
  "#24CCA7",
  "#81E1FF",
  "#4A56E2",
  "#6E78E8",
  "#C5BAFF",
  "#FD9498",
  "#FFD8D0",
  "#FED057",
];

const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const yearOptions = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

const Diagram = () => {
  const amount = "24 000.00";
  const income = "27 350.00"

  const [showMonthList, setShowMonthList] = useState(false);
  const [showYearList, setShowYearList] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [selectedYear, setSelectedYear] = useState("2025");

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowMonthList(false);
  };

    const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowYearList(false);
  };

    const handleMonthClick = () => {
    setShowMonthList(!showMonthList);
    setShowYearList(false); 
  };

    const handleYearClick = () => {
    setShowYearList(!showYearList);
    setShowMonthList(false)
  };

  return (
    <div className={css.statistics}>
        <div>
        <h2 className={css.title}>Statistics</h2>
      <div className={css.diagram}>
        <div className={css.balance}>
          ₴ <span className={css.amount}>{amount}</span>
        </div>
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={630}
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={0}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>
      <div>
        <div className={css.buttons}>
            <button className={css.button} onClick={handleMonthClick}>
            {selectedMonth}
            <svg
              className={css.arrow}
              viewBox="0 0 20 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L10 10L19 1" stroke="black" />
            </svg>
            {showMonthList && (
              <div className={css.listContainer}>
                <List data={monthOptions} onItemClick={handleMonthSelect} />
              </div>
            )}
          </button>
          <button className={css.button} onClick={handleYearClick}>
            {selectedYear}
            <svg
              className={css.arrow}
              viewBox="0 0 20 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L10 10L19 1" stroke="black" />
            </svg>
            {showYearList && (
              <div className={css.listContainer}>
              <List data={yearOptions} onItemClick={handleYearSelect} />
            </div>
            )}
          </button>
        </div>
        <ul className={css.list}>
            <div className={css.listHeader}>
                <div>Category</div>
                <div>Sum</div>
            </div>
            {data.slice().reverse().map((item, index) => (
                <li className={css.listItem} key={item.id}>
                    <div className={css.color} style={{ backgroundColor: COLORS[(data.length - 1 - index) % COLORS.length] }}></div>
                    <div className={css.name}>{item.name}</div>
                    <div className={css.value}>{item.value}</div>
                </li>
            ))}
        </ul>
        <div className={css.cashflowContainer}>
            <div className={css.cashflow}>
                Expanses:
                <div className={css.expanses}>{data.reduce((acc, item) => acc + item.value, 0).toFixed(2)}</div>
            </div>
            <div className={css.cashflow}>
                Income:
                <div className={css.income}>{income}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Diagram;
