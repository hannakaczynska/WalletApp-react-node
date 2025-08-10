import css from "./current.module.css";
import MediaQuery from "react-responsive";
import { useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMidEuroRate, setMidGbpRate, setLastFetchTime } from "../../redux/currency/currencySlice";

const Current = () => {
  const dispatch = useDispatch();
  const { midEuroRate, midGbpRate, lastFetchTime } = useSelector((state) => state.currency);

const fetchExchangeRates = useCallback(async () => {
  try {
    const response = await axios.get("https://openexchangerates.org/api/latest.json", {
      params: {
        app_id: process.env.REACT_APP_OPEN_EXCHANGE_API_KEY, 
        symbols: "EUR,GBP",
      },
    });

    const midEuroRate = response.data.rates.EUR;
    const midGbpRate = response.data.rates.GBP;
    const lastFetchTime = new Date().toISOString();

    dispatch(setMidEuroRate(midEuroRate));
    dispatch(setMidGbpRate(midGbpRate));
    dispatch(setLastFetchTime(lastFetchTime));
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
}, [dispatch]);

  useEffect(() => {
    const now = new Date();
    const lastFetch = lastFetchTime ? new Date(lastFetchTime) : null;

    if (!lastFetch || now - lastFetch > 60 * 60 * 1000) {
      fetchExchangeRates();
    }
  }, [lastFetchTime, fetchExchangeRates]);

  const handlePurchase = (midRate) => {
    if (!midRate) return "";
    return (midRate * 1.005).toFixed(3);
  };

  const handleSale = (midRate) => {
    if (!midRate) return "";
    return (midRate * 0.995).toFixed(3);
  };

  return (
    <div className={css.tableContainer}>
      <table className={css.table}>
        <thead>
          <tr className={css.headerRow}>
            <th className={css.headerCell}>Currency</th>
            <th className={css.headerCell}>Purchase</th>
            <th className={`${css.sale} ${css.headerCell}`}>Sale</th>
          </tr>
        </thead>
        <tbody className={css.dataBody}>
            <>
              <tr className={css.dataRow}>
                <td className={`${css.firstCell} ${css.dataCell}`}>GBP</td>
                <td className={css.dataCell}>{handlePurchase(midGbpRate)}</td>
                <td className={`${css.lastCell} ${css.dataCell}`}>
                  {handleSale(midGbpRate)}
                </td>
              </tr>
              <tr className={css.dataRow}>
                <td className={`${css.firstCell} ${css.dataCell}`}>EUR</td>
                <td className={css.dataCell}>{handlePurchase(midEuroRate)}</td>
                <td className={`${css.lastCell} ${css.dataCell}`}>
                  {handleSale(midEuroRate)}
                </td>
              </tr>
            </>
        </tbody>
      </table>
      <MediaQuery maxWidth={767}>
        <img src="/wave.svg" alt="Wave" className={css.waveSvg} />
      </MediaQuery>
      <MediaQuery minWidth={768} maxWidth={1279}>
        <img src="/wave-tablet.svg" alt="Wave" className={css.waveSvg} />
      </MediaQuery>
      <MediaQuery minWidth={1280}>
        <img src="/wave-desktop.svg" alt="Wave" className={css.waveSvg} />
      </MediaQuery>
    </div>
  );
};

export default Current;
