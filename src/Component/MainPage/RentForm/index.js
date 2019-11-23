import React, { useState, useEffect } from 'react'
import "./rentform.css"
import moment from "moment"
import insurance from "../../../Images/insurance.png"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

    const [defaultDay, setDefaultDay] = useState(moment());
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [arrDay, setArrDay] = useState([]);
    const [limitDay, setLimitDay] =useState();

    const getDayInMonth = (month, year) => {
        return (new Date(year, month, 0)).getDate();
    }

    useEffect(() => {
        let limitDay;
        if(props.limitDay) {
            limitDay = moment(limitDay);
        }
        else {
            limitDay = moment();
        }
        setLimitDay(limitDay);
        updateInfoDay(defaultDay, limitDay);
    }, [])

    const updateInfoDay = (day, limitDay) => {
        let month = day.get("month");
        let year = day.get("year");

        let dayOfWeek = (new Date(year, month, 1)).getDay();
        setDayOfWeek(dayOfWeek);
        createArrDay(month, year,dayOfWeek,limitDay);
    }

    const nextMonth = () => {
        let nextMonth = defaultDay.add(1,"months");
        setDefaultDay(nextMonth);
        updateInfoDay(nextMonth, limitDay);
    }

    const prevMonth =() => {
        let prevMonth = defaultDay.subtract(1,"months")
        setDefaultDay(prevMonth);
        updateInfoDay(prevMonth, limitDay);
    }

    const createArrDay = (month, year, dayOfWeek, limitDay) => {
        let arrDay = new Array(getDayInMonth(month + 1, year) + dayOfWeek).fill(true);
        for(let i =0;i<arrDay.length;i++) {
            arrDay[i] = canChoise(i-dayOfWeek+1, limitDay);
        }
        setArrDay(arrDay);
    }

    const canChoise = (day, limitDay) => {
        if(limitDay.get("year") > defaultDay.get("year"))
        {
            return false;
        }
        else {
            if(limitDay.get("year") === defaultDay.get("year")) {
                if(limitDay.get("month") > defaultDay.get("month")) 
                {
                    return false;
                }else if(limitDay.get('month') === defaultDay.get("month")) {
                    if(limitDay.get('date') >  day) {
                        return false;
                    }
                    return true;
                } else {
                    return true;
                }
            }
            else {
                return true;
            }
        }
    }

    return (
        <>
            <label>{props.label}</label>
            <div className="calendar-container">
                <input placeholder={props.placeholder} />
                <div className="calendar">
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

                        {/* <div className="day-item selected-day choised-day"><span>Th</span></div> */}

                        {arrDay.map((value, index) => {
                            if (index < dayOfWeek)
                                return <div key={index} className="day-item"><span></span></div>
                            else
                            {
                                return <div key={index} className={value ? "day-item" : "day-item disable-day"}><span>{index - dayOfWeek + 1}</span></div>
                            }
                        })}
                    </div>
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
