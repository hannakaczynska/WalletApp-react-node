import ReactDOM from "react-dom";
import css from "./logout-modal.module.css";

const LogoutModal = ({ onClose, onConfirm }) => {
  const modalContent = (
    <div className={css.modalOverlay}>
      <div className={css.modalWrapper}>
        <img src="/close.svg" alt="Close" className={css.closeIcon} onClick={onClose} />
        <h2 className={css.modalTitle}>Do you want to log out?</h2>
        <div className={css.buttonGroup}>
          <button className={css.confirmButton} onClick={onConfirm}>
            Yes
          </button>
          <button className={css.cancelButton} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default LogoutModal;