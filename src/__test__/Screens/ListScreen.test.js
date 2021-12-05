import React from "react";
import ListScreen from "../../Screens/ListScreen";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import { create } from "react-test-renderer";
configure({ adapter: new Adapter() });
const navigation = {
	navigate: jest.fn(),
};
describe("list screen", () => {
	it("should render screen correctly", async () => {
		const component = shallow(<ListScreen />);
		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});

	it("it should simulate the plus button press and navigation to create screen", async () => {
		const component = create(<ListScreen navigation={navigation} />);
		const button = component.root.findByProps({ testID: "+" }).props;
		button.onPress();

		expect(navigation.navigate).toBeCalledWith("Create");
	});
});
