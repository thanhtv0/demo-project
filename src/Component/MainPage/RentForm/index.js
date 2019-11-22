import React from 'react'
import "./rentform.css"
import moment from "moment"
import insurance from "../../../Images/insurance.png"

const Location = (props) => {
    return (
        <>
            <label>where</label>
            <div>
                <input name='findlocation' type="text" placeholder="Singapore"></input>
                <div>

                </div>
            </div>
        </>
    )
}

const PickupDate = (props) => {

    return (
        <>
            <label>{props.label}</label>
            <div className="calendar-content">
                <input placeholder={props.placeholder} />
                <div className="calendar">

                </div>
            </div>
        </>
    )
}

const RentForm = (props) => {
    return (
        <>
            <div className="image-top" />
            <div className="rent-form">
                <form className="form" >
                    <h1>Rent your <br />neighbour's car</h1>
                    <p>With Drive lah, you can rent from a huge variety of nearby cars at great value. Fully insured<span>+</span>.</p>
                    <h4>See here how it works</h4>
                    <Location />
                    <PickupDate label="pickup" placeholder={moment().format("DD/MM/YYYY")} />
                    <PickupDate label="return by" placeholder={moment().add(1, "day").format("DD/MM/YYYY")} />
                    <div className="rent-button">
                        <input type="button" className="btn-join" value="join" />
                        <input type="button" value="search" />
                        {/* className="btn-search-show" */}
                    </div>
                    <div className="rent-bottom">
                        <div className="insurance-text">Insurance <br />provided by</div>
                        <img src={insurance} alt="insurace" />
                    </div>
                </form>
            </div>
            <div className="need-help">
                <div className="needhelp-content">
                    <i className="fas fa-question"></i> Need help? Call us +6531389153
                </div>
            </div>
        </>
    )
}

export default RentForm;
