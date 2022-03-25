import { Link } from "react-router-dom";

const Logo = ({ classes }: { classes: string }) => {
  return (
    <div className={classes}>
      <Link to="/">
        <img src="/assets/logo.svg" alt="logo" />
      </Link>
    </div>
  );
};
export default Logo;
