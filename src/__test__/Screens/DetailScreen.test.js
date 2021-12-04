import React from "react";
import { render } from "@testing-library/react-native";
import DetailScreen from "../../Screens/DetailScreen";

describe("init", () => {
	test("detail screen renders correctly", () => {
		const mockedParams = {
			route: { params: { simpson: { name: "simpson name" } } },
			navigation: { setOptions: ({}) => {} },
		};

		const tree = render(<DetailScreen {...mockedParams} />);
		expect(tree).toMatchSnapshot();
	});
});
