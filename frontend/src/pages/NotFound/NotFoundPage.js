import { Link } from "react-router-dom";
import css from '../NotFound/NotFoundPage.module.css'; 

const NotFoundPage = () => {
  return (
    <div className={css.notFoundPage}>
      <h3>404 - Page Not Found</h3>
      <p>The page you are looking for does not exist.</p>
      <Link to="/home">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;