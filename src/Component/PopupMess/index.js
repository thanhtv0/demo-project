import React from "react"
import "./popup.css"

const PopupMess = () => {
    return(
        <>
            <div className="button-mess">
                <i className="fas fa-comment-alt"></i>
            </div>
            <div className="button-mess-mobile">
                <div className="btn-chat">
                    Chat
                </div>
                <div className="btn-chat">
                    <i className="fas fa-phone-volume"></i>
                </div>
            </div>
        </>
    )
}

export default PopupMess;