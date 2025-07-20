import css from "./header.module.css";
import LogoutModal from "../logout-modal/logout-modal";
import { useState } from "react";

const Header = () => {
  const name = "Name";
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutModal = () => {
    setLogoutModalOpen(!isLogoutModalOpen);
  };

  return (
    <div className={css.header}>
      <div className={css.headerContainer}>
      <img src="/logo.svg" alt="Logo" className={css.logo} />
      <div className={css.infoWrapper}>
        <p className={css.name}>{name}</p>
        <img src="/vector.svg" alt="Vector" className={css.vector} />
        <img src="/exit.svg" alt="Exit" className={css.exitIcon} onClick={handleLogoutModal} />
        <p className={css.exitText} onClick={handleLogoutModal}>Exit</p>
      </div>
      </div>
      {isLogoutModalOpen && (
      <div className={css.logoutModal}>
        <LogoutModal onClose={handleLogoutModal} onConfirm={handleLogoutModal} />
      </div>
    )}
    </div>
  );
};

export default Header;
