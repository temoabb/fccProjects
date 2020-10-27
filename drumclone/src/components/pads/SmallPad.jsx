import React from 'react'
import './smallPad.css'
class SmallPad extends React.Component {

  constructor(props) {
    super(props)
    this.playKeyMusic = this.playKeyMusic.bind(this);
  }

  playKeyMusic() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  render() {
    return (

      <div onClick={this.props.changeHeading}>
        <div className="small__outline drum-pad" id={`pad-${this.props.keyboard}`} onClick={this.playKeyMusic}>
          <div className="line">
            <div className="middle__black">{this.props.keyboard}</div>
          </div>
          <audio
            className="clip"
            id={this.props.keyboard}
            // preload="auto"
            ref={(sound) => {
              this.audio = sound
            }}
            src={this.props.audioSrc} />
        </div>
      </div>
    )
  }
}


export default SmallPad

