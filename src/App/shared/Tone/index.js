import React, { Component } from "react";
import PropTypes from "prop-types";

class Tone extends Component {
  componentDidMount() {
    this.oscillator = null;
    this.frequency = 440;

    if (this.props.play) {
      this.createOscillator();
      this.oscillator.start();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.play && this.props.play) {
      this.createOscillator();
      this.oscillator.start();
      this.oscillator.stop(
        this.props.audioContext.currentTime + this.props.length
      );
    }
  }

  createOscillator() {
    const { audioContext } = this.props;
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
  length: PropTypes.number,
  audioContext: PropTypes.object
};

Tone.defaultProps = {
  length: 0.05,
  play: false
};

export default Tone;
