import React, { useState, useEffect } from 'react'
import moment from "moment"

const FormChoiseYear = (props) => {

    const [years, setYears] = useState([]);

    useEffect(() => {
        if (props.show) {
            let thisYear = moment().get("year");
            let arr = new Array(19);
            for (let i = 0; i < 19; i++) {
                arr[i] = thisYear - 9 + i;
            }
            setYears(arr);
        }
    }, [props.show])

    return (
        <div style={{width: "100%" }} className={`layout-two-calendar ${props.show && "show"}`}>
            <div className="calendar" tabIndex={0}>
                <div className="select-month">
                    <i onClick={null} className="fas fa-chevron-left"></i>
                    <div>Please select a year</div>
                    <i onClick={null} className="fas fa-chevron-right"></i>
                </div>
                <div className="layout-choise-year">
                    {years.map((value, index) => {
                        return <div onClick={() => props.onChange(value) } key={index} className={`year-item ${(value === props.year) && "year-item-selected"}`}>{value}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default FormChoiseYear;