import React from 'react'
import "./VideoBG.css"
import VideoBackGround from "../../assets/video-bg.mp4"

const VideoBG = () => {
  return (
    <div>
        <video className="videoBg" src={VideoBackGround} autoPlay muted loop />
    </div>
  )
}

export default VideoBG