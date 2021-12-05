import React from "react";
import { render } from "@testing-library/react-native";
import DetailScreen from "../../Screens/DetailScreen";

describe("detail screen", () => {
	test("if it renders correctly", () => {
		const mockedParams = {
			route: { params: { simpson: { name: "simpson name" } } },
			navigation: { setOptions: ({}) => {} },
		};
		const tree = render(<DetailScreen {...mockedParams} />);
		expect(tree.getByText("simpson name")).toBeTruthy();
		expect(tree).toMatchSnapshot();
	});
});
