import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import ScrambleHistory from "./";

const defaultProps = {
  history: [{ difficulty: 4, scramble: "LOL" }]
};

it("should render correctly when history contains information", () => {
  const wrapper = shallow(<ScrambleHistory {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly if history is an empty list", () => {
  const wrapper = shallow(<ScrambleHistory {...defaultProps} history={[]} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should not explode when history is undefined", () => {
  const wrapper = shallow(
    <ScrambleHistory {...defaultProps} history={undefined} />
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});
