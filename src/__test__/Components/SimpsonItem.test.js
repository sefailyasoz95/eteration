import React from "react";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { render } from "@testing-library/react-native";
import SimpsonItem from "../../Components/Simpsons/SimpsonItem";
import { create } from "react-test-renderer";

configure({ adapter: new Adapter() });

const simpsons = [
	{ id: 1, name: "Merge Simpson", about: "something about Merge", job: "Merge's job", avatar: "https://image.com" },
	{ id: 2, name: "Homer Simpson", about: "something about Homer", job: "Homer's job", avatar: "https://image.com" },
];
const simpson = {
	id: 1,
	name: "Merge Simpson",
	about: "something about Merge",
	job: "Merge's job",
	avatar: "https://image.com",
};

const navigation = {
	navigate: jest.fn(),
};

describe("Simpson Item Component", () => {
	it("should render component correctly", () => {
		const component = shallow(<SimpsonItem item={simpsons[0]} />);

		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});

	it("should render correctly first item of the simpsons array", () => {
		const wrapper = render(<SimpsonItem item={simpsons[0]} />);
		expect(wrapper.UNSAFE_getAllByType(SimpsonItem).length).toBe(simpsons.length - 1);
	});
	it("should render correct names", () => {
		const wrapper = shallow(<SimpsonItem item={simpson} />);

		wrapper.find({ testID: "simpsonName" }).forEach((node, index) => {
			expect(node.props().children).toBe(simpson.name);
		});
	});
	it("it should simulate onPress and passing object to parent object which is SimpsonsList ", () => {
		const component = create(<SimpsonItem item={simpsons[0]} onPress={navigation.navigate} />);
		const opacity = component.root.findByProps({ testID: "simpsonItem" }).props;
		opacity.onPress();

		expect(navigation.navigate).toBeCalledWith(simpson);
	});
});
