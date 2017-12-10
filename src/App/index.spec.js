jest.mock("rubiks-cross-trainer", () => {
  let count = 0;
  return jest.fn(() => `SOME_RANDOM_SCRAMBLE_${count}`);
});
import getRandomSolve from "rubiks-cross-trainer";

import React from "react";
import App from "./";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

beforeEach(() => {
  getRandomSolve.mockClear();
});

it("should render correctly", () => {
  const wrapper = shallow(<App />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should get new scramble when clicking on button", () => {
  const wrapper = shallow(<App />);
  getRandomSolve.mockClear();

  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");

  expect(getRandomSolve).toHaveBeenCalledTimes(1);
  expect(getRandomSolve.mock.calls[0][0]).toEqual(1);
});

it("should use new count value when changing select field", () => {
  const wrapper = shallow(<App />);
  getRandomSolve.mockClear();

  const selectEl = wrapper.find("select");
  const newValue = 5;
  selectEl.simulate("change", { target: { value: newValue } });

  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");

  expect(getRandomSolve).toHaveBeenCalledTimes(1);
  expect(getRandomSolve.mock.calls[0][0]).toEqual(newValue);
});

it("should use initial scramble if provided", () => {
  const wrapper = shallow(<App initialScramble="R2 U" />);

  expect(getRandomSolve).not.toHaveBeenCalled();
  expect(toJSON(wrapper)).toMatchSnapshot();
});
