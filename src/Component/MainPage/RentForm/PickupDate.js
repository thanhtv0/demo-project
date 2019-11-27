import React, { useState, useEffect, useRef } from 'react'
import moment from "moment"
import FormChoiseMonth from "./FormChoiseMonth"
import FormChoiseYear from "./FormChoiseYear"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const FormChoiseDay = (props) => {

    const [defaultDay, setDefaultDay] = useState(moment());
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [arrDay, setArrDay] = useState([]);
    const [limitDay, setLimitDay] = useState();

    const getDayInMonth = (month, year) => {
        return (new Date(year, month, 0)).getDate();
    }

    useEffect(() => {
        if (props.show === true) {
            let limitDay;
            if (props.limitDay) {
                limitDay = moment(props.limitDay);
            }
            else {
                limitDay = moment();
            }
            let defaultDay = moment(new Date(props.year, props.month, 1));
            if(props.isShowLayoutSelected) {
                if (props.daySelected) {
                    defaultDay = moment(props.daySelected);
                }
            }
            setDefaultDay(defaultDay)
            setLimitDay(limitDay);
            updateInfoDay(defaultDay, limitDay, props.daySelected);
        }
    }, [props.show])

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
        changeMonthYear(nextMonth.get("month"), nextMonth.get("year"));
        updateInfoDay(nextMonth, limitDay, props.daySelected);
    }

    const prevMonth = () => {
        let prevMonth = defaultDay.subtract(1, "months")
        setDefaultDay(prevMonth);
        changeMonthYear(prevMonth.get("month"), prevMonth.get("year"));
        updateInfoDay(prevMonth, limitDay, props.daySelected);
    }

    const handleSelectDay = (value) => {
        let obj = getObjectDay(defaultDay);
        let day = new Date(obj.year, obj.month, value);
        let selected = moment(day);
        if (props.onChange)
            props.onChange(selected);
        props.setShow(false);
    }

    const changeMonthYear = (month, year) => {
        if(month !== props.month)
            props.onChangeMonth(month);
        if(year !== props.year)
            props.onChangeYear(year);
    }

    return (
        <>
            <div className={`calendar ${props.show && "show"}`} tabIndex={0}>
                <div className="select-month">
                    <i onClick={prevMonth} className="fas fa-chevron-left"></i>
                    <div onClick={() => props.upperLayout()}>{months[props.month]} {props.year}</div>
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

const PickupDate = (props) => {

    const [show, setShow] = useState(false);
    const [year, setYear] = useState(moment().get("year"));
    const [month, setMonth] = useState(moment().get("month"));
    const [layout, setLayout] = useState(2);  //0-year 1-month 2-date
    const [isShowLayoutSelected, setShowLayoutSelected] = useState(true);

    useEffect(() => {
        if(show) {
            setShowLayoutSelected(true);
        }
        document.addEventListener("mousedown", hanldeClickOut);
        return () => {
            document.removeEventListener("mousedown", hanldeClickOut);
        }
    }, [show])

    const wraperCalendar = useRef(null);

    const hanldeClickOut = (event) => {
        if (wraperCalendar.current && !wraperCalendar.current.contains(event.target)) {
            setShow(false);
        }
    }

    const handleMonthChange = (month) => {
        setMonth(month);
        //Show date
        setShowLayoutSelected(false);
        downLayout();
    }

    const handleYearChange = (year) => {
        setYear(year);
        setMonth(0);
        setShowLayoutSelected(false);
        //Show month
        downLayout();
    }

    const upperLayout = () => {
        setLayout(layout - 1);
    }

    const downLayout = () => {
        setLayout(layout + 1);
    }

    return (
        <>
            <label>{props.label}</label>
            <div ref={wraperCalendar} className="calendar-container" >
                <input placeholder={props.placeholder} onClick={() => setShow(true)} readOnly value={props.value ? props.value.format("DD/MM/YYYY") : ""} />
                
                {layout === 2 && <FormChoiseDay
                    setShow={(value) => setShow(value)}
                    show={show}
                    onChange={props.onChange}
                    daySelected={props.value}
                    limitDay={props.limitDay}
                    month={month}
                    year={year}
                    upperLayout={upperLayout}
                    onChangeMonth={(month) => setMonth(month)}
                    onChangeYear={(year) => setYear(year)}
                    isShowLayoutSelected={isShowLayoutSelected}
                />}

                {layout === 1 && <FormChoiseMonth
                    show={show}
                    onChangeMonth={(month) => handleMonthChange(month)}
                    onChangeYear={(year) => setYear(year)}
                    month={month}
                    year={year}
                    upperLayout={upperLayout}
                />}

                {layout === 0 && <FormChoiseYear
                    show={show}
                    year={year}
                    onChange={(year) => handleYearChange(year)}
                />}

            </div>
        </>
    )
}

export default PickupDate;