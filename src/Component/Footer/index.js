import React from 'react'
import "./footer.css"
import logoFooter from "../../Images/logoFooter.png"

const Footer = () => {
    return (
        <div className="footer f-gird-container">
            <div className="left item1">
                <img src={logoFooter} />
                <div>The largest online community to rent cars in Singapore.</div>
                <p>© Drive lah 2019</p>
            </div>
            <div className="right item2">
                <ul>
                    <li><a href="#">List your car</a></li>
                    <li><a href="#">Policies</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">F.A.Q</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Contact us</a></li>
                </ul>
            </div>
            <div className="right item3">
                <ul>
                    <li><a href="#"> How it works</a></li>
                    <li><a href="#">Share your car</a></li>
                    <li><a href="#">Rent a car</a></li>
                    <li><a href="#">{`Trust & Safety`}</a></li>
                </ul>
            </div>
            <div className="right item4">
                <div className="icon">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
                <div className="terms">
                    <div><a href="#">Terms of Service</a></div>
                    <div><a href="#">Rental Agreement</a></div>
                </div>
            </div>
            <div className="item5">
                © Drive lah 2019
            </div>
            <div className="item6">
                <div><a href="#">Rental</a></div>
                <div><a>Agreement</a>     <a>Terms</a></div>
            </div>
        </div>
    )
}

export default Footer;