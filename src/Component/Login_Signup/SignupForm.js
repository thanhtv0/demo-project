import React, { useState } from "react"
import InputEmailRequired from "./InputEmail"
import InputPasswordRequired from "./InputPassword"
import { Link } from 'react-router-dom'

const InputName = (props) => {

    const [isShowRequired, setShow] = useState(false);

    const onTextChange = (e) => {
        if(props.label === "First name")
        {
            props.isShowSignup({type: 'firstname', value: e.target.value})
        }
        else {
            props.isShowSignup({type: 'lastname', value: e.target.value})
        }
        if (e.target.value === "") {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }

    return (
        <div className={props.className}>
            <label>{props.label}</label>
            <input className={isShowRequired ? "required" : ""} type="text" placeholder={props.placeholder} onBlur={(e) => { setShow(e.target.value === "") }} onChange={onTextChange} />
            <div className={isShowRequired ? "required" : "none-required"}>{props.requiredText}</div>
        </div>
    )
}

const Inputgender = (props) => {
    const [isShowRequired, setShow] = useState(false);

    const handleSelect = (e) => {
        setShow(e.target.value === "");
        props.isShowSignup({type: "gender", value: e.target.value})
    }

    return (
        <>
            <label>Gender</label>
            <div className="select-custom" onBlur={(e) => setShow(e.target.value === "")}>
                <select className={isShowRequired ? "required" : ""} onChange={handleSelect} defaultValue="">
                    <option disabled value="">Your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <i className="fas fa-chevron-down"></i>
            </div>
            <div className={isShowRequired ? "required" : "none-required"}>Gender is required</div>
        </>
    )
}

const InputDate = (props) => {

    const [isShowRequired, setShow] = useState(false);
    const [isShowLower23Year, setShowLower23Year] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState({
        date: "",
        month: "",
        year: "",
    })

    const dates = new Array(31).fill(0);
    const months = new Array(12).fill(0);
    const nowYear = (new Date()).getFullYear();
    const years = new Array(80).fill(0);

    const checkValidDay = (object) => {
        let newDateOfBirth = dateOfBirth;
        newDateOfBirth[object.type] = object.value;

        if (newDateOfBirth.date === "" || newDateOfBirth.month === "" || newDateOfBirth.year === "") {
            setShow(true);
            return;
        }

        setShowLower23Year(false);
        let isDateValid = false;

        if (newDateOfBirth.month === "2") {
            let d = 0;
            if (isNamNhuan(parseInt(newDateOfBirth.year))) {
                d = 29;
            }
            else {
                d = 28;
            }
            if (parseInt(newDateOfBirth.date) <= d) {
                isDateValid = true;
            }
            else {
                isDateValid = false
            }
            setShow(!isDateValid);
        }
        else {
            switch (newDateOfBirth.month) {
                case "4":
                case "6":
                case "9":
                case "11":
                    {
                        if (newDateOfBirth.date === "31")
                            isDateValid = false
                        else isDateValid = true;
                        setShow(!isDateValid);
                        break;
                    }

                default:
                    {
                        isDateValid = true;
                        setShow(!isDateValid);
                        break;
                    }
            }
        }

        if (isDateValid) {
            if ((nowYear - parseInt(newDateOfBirth.year)) < 23) {
                setShow(true);
                setShowLower23Year(true);
            }
            else {
                setShowLower23Year(false);
                let dateofbirth = newDateOfBirth.year + "/" + newDateOfBirth.month + "/" + newDateOfBirth.date; 
                props.isShowSignup({type: "dateofbirth", value: dateofbirth})
            }
        }
    }

    const isNamNhuan = (year) => {
        if (year % 400 === 0) {
            return true;
        }
        if (year % 4 === 0 && year % 100 !== 0)
            return true;
        return false;
    }

    return (
        <>
            <label>Date of birth</label>
            <div className="date">
                <div className="select-custom">
                    <select onChange={(e) => checkValidDay({ type: "date", value: e.target.value })} className={isShowRequired ? "required" : ""} defaultValue="">
                        <option disabled value="">Date</option>
                        {dates.map((e, index) => <option key={index} value={(index + 1).toString()}>{index + 1}</option>)}
                    </select>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="select-custom">
                    <select onChange={(e) => checkValidDay({ type: "month", value: e.target.value })} className={isShowRequired ? "required" : ""} defaultValue="">
                        <option disabled value="">Month</option>
                        {months.map((e, index) => <option key={index} value={(index + 1).toString()}>{index + 1}</option>)}
                    </select>
                    <i className="fas fa-chevron-down"></i>
                </div>
                <div className="select-custom">
                    <select onChange={(e) => checkValidDay({ type: "year", value: e.target.value })} className={isShowRequired ? "required" : ""} defaultValue="">
                        <option disabled value="">Year</option>
                        {years.map((e, index) => <option key={index} value={(nowYear - index).toString()}>{nowYear - index}</option>)}
                    </select>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            <div className={isShowRequired ? "required errordate" : "none-required errordate"}>{isShowLower23Year ? "A user must be at least 22 years of age to join the Drive lah platform" : "A valid date is required"}</div>
        </>
    )
}

const SignupForm = () => {
    const [isDisableSubmit, setDisable] = useState(true);

    const [data, setData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        gender: "",
        dateofbirth: "",
        password: "",
    })

    const isShowSignup = (object) => {
        let newData = data;
        newData[object.type] = object.value;
        console.log(newData)
        setData(newData)
        setDisable(!isFullData(newData))
    }

    const isFullData = (data) => {
        for(let [key, value] of Object.entries(data)) {
            if(value === "")
                return false;
        }
        return true;
    }

    return (
        <form className='form form-signup'>
            <InputEmailRequired checkFormHasValue={isShowSignup} />
            <div className="input-name">
                <InputName
                    label="First name"
                    placeholder="John"
                    requiredText="You need to add a first name."
                    className="first-name"
                    isShowSignup={isShowSignup}
                />
                <InputName
                    label="Last name"
                    placeholder="Doe"
                    requiredText="You need to add a last name."
                    isShowSignup={isShowSignup}
                />
            </div>
            <Inputgender isShowSignup={isShowSignup}/>
            <InputDate isShowSignup={isShowSignup}/>
            <InputPasswordRequired checkFormHasValue={isShowSignup}/>
            <div className="by-signing">
                By signing up you accept the <Link to="#">terms and conditions</Link>
            </div>

            <input className={isDisableSubmit ? "disable" : ""} type="submit" value="join now" disabled={isDisableSubmit} />

        </form>
    )
}

export default SignupForm;
