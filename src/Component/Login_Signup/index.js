import React from "react"
import "./login.css"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useHistory } from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    // 1 Login, 2 SignUp

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-background">
                    <div className="login-tab">
                        <button onClick={() => history.push('/signup')} className={props.activeForm === 2 ? "selected" : ""}>Join now</button>
                        <button onClick={() => history.push("/login")} className={props.activeForm === 1 ? "selected tab-login" : "tab-login"}>Login</button>
                    </div>
                    {props.activeForm === 1 ? <LoginForm /> : <SignupForm />}
                </div>
            </div>
        </div>
    )
}

export default Login;