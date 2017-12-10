jest.mock("rubiks-cross-trainer", () => {
  let count = 0;
  return jest.fn(() =>`SOME_RANDOM_SCRAMBLE_${count}`);
});

import App from "./";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

it("should render correctly", () => {
  const wrapper = shallow(<App />);
});

it("should get new scramble when clicking on button");

it("should use new count value when changing select field");
