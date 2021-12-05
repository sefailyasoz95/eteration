import React from "react";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { render } from "@testing-library/react-native";
import Input from "../../Components/Input/Input";
import { create } from "react-test-renderer";

configure({ adapter: new Adapter() });
const event = {
	nativeEvent: {
		text: "testing input",
	},
};

describe("Input Component", () => {
	it("should render without issues", () => {
		const component = shallow(<Input />);
		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});
	it("checking onEndEditing functionality", () => {
		const onTextChanged = jest.fn();
		const setInputError = jest.fn();
		const component = create(<Input onTextChanged={onTextChanged} />);
		const checkState = jest.spyOn(React, "useState");
		const input = component.root.findByProps({ testID: "textinput" }).props;
		input.onEndEditing(event);
		checkState.mockImplementation((inputError) => [inputError, setInputError]);
		expect(setInputError).toBeTruthy();
		expect(onTextChanged).toBeCalledWith("testing input");
	});
});
