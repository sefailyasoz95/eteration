import React from "react";
import SimpsonsList from "../../Components/Simpsons/SimpsonsList";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { render } from "@testing-library/react-native";
import SimpsonItem from "../../Components/Simpsons/SimpsonItem";

configure({ adapter: new Adapter() });

const simpsons = [
	{ id: 1, name: "Merge Simpson", about: "something about Merge", job: "Merge's job", avatar: "https://image.com" },
	{ id: 2, name: "Homer Simpson", about: "something about Homer", job: "Homer's job", avatar: "https://image.com" },
];

describe("Simpsons List Component", () => {
	it("should render without issues", () => {
		const component = shallow(<SimpsonsList dataSource={simpsons} />);

		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});

	it("should render all item in simpsonlist", () => {
		const wrapper = render(<SimpsonsList dataSource={simpsons} />);

		// check if the flatlist item renders correctly
		expect(wrapper.getByTestId("flatlist")).toBeTruthy();
		expect(wrapper.UNSAFE_getAllByType(SimpsonItem).length).toBe(simpsons.length);
	});

	it("should render correct names", () => {
		const wrapper = shallow(<SimpsonsList dataSource={simpsons} />);

		wrapper.find({ testID: "simpsonItem" }).forEach((node, index) => {
			expect(node.props().children).toBe(simpsons[index].name);
		});
	});
});
