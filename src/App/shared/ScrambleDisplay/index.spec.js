import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import ScrambleDisplay from "./";

const defaultProps = {
  text: "R U R'"
};

it("should render correctly", () => {
  const wrapper = shallow(<ScrambleDisplay {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});
