import css from "./balance.module.css";
import {useSelector} from "react-redux";

const Balance = () => {
  const amount = useSelector((state) => state.session.balance).toFixed(2);
  return (
    <div className={css.container}>
      <h4 className={css.title}>your balance</h4>
      <div className={css.balance}>₴ <span className={css.amount}>{amount}</span></div>
    </div>
  );
};

export default Balance;
