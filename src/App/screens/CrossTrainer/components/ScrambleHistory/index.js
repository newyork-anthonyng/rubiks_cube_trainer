import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ScrambleHistory = ({ history }) => (
  <Fragment>
    <h2>Scramble History</h2>
    {history.length === 0 ? (
      <p>No scramble history available</p>
    ) : (
      <ul>
        {history.map(({ scramble, difficulty }) => (
          <li key={scramble}>
            <span>{difficulty}: </span>
            <span>{scramble}</span>
          </li>
        ))}
      </ul>
    )}
  </Fragment>
);

ScrambleHistory.defaultProps = {
  history: []
};

ScrambleHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      scramble: PropTypes.string,
      difficulty: PropTypes.number
    })
  )
};

export default ScrambleHistory;
