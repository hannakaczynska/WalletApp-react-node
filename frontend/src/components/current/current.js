import css from "./current.module.css";
import MediaQuery from "react-responsive";
import { useEffect, useState } from "react";
// import axios from "axios";

//set midrates to store in refetch it after 1 hour
  const fetchExchangeRates = async (setMidEuroRate, setMidGbpRate) => {
    try {
      // const response = await axios.get("https://api.exchangerate.host/live", {
      //   params: {
      //     base: "USD",
      //     currencies: "EUR, GBP",
      //     access_key: process.env.REACT_APP_CURRENCY_API_KEY,
      //   },
      // });
      let response;
      setMidEuroRate(response.data.quotes.USDEUR);
      setMidGbpRate(response.data.quotes.USDGBP);
      console.log("Exchange rates fetched successfully:", response.data.quotes);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

const Current = () => {
  const [midEuroRate, setMidEuroRate] = useState("");
  const [midGbpRate, setMidGbpRate] = useState("");

  useEffect(() => {
    fetchExchangeRates(setMidEuroRate, setMidGbpRate);
  }, []);

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
