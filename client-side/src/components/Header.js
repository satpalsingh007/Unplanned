import { Link } from "react-router-dom";
import logo from "../resources/images/logo.png";
const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={logo} alt="logo-image" />
            <div className="headerLink">
                <Link to="/home">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
            </div>
        </div>
    );
};
export default Header;
