import React ,{useState} from "react"

const InputEmailRequired = (props) => {

    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [isShowRequired, setShow] = useState(false);
    const [isCheckMail, setCheck] = useState(false);

    const handlechangeText = (e) => {
        if (e.target.value === "") {
            setCheck(false);
            props.checkFormHasValue({ type: "email", value: e.target.value })
            return;
        }
        if (!regEmail.test(e.target.value.toLowerCase())) {
            setShow(true);
            setCheck(true);
            props.checkFormHasValue({ type: "email", value: "" })

        }
        else {
            setShow(false);
            props.checkFormHasValue({ type: "email", value: e.target.value })
        }
    }

    const onBlur = (e) => {
        if (e.target.value === "") {
            setShow(true);
        }
    }

    return (
        <>
            <label>Email</label>
            <input onChange={handlechangeText} onBlur={onBlur} className={isShowRequired ? "required" : ""} type="email" placeholder="john.doe@example.com" />
            <div className={isShowRequired ? "required" : "none-required"}>{isCheckMail ? "A valid email address is required" : "This field is required"}</div>
        </>
    )
}

export default InputEmailRequired;