import React, { Component } from "react";
import PropTypes from "prop-types";

class Tone extends Component {
  constructor(props) {
    super(props);

    if (typeof AudioContext !== "undefined") {
      this.audioContext = new AudioContext();
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
      this.oscillator.stop(this.audioContext.currentTime + this.props.length);
    } else if (prevProps.play && !this.props.play) {
      this.oscillator.stop();
    }
  }

  createOscillator() {
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.connect(this.audioContext.destination);
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

export default Tone;
