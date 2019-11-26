import React, { useState, useEffect, useRef } from 'react'
import "./rentform.css"
import moment from "moment"
import insurance from "../../../Images/insurance.png"
import { getPlaces } from "../../../API"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Location = (props) => {

    const [arrPlace, setPlaces] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isShowRequired, setShowRequired] = useState(false);
    const [show, setShow] = useState(false);
    const wraperWhere = useRef(null);

    useEffect(() => {
        if(searchText === "") {
            searchPlace("Singapore");
        }
        document.addEventListener("mousedown", hanldeClickOut);
        return () => {
            document.removeEventListener("mousedown", hanldeClickOut);
        }
    }, [show])

    const searchPlace = (searchText) => {
        getPlaces(searchText).then(response => {
            let places = response.data.features.map(element => element.place_name);
            setPlaces(places);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleSeachChange = (e) => {
        let searchText = e.target.value;
        if(searchText === "") {
            if(props.onChange)
                props.onChange("")
            searchText = "Singapore"
        }
        searchPlace(searchText);
        setSearchText(searchText);
    }

    const handleForcus = () => {
        setShow(true);
    }

    const handleCurrentClick = () => {
        
    }

    const onPlaceChange = (value) => {
        setSearchText(value);
        setShow(false);
        setShowRequired(true);
        if(props.onChange)
            props.onChange(value);
    }

    const hanldeClickOut = (event) => {
        if (wraperWhere.current && !wraperWhere.current.contains(event.target)) {
            setShow(false);
        }
    }

    return (
        <>
            <label>where</label>
            <div ref={wraperWhere} className="where-container">
                <input onClick={handleForcus} onChange={handleSeachChange} type="text" placeholder="Singapore" value={searchText}></input>
                <div className={`where ${show&&"show"}`}>
                    <div className="title">Search sugesstion</div>
                    <div className="where-item" onClick={handleCurrentClick}>
                        <i className="fas fa-location-arrow"></i>
                        Current location
                    </div>

                    {arrPlace.length === 0 ? 
                        <div className="where-item">No place find</div>
                    : arrPlace.map((place_name, index) => {
                        return <div onClick={() => onPlaceChange(place_name)} key={index} className="where-item">
                                    {place_name}
                                </div>
                    })}
                </div>
                <div className={(isShowRequired && !props.isPickup) ? "required" : "none-required"}>Please select date as well</div>
            </div>
        </>
    )
}

const PickupDate = (props) => {

    const [defaultDay, setDefaultDay] = useState(moment());
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [arrDay, setArrDay] = useState([]);
    const [limitDay, setLimitDay] = useState();
    const [show, setShow] = useState(false);

    const getDayInMonth = (month, year) => {
        return (new Date(year, month, 0)).getDate();
    }

    useEffect(() => {
        if (show === true) {
            let limitDay;
            if (props.limitDay) {
                limitDay = moment(props.limitDay);
            }
            else {
                limitDay = moment();
            }
            let defaultDay = moment();
            if (props.daySelected) {
                defaultDay = moment(props.daySelected);
            }
            setDefaultDay(defaultDay)
            setLimitDay(limitDay);
            updateInfoDay(defaultDay, limitDay, props.daySelected);
        }
        document.addEventListener("mousedown", hanldeClickOut);
        return () => {
            document.removeEventListener("mousedown", hanldeClickOut);
        }
    }, [show])

    const updateInfoDay = (defaultDay, limitDay, daySelected) => {
        let month = defaultDay.get("month");
        let year = defaultDay.get("year");

        let dayOfWeek = (new Date(year, month, 1)).getDay();
        setDayOfWeek(dayOfWeek);

        // Create arrDay
        let arrDay = new Array(getDayInMonth(month + 1, year) + dayOfWeek);

        let i = 0;
        for (i; i < dayOfWeek; i++)
            arrDay[i] = -1;

        let obLimitDay = getObjectDay(limitDay);
        let obDefaultDay = getObjectDay(defaultDay);

        for (i; i < arrDay.length; i++) {
            arrDay[i] = handleDayValue(i - dayOfWeek + 1, obLimitDay, obDefaultDay);
        }

        let today = moment();
        if (isInMonth(today, defaultDay) && isInMonth(limitDay, defaultDay) && obLimitDay.date <= today.get('date')) {
            arrDay[today.get("date") + dayOfWeek - 1] = 2;
        }
        if (daySelected) {
            if (isInMonth(daySelected, defaultDay)) {
                arrDay[daySelected.get('date') + dayOfWeek - 1] = 3;
            }
            if (isInMonth(today, daySelected)) {
                if (today.get("date") === daySelected.get("date")) {
                    arrDay[daySelected.get('date') + dayOfWeek - 1] = 4;
                }
            }
        }
        setArrDay(arrDay);
    }

    const isInMonth = (day1, day2) => {
        if (day1.get("month") === day2.get("month") && day1.get("year") === day2.get("year")) {
            return true;
        }
        return false;
    }

    const getObjectDay = (day) => {
        return {
            year: day.get('year'),
            month: day.get('month'),
            date: day.get("date"),
        }
    }

    const handleDayValue = (date, obLimitDay, obDefaultDay) => {
        if (obDefaultDay.year < obLimitDay.year) {
            return 0;
        }
        else {
            if (obDefaultDay.year === obLimitDay.year) {
                if (obDefaultDay.month < obLimitDay.month) {
                    return 0;
                }
                else {
                    if (obLimitDay.month === obDefaultDay.month) {
                        if (obLimitDay.date > date) {
                            return 0;
                        }
                    }
                }
            }
            return 1;
        }
    }

    const nextMonth = () => {
        let nextMonth = defaultDay.add(1, "months");
        setDefaultDay(nextMonth);
        updateInfoDay(nextMonth, limitDay, props.daySelected);
    }

    const prevMonth = () => {
        let prevMonth = defaultDay.subtract(1, "months")
        setDefaultDay(prevMonth);
        updateInfoDay(prevMonth, limitDay, props.daySelected);
    }

    const handleSelectDay = (value) => {
        let obj = getObjectDay(defaultDay);
        let day = new Date(obj.year, obj.month, value);
        let selected = moment(day);
        if (props.onChange)
            props.onChange(selected);
        setShow(false);
    }

    const wraperCalendar = useRef(null);

    const hanldeClickOut = (event) => {
        if (wraperCalendar.current && !wraperCalendar.current.contains(event.target)) {
            setShow(false);
        }
    }

    return (
        <>
            <label>{props.label}</label>
            <div className="calendar-container" >
                <input placeholder={props.placeholder} onClick={() => setShow(true)} readOnly value={props.daySelected ? props.daySelected.format("DD/MM/YYYY") : ""} />
                <div ref={wraperCalendar} className={`calendar ${show && "show"}`} tabIndex={0}>
                    <div className="select-month">
                        <i onClick={prevMonth} className="fas fa-chevron-left"></i>
                        <div>{months[defaultDay.get("month")]} {defaultDay.get("year")}</div>
                        <i onClick={nextMonth} className="fas fa-chevron-right"></i>
                    </div>
                    <div className="layout-choise-day">
                        <div className="day-item"><span>Su</span></div>
                        <div className="day-item"><span>Mo</span></div>
                        <div className="day-item"><span>Tu</span></div>
                        <div className="day-item"><span>We</span></div>
                        <div className="day-item"><span>Th</span></div>
                        <div className="day-item"><span>Fr</span></div>
                        <div className="day-item"><span>Sa</span></div>

                        {arrDay.map((value, index) => {
                            return <DayItem
                                value={index - dayOfWeek + 1}
                                key={index}
                                onClick={(value) => handleSelectDay(value)}
                                state={value}
                            />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

const DayItem = (props) => {

    const handleClick = (value) => {
        props.onClick(value)
    }

    switch (props.state) {
        case 0:
            return <div className="day-item disable-day"><span>{props.value}</span></div>;
        case 1:
            return <div onClick={() => handleClick(props.value)} className="day-item"><span>{props.value}</span></div>
        case 2:
            return <div onClick={() => handleClick(props.value)} className="day-item today"><span>{props.value}</span></div>
        case 3:
            return <div onClick={() => handleClick(props.value)} className="day-item choised-day"><span>{props.value}</span></div>
        case 4:
            return <div onClick={() => handleClick(props.value)} className="day-item today choised-day"><span>{props.value}</span></div>
        default:
            return <div className="day-item"><span></span></div>
    }
}

const RentForm = (props) => {

    const [pickup, setPickup] = useState(false);
    const [returnby, setReturnby] = useState(false);
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
        if(where !== ""){
            setShowBtnSearch(true);
        }
    }

    const handlePlaceChange = (value) => {
        setWhere(value);
        if(value !== "" && isPickup) {
            setShowBtnSearch(true);
        }else {
            setShowBtnSearch(false);
        }
    }

    const handleReturnBy = (value) => {
        setReturnby(value);
        if(where !== "" && isPickup) {
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
                    <PickupDate daySelected={pickup} onChange={(value) => {pickupChange(value)}} label="pickup" placeholder={moment().format("DD/MM/YYYY")} />
                    <PickupDate daySelected={returnby} onChange={(value) => handleReturnBy(value)} limitDay={limitReturnby} label="return by" placeholder={moment().add(1, "day").format("DD/MM/YYYY")} />
                    <div className="rent-button">
                        <input type="button" className="btn-join" value="join" />
                        <input type="button" value="search" className={`btn-search ${showBtnSearch && "btn-search-show"}`}/>
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
