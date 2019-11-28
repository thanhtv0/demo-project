import React, { useState, useEffect, useRef } from 'react'
import moment from "moment"
import FormChoiseMonth from "./FormChoiseMonth"
import FormChoiseYear from "./FormChoiseYear"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getDayInMonth = (month, year) => {
    return (new Date(year, month, 0)).getDate();
}

const FormChoiseDay = (props) => {

    const [defaultDay, setDefaultDay] = useState(null);
    const [nextDefaultDay, setNextDefaultDay] = useState(null);
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [nextDayOfWeek, setNextDayOfWeek] = useState(0);
    const [arrDay, setArrDay] = useState([]);
    const [nextArrDay, setNextArrDay] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (props.show === true) {
            let defaultDay = moment(new Date(props.year, props.month, 1));
            let nextDefaultDay = defaultDay.clone();
            nextDefaultDay.add(1,"months");
            let { dayFrom, dayEnd } = props;
            if (dayFrom === null || dayEnd === null) {
                dayFrom = null;
                dayEnd = null;

                props.onDayFromChange(null);
                props.onDayEndChange(null);
            }
            setCount(0);
            setDefaultDay(defaultDay);
            setNextDefaultDay(nextDefaultDay);
            updateInfoDay(defaultDay, dayFrom, dayEnd, null, 1);
            if(props.type === 2) {
                updateInfoDay(nextDefaultDay, dayFrom, dayEnd, null, 2);
            }
        }
    }, [props.show])

    const updateInfoDay = (defaultDay, dayFrom, dayEnd, count, whichArray) => {
        let month = defaultDay.get("month");
        let year = defaultDay.get("year");

        let dayOfWeek = (new Date(year, month, 1)).getDay();
        if(whichArray === 1) {
            setDayOfWeek(dayOfWeek);
        }
        else {
            setNextDayOfWeek(dayOfWeek);
        }

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

        let startMonth = moment(new Date(year, month, 1)).valueOf();
        let endMonth = moment(new Date(year, month, dayInMonth)).valueOf();

        if(dayFrom) {
            let timeDayFrom = dayFrom.valueOf();
            let oneDay =  60*60*24*1000; //time stamp one day

            if(timeDayFrom <= endMonth && timeDayFrom >= startMonth) {
                arr[dayFrom.get("date") - 1 + dayOfWeek] = 2;
            }

            if(dayEnd) {
                let timeDayEnd = dayEnd.valueOf();
                if(timeDayFrom === timeDayEnd) {
                    arr[dayFrom.get("date") - 1 + dayOfWeek] = 5;
                }
                else {
                    let area = (timeDayEnd - timeDayFrom) / oneDay;
                    let dayFromClone = dayFrom.clone().add(1, "days");
                    for(let i=0;i<area-1;i++) {
                        if(dayFromClone.valueOf() >= startMonth && dayFromClone.valueOf() <= endMonth)
                        {
                            arr[dayFromClone.get("date") - 1 + dayOfWeek] = 4;
                        }
                        dayFromClone.add(1,"days");
                    }
                    if(timeDayEnd <= endMonth && timeDayEnd >= startMonth) {
                        arr[dayEnd.get("date") - 1 + dayOfWeek] = 3;
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

        if(whichArray === 1) {
            setArrDay(arr);
        } else {
            setNextArrDay(arr);
        }
    }

    const nextMonth = () => {
        let nextMonth = defaultDay.add(1, "months");
        setDefaultDay(nextMonth);
        changeMonthYear(nextMonth.get("month"), nextMonth.get("year"));
        updateInfoDay(nextMonth, props.dayFrom, props.dayEnd, count, 1);
        if(props.type === 2) {
            let nextNextMonth = nextMonth.clone().add(1,"months");
            setNextDefaultDay(nextNextMonth);
            updateInfoDay(nextNextMonth, props.dayFrom, props.dayEnd, count, 2);
        }
    }

    const prevMonth = () => {
        let prevMonth = defaultDay.clone().subtract(1, "months")
        if(props.type === 2) {
            setNextDefaultDay(defaultDay);
            updateInfoDay(defaultDay, props.dayFrom, props.dayEnd, count, 2);
        }
        setDefaultDay(prevMonth);
        updateInfoDay(prevMonth, props.dayFrom, props.dayEnd, count, 1);
        changeMonthYear(prevMonth.get("month"), prevMonth.get("year"));
    }

    const changeMonthYear = (month, year) => {
        if (month !== props.month)
            props.onChangeMonth(month);
        if (year !== props.year)
            props.onChangeYear(year);
    }

    const handleDayClick = (day) => {
        if (count === 0) {
            props.onDayFromChange(day);
            props.onDayEndChange(null);
            setCount(count + 1);
            updateInfoDay(defaultDay, day, null,1, 1);
            if(props.type === 2) {
                updateInfoDay(nextDefaultDay, day, null,1, 2);
            }
        }
        if (count === 1) {
            props.onDayEndChange(day);
            updateInfoDay(defaultDay, props.dayFrom, day,1);
            setCount(0);
            props.setShow(false);
        }
    }

    const handleMouseMove = (day) => {
        if (count === 1) {
            updateInfoDay(defaultDay, props.dayFrom, day, count,1);
            if(props.type === 2) {
                updateInfoDay(nextDefaultDay, props.dayFrom, day, count,2);
            }
        }
    }

    const handleMouseLeave = () => {
        if (count === 1) {
            updateInfoDay(defaultDay, props.dayFrom, null, count,1);
            if(props.type === 2) {
                updateInfoDay(nextDefaultDay, props.dayFrom, null, count,2);
            }
        }
    }

    return (
        <div style={{width: `${props.type === 1 && "100%"}`}} className={`layout-two-calendar ${props.show && "show"}`}>
            <div className="calendar" tabIndex={0}>
                <div className="select-month">
                    <i onClick={prevMonth} className="fas fa-chevron-left"></i>
                    <div onClick={() => props.upperLayout()}>{months[props.month]} {props.year}</div>
                    {props.type === 1 && <i onClick={nextMonth} className="fas fa-chevron-right"></i>}
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
                        onClick={(value) => handleDayClick(defaultDay.clone().set("date", value))}
                        onMouseEnter={(value) => handleMouseMove(defaultDay.clone().set("date", value))}
                        onMouseLeave={handleMouseLeave}
                    />)}
                </div>
            </div>
            { props.type === 2 && <div className="calendar" tabIndex={0}>
                <div className="select-month">
                    {props.type === 1 && <i onClick={prevMonth} className="fas fa-chevron-left"></i>}
                    <div onClick={props.type === 1 ? () => props.upperLayout() : null}>{nextDefaultDay && months[nextDefaultDay.get("month")]} {nextDefaultDay && nextDefaultDay.get("year")}</div>
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

                    {nextArrDay.map((value, index) => <DayItem
                        value={index - nextDayOfWeek + 1}
                        state={value}
                        key={index}
                        onClick={(value) => handleDayClick(nextDefaultDay.clone().set("date", value))}
                        onMouseEnter={(value) => handleMouseMove(nextDefaultDay.clone().set("date", value))}
                        onMouseLeave={handleMouseLeave}
                    />)}
                </div>
            </div>}
        </div>

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
    const type = 2; // 1 - one calendar, 2 - two calendar;

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
                    type={type}
                />}

                {layout === 1 && <FormChoiseMonth
                    show={show}
                    onChangeMonth={(month) => handleMonthChange(month)}
                    onChangeYear={(year) => setYear(year)}
                    month={month}
                    year={year}
                    upperLayout={upperLayout}
                    type={type}
                />}

                {layout === 0 && <FormChoiseYear
                    show={show}
                    year={year}
                    onChange={(year) => handleYearChange(year)}
                    type={type}
                />}

            </div>
            <div className={(isError) ? "required" : "none-required"}>The day you choise not correct</div>
        </>
    )
}

export default PickupBlockDate;