import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { StaticRouter } from "react-router-dom";
import Home from "./screens/Home";
import App from "./";
jest.mock("./shared/Metronome", () => "metronome");
jest.mock("./screens/LoadableScreens", () => ({
  LoadableScramble: "loadableScramble",
  LoadableCrossTrainer: "loadableCrossTrainer"
}));

it("should render correctly", () => {
  const wrapper = mount(
    <StaticRouter context={{}}>
      <App />
    </StaticRouter>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});
