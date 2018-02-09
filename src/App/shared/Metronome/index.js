import React, { Component } from "react";
import * as workerTimers from "worker-timers";
import Tone from "react-tone";

const labelStyle = {
  display: "block",
  marginBottom: 16,
  marginTop: 16
};

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      isActive: false,
      bpm: 60,
      volume: 1
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

  handleVolumeChange = e => {
    this.setState({
      volume: e.target.value
    });
  };

  render() {
    const { isActive, bpm, isPlaying, volume } = this.state;

    return (
      <div>
        Metronome
        <button onClick={this.handleClick}>
          {isActive ? "Pause" : "Play"}
        </button>
        <div>
          <label style={labelStyle}>
            Update BPM: {bpm}
            <input
              type="range"
              value={bpm}
              min={45}
              max={160}
              onChange={this.handleBpmChange}
            />
          </label>
          <label style={labelStyle}>
            Update Volume
            <input
              type="range"
              value={volume}
              min={0}
              max={1}
              step={0.1}
              onChange={this.handleVolumeChange}
            />
          </label>
        </div>
        <Tone
          play={isPlaying}
          volume={volume}
          audioContext={this.audioContext}
        />
      </div>
    );
  }
}

export default Metronome;
