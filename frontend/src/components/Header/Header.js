import css from "./Header.module.css";
import LogoutModal from "../Modal/LogoutModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user/userThunks";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.session.user);
  const name = user?.name || "User";
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutModal = () => {
    setLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleLogout = () => {
    const result = dispatch(logoutUser());
    if (result) {
      handleLogoutModal();
      navigate("/login");
    }
  };

  return (
    <div className={css.header}>
      <div className={css.headerContainer}>
        <img src="/logo.svg" alt="Logo" className={css.logo} />
        <div className={css.infoWrapper}>
          <p className={css.name}>{name}</p>
          <img src="/vector.svg" alt="Vector" className={css.vector} />
          <img
            src="/exit.svg"
            alt="Exit"
            className={css.exitIcon}
            onClick={handleLogoutModal}
          />
          <p className={css.exitText} onClick={handleLogoutModal}>
            Exit
          </p>
        </div>
      </div>
      {isLogoutModalOpen && (
        <div className={css.logoutModal}>
          <LogoutModal onClose={handleLogoutModal} onConfirm={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default Header;
