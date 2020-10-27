import React from 'react';
import './display.css'
import BigPad from './pads/BigPad.jsx'
import SmallPad from './pads/SmallPad.jsx'


// https://www.rollingstone.com/wp-content/uploads/2018/06/rs-171079-Whiplash_still3_MilesTeller.jpg?resize=1800,1200&w=1800

const sounds = {
  Q: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  W: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  E: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  A: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  S: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  D: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  Z: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  X: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  C: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'

}

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      innerHeading: "Here should be key"
    }
    this.handleHeaderChanger = this.handleHeaderChanger.bind(this)

  }

  handleHeaderChanger(digit) {
    this.setState({
      innerHeading: ` ${digit} is playing at the moment,`
    })
  }


  render() {

    const { innerHeading } = this.state
    return (
      <div id="drum-machine">

        <div className="drum__section">

          <div className="first__section">
            <SmallPad changeHeading={() => { this.handleHeaderChanger("Q") }} keyboard="Q" audioSrc={sounds.Q} />
            <BigPad changeHeading={() => { this.handleHeaderChanger("X") }} keyboard="X" audioSrc={sounds.X} />
          </div>

          <div className="second__section">
            <div className="flex second__up">
              <SmallPad changeHeading={() => { this.handleHeaderChanger("E") }} keyboard="E" audioSrc={sounds.E} />
              <SmallPad changeHeading={() => { this.handleHeaderChanger("A") }} keyboard="A" audioSrc={sounds.A} />
            </div>
            <div className="flex">
              <SmallPad changeHeading={() => { this.handleHeaderChanger("S") }} keyboard="S" audioSrc={sounds.S} />
            </div>
            <div className="flex second__down">
              <SmallPad changeHeading={() => { this.handleHeaderChanger("D") }} keyboard="D" audioSrc={sounds.D} />
              <SmallPad changeHeading={() => { this.handleHeaderChanger("Z") }} keyboard="Z" audioSrc={sounds.Z} />
            </div>
          </div>

          <div className="third__section">
            <SmallPad changeHeading={() => { this.handleHeaderChanger("W") }} keyboard="W" audioSrc={sounds.W} />
            <BigPad changeHeading={() => { this.handleHeaderChanger("C") }} keyboard="C" audioSrc={sounds.C} />
          </div>
        </div>
        <div className="display__div">
          <h1 id="display"> {innerHeading}</h1>
          <p>"That's not quite my tempo."</p>
          <p>Faster.</p>
          <img className="display__div__image" src="https://cdn.flickeringmyth.com/wp-content/uploads/2020/02/Whiplash-JK-Simmons-600x338.jpg" alt="whiplash" />
        </div>
      </div>
    )
  }
}

document.addEventListener('keydown', (event) => {

  let id = event.key.toUpperCase();
  // console.log(id)

  const audio = document.getElementById(id);

  // console.log('audio', audio)

  if (audio) {



    audio.currentTime = 0;

    audio.play();

  }

})



export default Display;