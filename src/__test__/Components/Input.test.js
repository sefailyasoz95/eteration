import React from "react";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Input from "../../Components/Input/Input";
import { create } from "react-test-renderer";

configure({ adapter: new Adapter() });

const event = {
	nativeEvent: {
		text: "testing input",
	},
};

const eventWithEmptyString = {
	nativeEvent: {
		text: "",
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

	it("input is required ? after onEndEditing if no text available border should be red ", () => {
		const onTextChanged = jest.fn();
		const setInputError = jest.fn();
		const component = create(<Input onTextChanged={onTextChanged} required={true} />);
		const checkState = jest.spyOn(React, "useState");
		const input = component.root.findByProps({ testID: "textinput" }).props;
		input.onEndEditing(eventWithEmptyString);
		checkState.mockImplementation((inputError) => [inputError, setInputError]);
		expect(setInputError).toBeTruthy();
		expect(onTextChanged).toBeCalledTimes(0);
		const inputContainer = component.root.findByProps({ testID: "inputContainer" }).props;
		expect(inputContainer.style[1].borderColor).toBe("red");
	});
});
