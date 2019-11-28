import React, { useState, useEffect, useRef } from 'react'
import moment from "moment"
import FormChoiseMonth from "./FormChoiseMonth"
import FormChoiseYear from "./FormChoiseYear"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const FormChoiseDay = (props) => {

    const [defaultDay, setDefaultDay] = useState(moment());
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [arrDay, setArrDay] = useState([]);
    const [count, setCount] = useState(0);

    const getDayInMonth = (month, year) => {
        return (new Date(year, month, 0)).getDate();
    }

    useEffect(() => {
        if (props.show === true) {
            let defaultDay = moment(new Date(props.year, props.month, 1));
            let { dayFrom, dayEnd } = props;
            if (dayFrom === null || dayEnd === null) {
                dayFrom = null;
                dayEnd = null;

                props.onDayFromChange(null);
                props.onDayEndChange(null);
            }
            setCount(0);
            setDefaultDay(defaultDay);
            updateInfoDay(defaultDay, dayFrom, dayEnd);
        }
    }, [props.show])

    const updateInfoDay = (defaultDay, dayFrom, dayEnd, count) => {
        let month = defaultDay.get("month");
        let year = defaultDay.get("year");

        let dayOfWeek = (new Date(year, month, 1)).getDay();
        setDayOfWeek(dayOfWeek);

        //Create Array
        let dayInMonth = getDayInMonth(month + 1, year);
        let arr = new Array(dayInMonth + dayOfWeek).fill(0);
        for (let i = 0; i < dayOfWeek; i++) {
            arr[i] = -1; //not show
        }

        let { blocks } = props;

        for (let ele of blocks) {
            for (let k = ele.from; k <= ele.to; k++) {
                if (k <= dayInMonth)
                    arr[k - 1 + dayOfWeek] = 1; //block
            }
        }

        let dfDay = getObjectDay(defaultDay);
        if (dayFrom) {
            let dFrom = getObjectDay(dayFrom);

            if (isInMonth(dFrom, dfDay)) {
                arr[dFrom.date - 1 + dayOfWeek] = 2 //First pick day
            }

            if (dayEnd) {
                let dEnd = getObjectDay(dayEnd);
                if (isInMonth(dEnd, dfDay)) {
                    arr[dEnd.date - 1 + dayOfWeek] = 3//End pick day
                }
                if (isInMonth(dFrom, dEnd)) {
                    if (isInMonth(dFrom, dfDay)) {
                        if (dFrom.date === dEnd.date) {
                            arr[dFrom.date - 1 + dayOfWeek] = 5; //Day from and day end is the same
                        }
                        else {
                            for (let i = dFrom.date + 1; i < dEnd.date; i++) {
                                arr[i - 1 + dayOfWeek] = 4 //Center pick day
                            }
                        }
                    }
                }
                else {
                    if (isInMonth(dFrom, dfDay)) {
                        for (let i = dFrom.date + 1; i <= dayInMonth; i++) {
                            arr[i - 1 + dayOfWeek] = 4;
                        }
                    }
                    if (isInMonth(dEnd, dfDay)) {
                        for (let i = 1; i < dEnd.date; i++) {
                            arr[i - 1 + dayOfWeek] = 4;
                        }
                    }
                }
            }
        }

        if (count === 1) {
            let dayBlockAfterDayFrom = null;
            for (let ele of props.blocks) {
                let tmp = new Date(dayFrom.get("year"), dayFrom.get("month"), ele.from);
                if (tmp.getTime() > dayFrom.valueOf()) {
                    dayBlockAfterDayFrom = moment(tmp);
                    break;
                }
            }

            if (props.blocks.length !== 0 && dayBlockAfterDayFrom === null) {
                dayBlockAfterDayFrom = moment(new Date(dayFrom.get("year"), dayFrom.get("month"), props.blocks[0].from)).add(1, "months");
            }

            for (let i = 1; i <= dayInMonth; i++) {
                let day = new Date(year, month, i);
                if (day.getTime() < dayFrom.valueOf() || (dayBlockAfterDayFrom !== null && dayBlockAfterDayFrom.valueOf() <= day.getTime())) {
                    arr[i - 1 + dayOfWeek] = 1;
                }
            }
        }

        setArrDay(arr);
    }

    const getObjectDay = (day) => {
        return {
            year: day.get('year'),
            month: day.get('month'),
            date: day.get("date"),
        }
    }

    const isInMonth = (day1, day2) => {
        if (day1.month === day2.month && day1.year === day2.year) {
            return true;
        }
        return false;
    }

    const nextMonth = () => {
        let nextMonth = defaultDay.add(1, "months");
        setDefaultDay(nextMonth);
        changeMonthYear(nextMonth.get("month"), nextMonth.get("year"));
        updateInfoDay(nextMonth, props.dayFrom, props.dayEnd, count);
    }

    const prevMonth = () => {
        let prevMonth = defaultDay.subtract(1, "months")
        setDefaultDay(prevMonth);
        changeMonthYear(prevMonth.get("month"), prevMonth.get("year"));
        updateInfoDay(prevMonth, props.dayFrom, props.dayEnd, count);
    }

    const changeMonthYear = (month, year) => {
        if (month !== props.month)
            props.onChangeMonth(month);
        if (year !== props.year)
            props.onChangeYear(year);
    }

    const handleDayClick = (value) => {
        if (count === 0) {
            let dayFrom = moment(new Date(props.year, props.month, value));
            props.onDayFromChange(dayFrom);
            props.onDayEndChange(null);
            updateInfoDay(defaultDay, dayFrom, null, count + 1);
            setCount(count + 1);
        }
        if (count === 1) {
            let dayEnd = moment(new Date(props.year, props.month, value));

            props.onDayEndChange(dayEnd);
            updateInfoDay(defaultDay, props.dayFrom, dayEnd);
            props.setError(false);

            setCount(0);
            props.setShow(false);
        }
    }

    const handleMouseMove = (value) => {
        if (count === 1) {
            let dayEnd = moment(new Date(defaultDay.get("year"), defaultDay.get("month"), value));
            updateInfoDay(defaultDay, props.dayFrom, dayEnd, count);
        }
    }

    const handleMouseLeave = () => {
        if (count === 1) {
            updateInfoDay(defaultDay, props.dayFrom, null, count)
        }
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

                    {arrDay.map((value, index) => <DayItem
                        value={index - dayOfWeek + 1}
                        state={value}
                        key={index}
                        onClick={(value) => handleDayClick(value)}
                        onMouseEnter={(value) => handleMouseMove(value)}
                        onMouseLeave={handleMouseLeave}
                    />)}
                </div>
            </div>
        </>
    )
}

const DayItem = (props) => {

    const handleClick = (value) => {
        props.onClick(value);
    }

    switch (props.state) {
        case 0:
            return <div onClick={() => handleClick(props.value)} onMouseEnter={() => props.onMouseEnter(props.value)} className="day-item"><span>{props.value}</span></div>;
        case 1:
            return <div className="day-item block"><span>{props.value}</span></div>
        case 2:
            return <div onClick={() => handleClick(props.value)} onMouseEnter={() => props.onMouseEnter(props.value)} className="day-item item-first-selected"><span>{props.value}</span></div>
        case 3:
            return <div onClick={() => handleClick(props.value)} onMouseLeave={() => props.onMouseLeave()} className="day-item item-end-selected"><span>{props.value}</span></div>
        case 4:
            return <div onClick={() => handleClick(props.value)} onMouseEnter={() => props.onMouseEnter(props.value)} className="day-item item-center-selected"><span>{props.value}</span></div>
        case 5:
            return <div onClick={() => handleClick(props.value)} className="day-item choised-day"><span>{props.value}</span></div>
        default:
            return <div className="day-item"><span></span></div>
    }
}

const PickupBlockDate = (props) => {

    const [show, setShow] = useState(false);
    const [year, setYear] = useState(moment().get("year"));
    const [month, setMonth] = useState(moment().get("month"));
    const [layout, setLayout] = useState(2);  //0-year 1-month 2-date
    const [isShowLayoutSelected, setShowLayoutSelected] = useState(true);
    const [dayFrom, setDayFrom] = useState(null);
    const [dayEnd, setDayEnd] = useState(null);
    const blocks = [{ from: 7, to: 10 }, { from: 20, to: 25 }];
    const [isError, setError] = useState(false);

    useEffect(() => {
        if (show) {
            setShowLayoutSelected(true);
            // setError(false);
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
                <input placeholder={props.placeHolder} onClick={() => setShow(true)} readOnly
                    value={dayFrom && dayEnd ? `${dayFrom.format("DD/MM/YYYY")}-${dayEnd.format("DD/MM/YYYY")}` : ""}
                />

                {layout === 2 && <FormChoiseDay
                    setShow={(value) => setShow(value)}
                    show={show}
                    month={month}
                    year={year}
                    upperLayout={upperLayout}
                    onChangeMonth={(month) => setMonth(month)}
                    onChangeYear={(year) => setYear(year)}
                    isShowLayoutSelected={isShowLayoutSelected}
                    dayFrom={dayFrom}
                    dayEnd={dayEnd}
                    blocks={blocks}
                    onDayFromChange={(value) => setDayFrom(value)}
                    onDayEndChange={(value) => setDayEnd(value)}
                    setError={(value) => setError(value)}
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
            <div className={(isError) ? "required" : "none-required"}>The day you choise not correct</div>
        </>
    )
}

export default PickupBlockDate;