import css from "./DashboardPage.module.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MediaQuery from "react-responsive";
import Navigation from "../../components/Navigation/Navigation";
import Current from "../../components/Current/Current";
import Balance from "../../components/Balance/Balance";
import CashflowList from "../../components/CashflowList/CashflowList";
import Diagram from "../../components/Diagram/Diagram";
import TransactionForm from "../../components/Transaction/Transaction";

const DashBoardPage = () => {
  const location = useLocation();

  const [showAddTransaction, setShowAddTransaction] = useState(false);


  const renderContent = () => {
    switch (location.pathname) {
      case "/home":
        return (
          <div>
            <div className={css.mobileBalance}>
              <Balance />
            </div>
            <CashflowList />
            <img src="/add.svg" alt="Add" className={css.addIcon} onClick={() => setShowAddTransaction(true)}/>
            {showAddTransaction && (
              <div className={css.transactionForm}>
                <TransactionForm
                  onItemClick={() => setShowAddTransaction(false)}
                />
              </div>
            )}
          </div>
        );
      case "/diagram":
        return (
          <div>
            <Diagram />
          </div>
        );
      case "/current":
        return (
          <div className={css.currentContainer}>
            <Current />
          </div>
        );
      default:
        return (
          <div>
            <div className={css.mobileBalance}>
              <Balance />
            </div>
            <CashflowList />
            <img
              src="/add.svg"
              alt="Add"
              className={css.addIcon}
              onClick={() => setShowAddTransaction(true)}
            />
            {showAddTransaction && (
              <div className={css.transactionForm}>
                <TransactionForm
                  onItemClick={() => setShowAddTransaction(false)}
                />
              </div>
            )}
          </div>
        );
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
        <div className={css.dashboard}>
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
          <div className={css.contentContainer}>
            <div className={css.content}>{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
