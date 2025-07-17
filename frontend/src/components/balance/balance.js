import css from "./balance.module.css";

const Balance = () => {
  const amount = "24 000.00";
  return (
    <div className={css.container}>
      <h4 className={css.title}>your balance</h4>
      <div className={css.balance}>₴ <span className={css.amount}>{amount}</span></div>
    </div>
  );
};

export default Balance;
