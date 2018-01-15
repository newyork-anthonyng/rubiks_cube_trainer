import React, { Component } from "react";
import * as workerTimers from "worker-timers";
import Tone from "../Tone";

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isActive: false,
      bpm: 60
    };
  }

  componentWillUnmount() {
    workerTimers.clearInterval(this.interval);
  }

  handleClick = () => {
    this.setState(
      prevState => ({
        isActive: !prevState.isActive
      }),
      () => {
        if (this.state.isActive) {
          // start playing the timer
          this.interval = workerTimers.setInterval(() => {
            this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
          }, this.calculateTimeInterval());
        } else {
          // stop playing the timer
          workerTimers.clearInterval(this.interval);
          this.interval = null;
        }
      }
    );
  };

  calculateTimeInterval = () => {
    return 60 / this.state.bpm * 1000;
  };

  handleBpmChange = e => {
    this.setState({ bpm: e.target.value }, () => {
      if (this.state.isActive) {
        workerTimers.clearInterval(this.interval);
        this.interval = workerTimers.setInterval(() => {
          this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
        }, this.calculateTimeInterval());
      }
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isActive ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          value={this.state.bpm}
          min={45}
          max={160}
          onChange={this.handleBpmChange}
        />
        <span>BPM: {this.state.bpm}</span>

        <Tone play={this.state.isPlaying} length={this.state.length} />
      </div>
    );
  }
}

export default Metronome;
