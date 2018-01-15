jest.mock("worker-timers", () => {
  return {
    clearInterval: jest.fn(),
    setInterval: jest.fn()
  };
});
import * as workerTimers from "worker-timers";
import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import Metronome from "./";

beforeEach(() => {
  workerTimers.clearInterval.mockClear();
  workerTimers.setInterval.mockClear();

  // AudioContext mocks
  createBuffer.mockClear();
  createBufferSource.mockClear();
  bufferStart.mockClear();
});

it("should render correctly when not playing", () => {
  const wrapper = shallow(<Metronome />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly when playing", () => {
  const wrapper = shallow(<Metronome />);

  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should update BPM when changing input", () => {
  const wrapper = shallow(<Metronome />);

  const rangeInputEl = wrapper.find("input[type='range']");
  rangeInputEl.simulate("change", {
    target: { value: 42 }
  });

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should update workerTimer if changing BPM while metronome is active", () => {
  const wrapper = shallow(<Metronome />);

  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");

  workerTimers.clearInterval.mockClear();
  workerTimers.setInterval.mockClear();

  const rangeInputEl = wrapper.find("input[type='range']");
  rangeInputEl.simulate("change", {
    target: { value: 42 }
  });

  expect(workerTimers.clearInterval).toHaveBeenCalledTimes(1);
  expect(workerTimers.setInterval).toHaveBeenCalledTimes(1);
  expect(workerTimers.setInterval.mock.calls[0]).toMatchSnapshot();
});

// iOS bug. See this issue https://github.com/cwilso/metronome/issues/14
it("should play an empty buffer when first clicking button", () => {
  const wrapper = shallow(<Metronome />);

  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");

  expect(createBuffer).toHaveBeenCalledTimes(1);
  expect(createBufferSource).toHaveBeenCalledTimes(1);
  expect(bufferStart).toHaveBeenCalledTimes(1);

  createBuffer.mockClear();
  createBufferSource.mockClear();
  bufferStart.mockClear();

  buttonEl.simulate("click");

  expect(createBuffer).not.toHaveBeenCalled();
  expect(createBufferSource).not.toHaveBeenCalled();
  expect(bufferStart).not.toHaveBeenCalled();
});

it("should update workerTimer correctly when clicking on button to pause metronome", () => {
  const wrapper = shallow(<Metronome />);

  // play Metronome
  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");
  workerTimers.clearInterval.mockClear();
  workerTimers.setInterval.mockClear();

  // pause Metronome
  buttonEl.simulate("click");

  expect(workerTimers.clearInterval).toHaveBeenCalledTimes(1);
  expect(workerTimers.setInterval).not.toHaveBeenCalled();
});

it("should update workerTimer correctly when clicking on button to play metronome", () => {
  const wrapper = shallow(<Metronome />);

  // play Metronome
  const buttonEl = wrapper.find("button");
  buttonEl.simulate("click");

  expect(workerTimers.setInterval).toHaveBeenCalledTimes(1);
  expect(workerTimers.setInterval.mock.calls[0]).toMatchSnapshot();
  expect(workerTimers.clearInterval).not.toHaveBeenCalled();

  // setInterval function should toggle isPlaying state
  const setIntervalCb = workerTimers.setInterval.mock.calls[0][0];
  setIntervalCb();
  wrapper.update();
  expect(toJSON(wrapper)).toMatchSnapshot();

  setIntervalCb();
  wrapper.update();
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should clear interval when unmounting", () => {
  const wrapper = mount(<Metronome />);

  wrapper.unmount();

  expect(workerTimers.clearInterval).toHaveBeenCalledTimes(1);
});
