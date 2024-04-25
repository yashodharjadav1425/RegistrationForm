import { NavLink } from "react-router-dom"
import "./nav.css";
export const Navbar = () => {
   return(
    <>
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to={"/"}>MyApp</NavLink>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/Register">Register</NavLink></li>
                        <li><NavLink to="/Login">Login</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    </>
   )
}

export default Navbar;





