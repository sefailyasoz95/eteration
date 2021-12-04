import React from "react";
import App from "../../App";
import { render } from "@testing-library/react-native";

it("app renders correctly", () => {
	const tree = render(<App />);
	expect(tree).toMatchSnapshot();
});
