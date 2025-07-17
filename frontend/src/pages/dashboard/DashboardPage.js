import css from "./dashboard-page.module.css";
// import { useLocation } from "react-router-dom";
import MediaQuery from "react-responsive";
import Navigation from "../../components/navigation/navigation";
import Current from "../../components/current/current";
import Balance from "../../components/balance/balance";

// Function to render content based on current route
// const renderContent = () => {
//   switch (location.pathname) {
//     case '/home':
//       return <HomeContent />;
//     case '/diagram':
//       return <DiagramContent />;
//     case '/current':
//       return <CurrentContent />;
//     default:
//       return <HomeContent />; // Default to home content
//   }
// };
const DashBoardPage = () => {
  // const location = useLocation();

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
          <div className={css.content}>
        {/* {renderContent()} */}
      </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
