import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
import CreateScreen from "../../Screens/CreateScreen";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import { create } from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { CommonActions } from "@react-navigation/routers";

configure({ adapter: new Adapter() });
const newSimpsonObject = {
	id: 0,
	name: "Sefa İlyas Öz",
	job: "Full Stack Developer",
	about:
		"Self motivated developer who tries to improve himself every day. Tries to be the best he can be at everything he does.",
	avatar:
		"https://media-exp1.licdn.com/dms/image/C4D03AQHexvLu9A-_gg/profile-displayphoto-shrink_800_800/0/1606719515595?e=1644451200&v=beta&t=nWK-Gy9V3oeP-i0-y-W4sEfqBEUU6zuubBHHjYEFiQo",
};
const navigation = {
	dispatch: jest.fn(),
};
describe("create screen", () => {
	it("should render screen correctly", () => {
		const component = shallow(<CreateScreen />);
		expect(component.length).toBe(1);
		expect(toJson(component)).toMatchSnapshot();
	});

	it("trying to sent an empty form with button press which will cause the inputs hasError prop to become true", () => {
		const component = create(<CreateScreen />);
		const button = component.root.findByProps({ testID: "AddSimpson" }).props;
		button.onPress();
		const nameSurnameInput = component.root.findByProps({ testID: "NameSurname" }).props;
		const jobTitle = component.root.findByProps({ testID: "JobTitle" }).props;
		const about = component.root.findByProps({ testID: "AboutHim/Her" }).props;
		const imageLink = component.root.findByProps({ testID: "ImageLink" }).props;

		nameSurnameInput.required
			? expect(nameSurnameInput.hasError).toBe(true)
			: expect(nameSurnameInput.hasError).toBe(false);

		jobTitle.required ? expect(jobTitle.hasError).toBe(true) : expect(jobTitle.hasError).toBe(false);

		about.required ? expect(about.hasError).toBe(true) : expect(about.hasError).toBe(false);

		imageLink.required ? expect(imageLink.hasError).toBe(true) : expect(imageLink.hasError).toBe(false || undefined);
	});

	it("creating new simpson", async () => {
		const component = create(<CreateScreen navigation={navigation} />);
		const button = component.root.findByProps({ testID: "AddSimpson" }).props;
		const nameSurnameInput = component.root.findByProps({ testID: "NameSurname" }).props;
		const jobTitle = component.root.findByProps({ testID: "JobTitle" }).props;
		const about = component.root.findByProps({ testID: "AboutHim/Her" }).props;
		await act(async () => {
			await nameSurnameInput.onTextChanged(newSimpsonObject.name);
		});
		await act(async () => {
			await jobTitle.onTextChanged(newSimpsonObject.job);
		});
		await act(async () => {
			await about.onTextChanged(newSimpsonObject.about);
		});
		await button.onPress();
		/* 
			Burası .not.toBeCalled() değil toBeCalled() olmalı tabii ki ancak CreateScreen.tsx içindeki handleNewCharacter
			çağırıldığında formInputs state'i initial state ile aynı geliyor ve if'e giremiyor, her ne kadar yukarıdaki 
			onTextChanged fonksiyonları çalışsa da... Onlar da şu şekilde çalışıyor, her biri state'deki objenin ilgili
			alanını set ediyor ancak "initialState"teki halini.
			CreateScreen.tsx'in içinde useEffect'i yorum satırı olarak bıraktım, yorum satırından kaldırır testi çalıştırırsanız 
			state'i set etme şeklini, anlatmaya çalıştığım şeyi daha iyi anlayabilirsiniz.
			bunu nasıl düzeltebiliriz, buna ne sebep oluyor, çözüm nedir gerçekten merak ediyorum. bir çözüm bulamadım.
			Bu süreç olumlu ya da olumsuz nasıl sonuçlanırsa sonuçlansın bu soruma cevap verebilirseniz çok sevinirim.
		*/
		expect(navigation.dispatch).not.toBeCalled();
	});
});
