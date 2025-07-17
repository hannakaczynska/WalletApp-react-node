import css from "./dashboard-page.module.css";
import { useLocation } from "react-router-dom";
import MediaQuery from "react-responsive";
import Navigation from "../../components/navigation/navigation";
import Current from "../../components/current/current";
import Balance from "../../components/balance/balance";
import CashflowList from "../../components/cashflow/cashflow-list";

const DashBoardPage = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/home":
        return (
          <div>
            <Balance />
            <CashflowList />
          </div>
        );
      case "/diagram":
        return <div>empty</div>;
      case "/current":
        return <div>empty2</div>;
      default:
        return (
          <div>
            <Balance />
            <CashflowList />
          </div>
        ); // Default to home content
    }
  };

  return (
    <div className={css.dashboardPage}>
      <div className={css.dashboardContainer}>
        <MediaQuery maxWidth={767.5}>
          <div className={css.navigation}>
            <Navigation />
          </div>
        </MediaQuery>
        <div class={css.dashboard}>
          <MediaQuery minWidth={768}>
            <div className={css.dashboardLayout}>
              <div className={css.layoutContainer}>
                <div className={css.navigation}>
                  <Navigation />
                </div>
                <div className={css.balance}>
                  <Balance />
                </div>
              </div>
              <div className={css.current}>
                <Current />
              </div>
            </div>
            <div className={css.separator}></div>
            <img src="/ellipse2.svg" alt="Ellipse" className={css.ellipseTwo} />
            <img src="/ellipse1.svg" alt="Ellipse" className={css.ellipseOne} />
          </MediaQuery>
          <div className={css.content}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
