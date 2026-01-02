import Current from "../../components/Current/Current";
import MobileNavigation from "../../components/Navigation/MobileNavigation";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./CurrentPage.module.css";

const CurrentPage = () => {
  const navigate = useNavigate();

  const isTablet = useMediaQuery({ minWidth: "768px" });

  useEffect(() => {
    if (isTablet) {
      navigate('/home');
    }
  }, [isTablet, navigate]);

  return (
    <div className={css.page}>
      <MobileNavigation />
      <Current />
    </div>
  );
};

export default CurrentPage;
