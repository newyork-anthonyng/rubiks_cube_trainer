const mockScramble = jest.fn(() => ["U", "D2", "L", "R"]);
jest.mock("cube-scrambler", () => {
  return () => ({
    scramble: mockScramble
  });
});

import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Scramble from "./";

beforeEach(() => {
  mockScramble.mockClear();
});

it("should render correctly", () => {
  const wrapper = shallow(<Scramble />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should get new scramble when clicking on button", () => {
  const wrapper = shallow(<Scramble />);
  mockScramble.mockClear();

  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");

  expect(mockScramble).toHaveBeenCalledTimes(1);
});

it("should use initial scramble if provided", () => {
  const wrapper = shallow(<Scramble initialScramble="U R" />);

  expect(mockScramble).not.toHaveBeenCalled();
  expect(toJSON(wrapper)).toMatchSnapshot();
});
