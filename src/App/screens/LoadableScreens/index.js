import React from "react";
import Loadable from "react-loadable";

const Loading = () => <p>Loading...</p>;

const LoadableScramble = Loadable({
  loader: () => import("../Scramble"),
  loading: Loading,
  delay: 300
});

const LoadableCrossTrainer = Loadable({
  loader: () => import("../CrossTrainer"),
  loading: Loading,
  delay: 300
});

export { LoadableScramble, LoadableCrossTrainer };
