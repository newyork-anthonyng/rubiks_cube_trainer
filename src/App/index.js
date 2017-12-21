import React, { Component } from "react";
import PropTypes from "prop-types";

import ScrambleHistory from "../ScrambleHistory";

import getRandomSolve from "rubiks-cross-trainer";
import createEmptyArray from "create-empty-array";

class App extends Component {
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
    const containerStyle = {
      display: "flex",
      flexDirection: "column"
    };

    const headerStyle = {
      textAlign: "center"
    };

    const formStyle = {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    };

    const selectStyle = {
      marginBottom: "1rem"
    };

    return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>{this.state.scramble}</h1>

        <div style={formStyle}>
          <div style={selectStyle}>
            <span>Number of moves to generate cross:</span>
            <select
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

App.propTypes = {
  initialScramble: PropTypes.string
};

export default App;
