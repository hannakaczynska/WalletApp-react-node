import css from "./DashboardPage.module.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MobileNavigation from "../../components/Navigation/MobileNavigation";
import AppShell from "../../components/AppShell/AppShell";
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
          <MobileNavigation />
        <div className={css.dashboard}>
            <AppShell />
          <div className={css.contentContainer}>
            <div className={css.content}>{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
