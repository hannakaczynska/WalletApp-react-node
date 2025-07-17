import css from "./header.module.css";

const Header = () => {
  const name = "Name";
  return (
    <div className={css.header}>
      <div className={css.headerContainer}>
      <img src="/logo.svg" alt="Logo" className={css.logo} />
      <div className={css.infoWrapper}>
        <p className={css.name}>{name}</p>
        <img src="/vector.svg" alt="Vector" className={css.vector} />
        <img src="/exit.svg" alt="Exit" className={css.exitIcon} />
        <p className={css.exitText}>Exit</p>
      </div>
      </div>
    </div>
  );
};

export default Header;
