import React from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Metronome from "./shared/Metronome";
import {
  LoadableScramble,
  LoadableCrossTrainer
} from "./screens/LoadableScreens";

const App = ({ initialScramble }) => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cross-trainer">Cross Trainer</Link>
        </li>
        <li>
          <Link to="/scramble">Scramble</Link>
        </li>
      </ul>
    </nav>

    <hr />

    <Metronome />

    <hr />

    <Route path="/" exact component={Home} />
    <Route
      path="/cross-trainer"
      render={
        /* istanbul ignore next */ () => (
          <LoadableCrossTrainer initialScramble={initialScramble} />
        )
      }
    />
    <Route
      path="/scramble"
      render={
        /* istanbul ignore next */ () => (
          <LoadableScramble initialScramble={initialScramble} />
        )
      }
    />
  </div>
);

App.propTypes = {
  initialScramble: PropTypes.string
};

export default App;
