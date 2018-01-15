import React from "react";
import { shallow, mount } from "enzyme";
import Tone from "./";

const mockOscillator = {
  start: jest.fn(),
  stop: jest.fn(),
  connect: jest.fn(),
  frequency: {
    value: undefined
  }
};
const mockAudioContext = {
  createOscillator: jest.fn(() => mockOscillator),
  destination: "mock-audio-context-destination",
  currentTime: 42
};

const defaultProps = {
  play: false,
  length: 0.42,
  audioContext: mockAudioContext
};

beforeEach(() => {
  mockAudioContext.createOscillator.mockClear();

  mockOscillator.start.mockClear();
  mockOscillator.stop.mockClear();
  mockOscillator.connect.mockClear();
});

it("should render nothing", () => {
  const wrapper = shallow(<Tone {...defaultProps} />);

  expect(wrapper.html()).toEqual(null);
});

describe("should play a sound", () => {
  it("when mounting and play=true", () => {
    const wrapper = mount(<Tone {...defaultProps} play={true} />);

    expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(1);
    expect(mockOscillator.connect).toHaveBeenCalledTimes(1);
    expect(mockOscillator.connect.mock.calls[0]).toMatchSnapshot();
    expect(mockOscillator.start).toHaveBeenCalledTimes(1);
    expect(mockOscillator.stop).toHaveBeenCalledTimes(1);
    expect(mockOscillator.stop.mock.calls[0]).toMatchSnapshot();
    expect(mockOscillator.frequency.value).toMatchSnapshot();
  });

  it("when changing from play=false to play=true", () => {
    const wrapper = mount(<Tone {...defaultProps} />);

    expect(mockOscillator.start).not.toHaveBeenCalled();

    wrapper.setProps({
      play: true
    });

    expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(1);
    expect(mockOscillator.connect).toHaveBeenCalledTimes(1);
    expect(mockOscillator.connect.mock.calls[0]).toMatchSnapshot();
    expect(mockOscillator.start).toHaveBeenCalledTimes(1);
    expect(mockOscillator.stop).toHaveBeenCalledTimes(1);
    expect(mockOscillator.stop.mock.calls[0]).toMatchSnapshot();
    expect(mockOscillator.frequency.value).toMatchSnapshot();
  });
});

it("should not play a sound when changing from play=true to play=false", () => {
  const wrapper = mount(<Tone {...defaultProps} play={true} />);

  mockAudioContext.createOscillator.mockClear();
  mockOscillator.start.mockClear();
  mockOscillator.stop.mockClear();
  mockOscillator.connect.mockClear();

  wrapper.setProps({
    play: false
  });

  expect(mockAudioContext.createOscillator).not.toHaveBeenCalled();
  expect(mockOscillator.connect).not.toHaveBeenCalled();
  expect(mockOscillator.start).not.toHaveBeenCalled();
  expect(mockOscillator.stop).not.toHaveBeenCalled();
});
