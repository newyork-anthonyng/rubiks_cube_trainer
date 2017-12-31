import React from "react";
import PropTypes from "prop-types";

const headerStyle = {
  textAlign: "center"
};

const ScrambleDisplay = ({ text }) => <h1 style={headerStyle}>{text}</h1>;

ScrambleDisplay.propTypes = {
  text: PropTypes.string
};

export default ScrambleDisplay;
