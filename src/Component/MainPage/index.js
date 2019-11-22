import React from 'react'
import "./MainPage.css"
import videoLogo from "../../Images/videoLogo.png"
import infinity from "../../Images/infinity.png"
import insurance from "../../Images/insurance.png"
import RentForm from "./RentForm"

const MainPage = (props) => {
    return (
        <div className="main">
            <div className="first-background">
                <RentForm />
            </div>
            <div className="sharing-line">
                <div className="text"><b>Go Drive lah!</b> Enjoy the benefits of car sharing!</div>
                <a href="#">join</a>
            </div>

            <div className="how-it-work gird-container">
                <div className="left-content gird-item">
                    <h1>How does it work?</h1>
                    <p>Drive lah makes it simple and secure to rent and share cars from real people. <b>Watch how it works now.</b></p>
                </div>
                <div className="gird-item item">
                    <img onClick={props.handleClickOpenPopup} src={videoLogo} alt="video" />
                </div>
                <div className="left-content gird-item">
                    <div className="how-it-work-btn">
                        <a href="#" className="button btn-first">how to rent a car</a>
                        <a href="#" className="button btn-second">how to share your car</a>
                    </div>
                </div>
            </div>

            <div className="infinity">
                <div className="infinity-background"></div>
                <img src={infinity} />
            </div>

            <div className="infinity-content">
                <div className="content has-number has-line start">
                    <h1>Start with a one time registration</h1>
                    <p>create a profile, share your driving license and a few other details</p>
                </div>

                <div className="content right start">
                    <h1>Start with listing your car</h1>
                    <p>Upload all details of your car. Get ready to start earning with your car when you don’t need it.</p>
                </div>

                <div className="content has-number has-line one">
                    <h1>{`Find & book the perfect car`}</h1>
                    <p>Browse hundreds of nearby cars and make a booking. You are fully insured<span style={{ verticalAlign: "super" }}>+</span>. Don’t worry!</p>
                </div>

                <div className="content right">
                    <h1>Respond to booking request</h1>
                    <p>Once a guest selects and books your car, you receive a request. We make sure a guest is verified before a request reaches you.</p>
                </div>

                <div className="content has-number has-line two">
                    <h1>Pick up the car</h1>
                    <p>Meet your host at the pick up point.</p>
                </div>

                <div className="content right">
                    <h1>Meet your guest</h1>
                    <p>The day has come where you meet your guest and hand over the keys.</p>
                </div>

                <div className="content has-number has-line three">
                    <h1>Enjoy driving</h1>
                    <p>Well what is left to say, have fun!</p>
                </div>

                <div className="content right">
                    <h1>Kick back and start earning</h1>
                    <p>What is not to like, you earn whilst you can relax or enjoy family time.</p>
                </div>

                <div className="content has-number has-line four">
                    <h1>Cruise back to your host</h1>
                    <p>All good things come to an end. It’s time to drive back to your host.</p>
                </div>

                <div className="content right">
                    <h1>Meet a happy guest and get your car back</h1>
                    <p>It is time to get your keys back and get ready for the next guest or for your own trip.</p>
                </div>

                <div className="content has-number five">
                    <h1>Write a review about your experience</h1>
                    <p>Please share your experience with the rest of the Drive lah community.</p>
                </div>

                <div className="content right">
                    <h1>Write a review for your guest</h1>
                    <p>Please write some kind words about your guest so the next host knows about your experience!</p>
                </div>

                <div className="content content-button">
                    <a href="#" className="">find a car</a>
                </div>

                <div className="content content-button right">
                    <a href="#" className="btn-second">list your car</a>
                </div>
            </div>

            <div className="insurance">
                <div className="logo-insurance">
                    <div>Fully insured<span style={{ verticalAlign: "super" }}>+</span></div>
                    <img src={insurance} />
                </div>
                <div className="text">Relax, the car is fully insured<span style={{ verticalAlign: "super" }}>+</span> throughout the whole trip by our trusted insurance partner.</div>
                <a href="#" className="button btn-second">find out more</a>
            </div>

            <div className="bottom">
                <div className="title">Ready to go Drive lah?</div>
                <div className="text">Join the growing community of people saving on the costs for driving a car.</div>
                <a href="#" className="button btn-first">join</a>
            </div>

            <div className="bottom-text">All cars aged less than 10 years are comprehensively insured. Cars aged 10 years or higher are insured via third party coverage only.</div>
        </div>
    )
}

export default MainPage;