import React, { Component } from "react";
import PropTypes from "prop-types";
import ScrambleDisplay from "../../shared/ScrambleDisplay";
import scrambler from "cube-scrambler";

class Scramble extends Component {
  constructor(props) {
    super(props);

    this.scrambler = scrambler();

    this.state = {
      scramble: props.initialScramble || this.getScramble()
    };
  }

  getScramble = () => {
    return this.scrambler.scramble().join(" ");
  };

  handleClick = () => {
    this.setState({
      scramble: this.getScramble()
    });
  };

  render() {
    return (
      <div>
        <ScrambleDisplay text={this.state.scramble} />
        <button onClick={this.handleClick}>Next Scramble</button>
      </div>
    );
  }
}

Scramble.propTypes = {
  initialScramble: PropTypes.string
};

export default Scramble;
