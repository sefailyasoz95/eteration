import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CreateScreen from "../../Screens/CreateScreen";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("create screen", () => {
	it("should render screen correctly", () => {
		const component = shallow(<CreateScreen />);
		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});

	it("should update state on press", () => {
		const changeFormState = jest.fn();
		const wrapper = shallow(<CreateScreen />);
		const handlePress = jest.spyOn(React, "useState");
		handlePress.mockImplementation((formInputs) => [formInputs, changeFormState]);

		expect(wrapper.find({ testID: "AddSimpson" }).simulate("click"));
		expect(changeFormState).toBeTruthy();
	});
});
