import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CreateScreen from "../../Screens/CreateScreen";

// it("create screen renders correctly", () => {
// 	const tree = render(<CreateScreen />);
// });

// test("given empty formInputs, user can fill the inputs", () => {
// 	const { getByText, getByTestId, getByA11yValue } = render(<CreateScreen />);

// 	fireEvent.changeText(getByTestId("Name Surname"), "simpson");
// 	fireEvent.changeText(getByTestId("Job Title"), "simpson");
// 	fireEvent.changeText(getByTestId("About Him/Her"), "simpson");
// 	fireEvent.changeText(getByTestId("Image Link"), "simpson");
// 	fireEvent.press(getByText("Add Simpson"));

// 	const bananaElements = getByA11yValue("simpson");
// 	expect(bananaElements).toHaveLength(4); // expect 'banana' to be on the list
// 	// expect(tree).toMatchSnapshot();
// });
