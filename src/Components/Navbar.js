import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li>
                    <Link to="/">Calculadora de Unidades</Link>
                </li>
                <li>
                    <Link to="/surebet">Calculadora de Surebet</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
