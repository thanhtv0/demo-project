import React from "react"
import "./menu.css"

const MobileMenu = (props) => {
    return (
        <div className={props.showMenu ? "menu active" : "menu"}>
            <div className="menu-nav">
                <div onClick={props.handleClickCloseBars} className="btn-close">CLOSE<i className="fas fa-times"></i></div>
            </div>
            <div className="center">
                <div className="main-title">Hello there,<br />would you like to <a href="/signup">Join now</a> or <a href="/login">Login</a>? </div>
                <ul>
                    <li>Learn more</li>
                    <li><a href="/">How it works</a></li>
                    <li><a href="/">Renting a car</a></li>
                    <li><a href="/">Sharing your car</a></li>
                    <li><a href="/">{`Trust & Safety`}</a></li>
                </ul>
            </div>
            <div className="menu-bottom">
                <a href="/">+ add your car</a>
            </div>
        </div>
    )
}

export default MobileMenu;