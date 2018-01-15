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

    this.iosAudioContextUnlocked = false;
  }

  componentDidMount() {
    this.audioContext = new AudioContext();
  }

  componentWillUnmount() {
    workerTimers.clearInterval(this.interval);
  }

  handleClick = () => {
    if (!this.iosAudioContextUnlocked) this.playEmptyBuffer();

    this.setState(
      prevState => ({
        isActive: !prevState.isActive
      }),
      () => {
        if (this.state.isActive) {
          this.startTimer();
        } else {
          // stop playing the timer
          workerTimers.clearInterval(this.interval);
          this.interval = null;
        }
      }
    );
  };

  playEmptyBuffer = () => {
    const buffer = this.audioContext.createBuffer(1, 1, 22050);
    const node = this.audioContext.createBufferSource();
    node.buffer = buffer;
    node.start(0);
    this.iosAudioContextUnlocked = true;
  };

  startTimer = () => {
    this.interval = workerTimers.setInterval(() => {
      this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
    }, this.calculateTimeInterval());
  };

  calculateTimeInterval = () => {
    const time = 60 / this.state.bpm * 1000;
    // divide by 2 so that Tone is set to play at the beginning of each interval
    return time / 2;
  };

  handleBpmChange = e => {
    this.setState({ bpm: e.target.value }, () => {
      if (this.state.isActive) {
        workerTimers.clearInterval(this.interval);
        this.startTimer();
      }
    });
  };

  render() {
    const { isActive, bpm, isPlaying, length } = this.state;

    return (
      <div>
        <button onClick={this.handleClick}>
          {isActive ? "Pause" : "Play"}
        </button>
        <label>
          Update BPM: {bpm}
          <input
            type="range"
            value={bpm}
            min={45}
            max={160}
            onChange={this.handleBpmChange}
          />
        </label>

        <Tone
          play={isPlaying}
          length={length}
          audioContext={this.audioContext}
        />
      </div>
    );
  }
}

export default Metronome;
