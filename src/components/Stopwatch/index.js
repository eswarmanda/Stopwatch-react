import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStartButton = () => {
    console.log('start Clicked')
    const {isTimerRunning} = this.state

    if (isTimerRunning === false) {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onClickStopButton = () => {
    console.log('stop Clicked')
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.clearTimerInterval()
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onClickResetButton = () => {
    console.log('reset Clicked')
    this.clearTimerInterval()
    this.setState(initialState)
  }

  modifiedTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const updatingTimerSecs = timerLimitInMinutes * 60 + timeElapsedInSeconds
    const minutes = Math.floor(updatingTimerSecs / 60)
    const seconds = Math.floor(updatingTimerSecs % 60)

    const stringifyMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifySeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifyMinutes}:${stringifySeconds}`
  }

  render() {
    return (
      <div className="main-container">
        <div className="stop-watch-card">
          <div className="heading-timer-card">
            <h1>Stopwatch</h1>
            <div className="timer-card">
              <div className="description">
                <img
                  className="img-height"
                  src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                  alt="stopwatch"
                />
                <p>Timer</p>
              </div>
              <div>
                <h2>{this.modifiedTimeFormat()}</h2>
              </div>
              <div>
                <button
                  className="btn1"
                  type="button"
                  onClick={this.onClickStartButton}
                >
                  Start
                </button>
                <button
                  className="btn2"
                  type="button"
                  onClick={this.onClickStopButton}
                >
                  Stop
                </button>
                <button
                  className="btn3"
                  type="button"
                  onClick={this.onClickResetButton}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
