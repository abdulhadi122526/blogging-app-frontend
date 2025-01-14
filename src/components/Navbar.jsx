import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

    const navigate = useNavigate();

    const logOutUser = async () => {
        try {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            await axios.post("http://localhost:5000/api/v1/logout");
        } catch (error) {
            console.log("Error logging out:", error.response.data);
            
        }
        navigate("/");
    };

    return (
        <>
            <div className="navbar bg-blue-900 text-white flex mb-12 ">
                <div className="flex-1 ms-28">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {localStorage.getItem("access_token") ?<li><Link to="/home">Home</Link></li> : false }
                        
                        <li><Link to="/register">Signup</Link></li>
                        <li>
                            {localStorage.getItem('access_token') ? (
                                <button onClick={logOutUser}>Logout</button>
                            ) : (
                                <Link to="/">Login</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
