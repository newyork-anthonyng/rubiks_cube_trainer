import React, { Component } from "react";
import PropTypes from "prop-types";

import ScrambleDisplay from "../../shared/ScrambleDisplay";
import ScrambleHistory from "./components/ScrambleHistory";
import getRandomSolve from "rubiks-cross-trainer";
import createEmptyArray from "create-empty-array";

const containerStyle = {
  display: "flex",
  flexDirection: "column"
};

const formStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const selectContainer = {
  marginBottom: "1rem"
};

const selectStyle = {
  fontSize: 16
};

class CrossTrainer extends Component {
  constructor(props) {
    super(props);

    this.optionsArray = createEmptyArray(8);
    this.initialDifficulty = 1;

    this.state = {
      difficulty: this.initialDifficulty,
      scramble: props.initialScramble || getRandomSolve(this.initialDifficulty),
      scrambleHistory: []
    };
  }

  getRandomSolve = () => {
    this.setState(prevState => ({
      scramble: getRandomSolve(prevState.difficulty),
      scrambleHistory: [
        {
          difficulty: prevState.difficulty,
          scramble: prevState.scramble
        }
      ].concat(prevState.scrambleHistory)
    }));
  };

  handleSelectChange = e => {
    this.setState({
      difficulty: e.target.value
    });
  };

  render() {
    return (
      <div style={containerStyle}>
        <ScrambleDisplay text={this.state.scramble} />

        <div style={formStyle}>
          <div style={selectContainer}>
            <span>Number of moves to generate cross:</span>
            <select
              style={selectStyle}
              value={this.state.difficulty}
              onChange={this.handleSelectChange}
            >
              {this.optionsArray.map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={this.getRandomSolve}>Get random solve</button>
        </div>

        <ScrambleHistory history={this.state.scrambleHistory} />
      </div>
    );
  }
}

CrossTrainer.propTypes = {
  initialScramble: PropTypes.string
};

export default CrossTrainer;
