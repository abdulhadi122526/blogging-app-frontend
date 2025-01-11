import { Link } from "react-router-dom"
import axiosInstance from "./axiosinstance"



const Navbar = () => {


    return (
        <>
            <div className="navbar bg-blue-900 text-white flex mb-12 ">
                <div className="flex-1 ms-28">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/register">Signup</Link></li>
                        <li><Link to="/">Login</Link></li>
                       



                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar