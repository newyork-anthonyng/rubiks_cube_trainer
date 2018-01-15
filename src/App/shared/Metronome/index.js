import React, { Component } from "react";
import * as workerTimers from "worker-timers";
import PropTypes from "prop-types";

let audioContext = null;

class Tone extends Component {
  constructor(props) {
    super(props);

    if (typeof AudioContext !== "undefined") {
      audioContext = new AudioContext();
    }

    this.oscillator = null;
    this.frequency = 440;
  }

  componentDidMount() {
    if (this.props.play) {
      this.createOscillator();
      this.oscillator.start();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.play && this.props.play) {
      this.createOscillator();
      this.oscillator.start();
      this.oscillator.stop(audioContext.currentTime + this.props.length);
    }
  }

  createOscillator() {
    this.oscillator = audioContext.createOscillator();
    this.oscillator.connect(audioContext.destination);
    this.oscillator.frequency.value = this.frequency;
  }

  render() {
    return null;
  }
}

Tone.propTypes = {
  play: PropTypes.bool,
  length: PropTypes.number
};

Tone.defaultProps = {
  length: 0.05,
  play: false
};

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

  componentWillUnmount() {
    workerTimers.clearInterval(this.interval);
  }

  handleClick = () => {
    if (!this.iosAudioContextUnlocked) {
      const buffer = audioContext.createBuffer(1, 1, 22050);
      const node = audioContext.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      this.iosAudioContextUnlocked = true;
    }

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
    const time = 60 / this.state.bpm * 1000;
    // divide by 2 so that Tone is set to play at the beginning of each interval
    return time / 2;
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
