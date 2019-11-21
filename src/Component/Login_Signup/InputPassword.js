import React, { useState } from "react"

const InputPasswordRequired = (props) => {

    const [isShowRequired, setShow] = useState(false);

    const onTextChange = (e) => {
        props.checkFormHasValue({ type: "password", value: e.target.value })
        if (e.target.value === "") {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }

    return (
        <div className={props.className}>
            <label>Password</label>
            <input className={isShowRequired ? "required":""} type="password" placeholder="Enter your password..." onBlur={(e) => { setShow(e.target.value === "") }} onChange={onTextChange} />
            <div className={isShowRequired ? "required" : "none-required"}>This field is required</div>
        </div>
    )
}

export default InputPasswordRequired;