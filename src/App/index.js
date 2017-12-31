import React from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import CrossTrainer from "./screens/CrossTrainer";

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
      </ul>
    </nav>

    <hr />

    <Route path="/" exact component={Home} />
    <Route
      path="/cross-trainer"
      render={
        /* istanbul ignore next */ () => (
          <CrossTrainer initialScramble={initialScramble} />
        )
      }
    />
  </div>
);

App.propTypes = {
  initialScramble: PropTypes.string
};

export default App;
