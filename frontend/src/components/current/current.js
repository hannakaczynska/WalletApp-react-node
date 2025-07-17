import css from "./current.module.css";
import MediaQuery from "react-responsive";

const Current = () => {
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
          <tr className={css.dataRow}>
            <td className={`${css.firstCell} ${css.dataCell}`}>USD</td>
            <td className={css.dataCell}>36.50</td>
            <td className={`${css.lastCell} ${css.dataCell}`}>37.20</td>
          </tr>
          <tr className={css.dataRow}>
            <td className={`${css.firstCell} ${css.dataCell}`}>EUR</td>
            <td className={css.dataCell}>39.80</td>
            <td className={`${css.lastCell} ${css.dataCell}`}>40.60</td>
          </tr>
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
