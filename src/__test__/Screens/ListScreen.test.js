import React from "react";
import { render } from "@testing-library/react-native";
import ListScreen from "../../Screens/ListScreen";

it("list screen renders correctly", () => {
	const tree = render(<ListScreen />);
	expect(tree).toMatchSnapshot();
});
