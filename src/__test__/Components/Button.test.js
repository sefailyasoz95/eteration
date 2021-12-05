import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Button from "../../Components/Button/Button";

Enzyme.configure({ adapter: new Adapter() });

describe("Button Component", () => {
	it("should render screen correctly", () => {
		const component = shallow(<Button />);
		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});
	it("should simulate the button press", () => {
		const onPressMock = jest.fn();
		const wrapper = shallow(<Button onPress={onPressMock} />);
		expect(wrapper.find({ testID: "customButton" }).simulate("click"));
		expect(onPressMock).toBeTruthy();
	});
});
