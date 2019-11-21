import React, { useState } from 'react'
import "./Navbar.css"
import logo from "../../Images/logo.png"
import MobileMenu from "../MobileMenu"
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [showTooltip, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleClickBars = () => {
        setShowMenu(true);
    }

    const handleClickCloseBars = () => {
        setShowMenu(false)
    }

    return (
        <>
            <ul className="nav">
                <li className="bars" onClick={handleClickBars}><i className="fas fa-bars"></i></li>
                <li className="logo"><Link to="/"><img src={logo} alt="logo"></img></Link></li>
                <div className="right">
                    <li className='tooltip' onFocus={() => { setShow(true) }} onBlur={() => setShow(false)}>
                        <a href="/" onClick={(e) => { e.preventDefault(); return false; }} >Learn more</a>
                        <div className={showTooltip ? "tooltip-content active" : "tooltip-content"}>
                            <ul>
                                <li>How it works</li>
                                <li>Renting a car</li>
                                <li>Sharing your car</li>
                                <li>{`Trust & Safety`}</li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#list_your_car">List your car</a></li>
                    <li><a href="/signup">Join</a></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
            </ul>
            <MobileMenu 
                showMenu={showMenu}
                handleClickCloseBars={handleClickCloseBars}
                />
        </>
    )
}

export default Navbar;