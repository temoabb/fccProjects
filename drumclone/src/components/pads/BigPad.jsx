import React from 'react'
import './bigPad.css'


class BigPad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inner: ''
    }
    this.playKeyMusic = this.playKeyMusic.bind(this);
  }

  playKeyMusic() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  render() {
    return (
      <div className="big__outline">
        <div className="big__inline" onClick={this.props.changeHeading}>
          <div className="horisontal"></div>
          <div className="vertical"></div>
          <div className="main drum-pad" id={`pad-${this.props.keyboard}`} onClick={this.playKeyMusic} >
            {this.props.keyboard}
            <audio
              className="clip"
              id={this.props.keyboard}
              ref={(sound) => {
                this.audio = sound
              }}
              src={this.props.audioSrc} />
          </div>
        </div>
      </div>
    )
  }
}


export default BigPad
