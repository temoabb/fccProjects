import React from 'react';
import './Alarm.css';

//აიქონებისთვის
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// ბრეიქისა და სესიის დივები გავიტანე კომპონენტად
import Length from './../Components/Length.jsx';

// let period = "Session"
let color = "#2C3E50";
let border = 'none';

let isAlarmOn = false;


class Alarm extends React.Component {

  constructor(props) {
    super(props)
    this.isInterval = null;
    this.state = {
      breakDuration: 5,
      sessionDuration: 25,
      seconds: 25 * 60,
      isCounting: false,
      period: "Session"
    }

    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleStarter = this.handleStarter.bind(this);

    this.timeMachine = this.timeMachine.bind(this);
  }

  handleBreakDecrement() {
    if (!isAlarmOn) {
      if (this.state.breakDuration > 1) {
        this.setState(prevState => ({
          breakDuration: prevState.breakDuration - 1
        }))
      }
    }
  }

  handleBreakIncrement() {
    if (!isAlarmOn) {
      if (this.state.breakDuration < 60) {
        this.setState(prevState => ({
          breakDuration: prevState.breakDuration + 1
        }))
      }
    }
  }

  handleSessionIncrement() {
    if (!isAlarmOn) {
      if (this.state.sessionDuration < 60) {
        this.setState(prevState => ({
          sessionDuration: prevState.sessionDuration + 1,
          seconds: (prevState.sessionDuration + 1) * 60
        }))
      }
    }
  }


  handleSessionDecrement() {
    if (!isAlarmOn) {
      if (this.state.sessionDuration > 1) {
        this.setState(prevState => ({
          sessionDuration: prevState.sessionDuration - 1,
          seconds: (prevState.sessionDuration - 1) * 60
        }))
      }
    }
  }


  handleStarter() {
    if (this.state.isCounting) {
      isAlarmOn = false;
      clearInterval(this.isInterval)
      this.setState({
        isCounting: false
      })
    } else {
      this.setState({
        isCounting: true
      })
      isAlarmOn = true

      this.isInterval = setInterval(() => {
        if (this.state.seconds === 0) {
          this.audioBeep.play();
          if (this.state.period === "Session") {
            this.setState({
              period: "Break",
              seconds: this.state.breakDuration * 60 + 1
            })
            // console.log('switched to Break', this.state.period)

          } else if (this.state.period === "Break") {
            this.setState({
              period: "Session",
              seconds: this.state.sessionDuration * 60 + 1
            })
            // console.log('switched to Session', this.state.period)
          }
        }
        this.setState(prevState => ({
          seconds: prevState.seconds - 1
        }))
      }, 1000)

    }
  }


  timeMachine(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (minutes === "00") {
      color = "#d92027";
    } else {
      color = "#2C3E50";
    }
    let result = `${minutes}:${seconds}`
    return result;
  }



  handleRestart() {
    color = "#2C3E50";
    isAlarmOn = false
    clearInterval(this.isInterval);
    this.isInterval = null;
    this.setState({
      breakDuration: 5,
      sessionDuration: 25,
      seconds: 25 * 60,
      isCounting: false,
      period: "Session"
    })

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }


  render() {
    return (
      //მაღვიძარის დივი
      <div className="alarm">

        {/* მარცხენაყური */}
        <div className="absolute__left">
          <span></span>
        </div>

        {/* მარჯვენა ყური */}
        <div className="absolute__right">
          <span></span>
        </div>

        {/* სახელწოდების დივი */}
        <div className="alarm__subsection alarm__title">Alarm</div>

        {/* ბრეიქისა და სესიის ხანგრძლივობის დასაყენებელი დივი */}

        <div className="alarm__subsection length__control">
          <Length
            defaultBreak="break-length"
            idType="break-label"
            decBtn="break-decrement"
            incBtn="break-increment"
            decrement={this.handleBreakDecrement}
            increment={this.handleBreakIncrement}
            type="BREAK"
            duration={this.state.breakDuration} />

          <Length
            defaultBreak="session-length"
            idType="session-label"
            decBtn="session-decrement"
            incBtn="session-increment"
            decrement={this.handleSessionDecrement}
            increment={this.handleSessionIncrement}
            type="SESSION"
            duration={this.state.sessionDuration} />
        </div>


        {/* ტაიმერის დივი */}

        <div className="alarm__subsection alarm__timer" style={{ color: color, border: border }}>
          <div id="timer-label" style={{ width: 130 }}> {this.state.period} </div>
          <div id="time-left"> {this.timeMachine(this.state.seconds)} </div>
        </div>


        {/* სტარტის, პაუზისა და რესტარტის დივი */}
        <div className="alarm__subsection control__buttons">

          <div id="start_stop" onClick={this.handleStarter} className="control__buttons__pause__div">
            <div>Play/</div>
            <div >Pause</div>
          </div>
          <div id="reset" onClick={this.handleRestart} className="control__button">Reset</div>

        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(sound) => {
            this.audioBeep = sound
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />

      </div>
    )
  }
}

export default Alarm;