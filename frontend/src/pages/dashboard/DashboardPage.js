import css from "./dashboard-page.module.css";
import Navigation from "../../components/navigation/navigation";
import Current from "../../components/current/current";

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
  return (
    <div className={css.dashboardPage}>
      <div className={css.navigation}><Navigation /></div>
      <div className={css.current}><Current /></div>
            {/* <div className={css.content}>
        {renderContent()}
      </div> */}
    </div>
  );
};

export default DashBoardPage;
