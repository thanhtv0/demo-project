import React from 'react'
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const FormChoiseMonth = (props) => {

    const handleClickMonth = (month) => {
        if (props.onChangeMonth) {
            props.onChangeMonth(month);
        }
    }

    const increaseYear = () => {
        props.onChangeYear(props.year + 1);
    }

    const decreaseYear = () => {
        props.onChangeYear(props.year - 1);
    }

    return (
        <div style={{width: "100%" }} className={`layout-two-calendar ${props.show && "show"}`}>
            <div className="calendar" tabIndex={0}>
                <div className="select-month">
                    <i onClick={decreaseYear} className="fas fa-chevron-left"></i>
                    <div onClick={() => props.upperLayout()}>{props.year}</div>
                    <i onClick={increaseYear} className="fas fa-chevron-right"></i>
                </div>
                <div className="layout-choise-month">
                    {months.map((ele, index) => {
                        return <div onClick={() => handleClickMonth(index)} className={`month-item ${(props.month === index) && "month-item-selected"}`} key={index}>{ele.substr(0, 3)}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default FormChoiseMonth;