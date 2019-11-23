import React from "react"
import "./video.css"

const Video = (props) => {
    return (
        <div className={props.showPopupVideo ? "video-modal active" : "video-modal"}>
            <div className="video-modal-content">
                <div className="btn-close" onClick={props.handleClickClosePopup}>CLOSE X</div>
                {props.showPopupVideo && <iframe title="video" className="video"
                    src={`https://www.youtube.com/embed/OaOzjZiVaws`}
                >
                </iframe>}
            </div>
        </div>
    )
}

export default Video;