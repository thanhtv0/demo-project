import React, { useState } from "react"
import InputEmailRequired from "./InputEmail"
import { Link } from "react-router-dom"
import InputPasswordRequired from "./InputPassword"

const LoginForm = (props) => {
    const [isDisableSubmit, setDisable] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const checkFormHasValue = (object) => {
        let newData = data;
        newData[object.type] = object.value;
        setData(newData);
        if (checkDataFull(data)) {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }

    const checkDataFull = (data) => {
        for (const [key, value] of Object.entries(data)) {
            if (value === "")
                return false;
        }
        return true;
    }

    return (
        <form className='form form-login'>
            <InputEmailRequired
                checkFormHasValue={checkFormHasValue}
            />
            <InputPasswordRequired
                checkFormHasValue={checkFormHasValue} />
            <div className="forgot-pass">
                <Link to="#">Forgot your password?</Link> No problem.
                    </div>
            <input className={isDisableSubmit ? "disable" : ""} type="submit" value="Login" disabled={isDisableSubmit} />
        </form>
    )
}

export default LoginForm
