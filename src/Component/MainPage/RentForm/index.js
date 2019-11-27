import React, { useState } from 'react'
import "./rentform.css"
import moment from "moment"
import insurance from "../../../Images/insurance.png"
import Location from "./Location"
import PickupDate from "./PickupDate"
import PickupBlockDate from "./PickupBlockDate"

const RentForm = (props) => {

    const [pickup, setPickup] = useState(null);
    const [returnby, setReturnby] = useState(null);
    const [limitReturnby, setLimitReturnby] = useState(moment());
    const [isPickup, setIsPickup] = useState(false);
    const [where, setWhere] = useState("");
    const [showBtnSearch, setShowBtnSearch] = useState(false);

    const pickupChange = (value) => {
        setPickup(value);
        let nextDay = moment(value).add(1, "days");
        if (returnby) {
            if (returnby.get("year") <= value.get("year") && returnby.get("month") <= value.get("month") && returnby.get("date") <= value.get("date")) {
                setReturnby(nextDay);
            }
        } else {
            setReturnby(nextDay);
        }
        setLimitReturnby(nextDay);
        setIsPickup(true);
        if (where !== "") {
            setShowBtnSearch(true);
        }
    }

    const handlePlaceChange = (value) => {
        setWhere(value);
        if (value !== "" && isPickup) {
            setShowBtnSearch(true);
        } else {
            setShowBtnSearch(false);
        }
    }

    const handleReturnBy = (value) => {
        setReturnby(value);
        if (where !== "" && isPickup) {
            setShowBtnSearch(true);
        }
        else {
            setShowBtnSearch(false);
        }
    }

    return (
        <>
            <div className="image-top" />
            <div className="rent-form">
                <form className="form" >
                    <h1>Rent your <br />neighbour's car</h1>
                    <p>With Drive lah, you can rent from a huge variety of nearby cars at great value. Fully insured<span>+</span>.</p>
                    <h4>See here how it works</h4>
                    <Location isPickup={isPickup} onChange={(value) => handlePlaceChange(value)} />
                    {/* <PickupDate value={pickup} onChange={(value) => { pickupChange(value) }} label="pickup" placeholder={moment().format("DD/MM/YYYY")} /> */}
                    {/* <PickupDate value={returnby} onChange={(value) => handleReturnBy(value)} limitDay={limitReturnby} label="return by" placeholder={moment().add(1, "day").format("DD/MM/YYYY")} /> */}
                    <PickupBlockDate
                        label={"choise day from to"}
                        placeHolder={`${moment().format("DD/MM/YYYY")} - ${moment().add(1,"days").format("DD/MM/YYYY")}`}
                    />
                    <div className="rent-button">
                        <input type="button" className="btn-join" value="join" />
                        <input type="button" value="search" className={`btn-search ${showBtnSearch && "btn-search-show"}`} />
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
