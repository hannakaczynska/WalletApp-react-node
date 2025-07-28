import css from "./modal.module.css";
import { forwardRef } from "react";
import ReactDOM from "react-dom";

const DeleteModal = forwardRef(({ onDelete, onCancel }, ref) => {

 const modalContent = (
    <dialog
      ref={ref}
      className={css.dialog}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        margin: "0",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        src="/close.svg"
        alt="Close"
        className={css.closeIcon}
        onClick={onCancel}
      />
      <h2 className={css.dialogTitle}>
        Are you sure you want to delete this transaction?
      </h2>
      <div className={css.buttonGroup}>
        <button className={css.confirmButton} onClick={onDelete}>
          Yes
        </button>
        <button className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </dialog>
  );

    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
});

export default DeleteModal;
