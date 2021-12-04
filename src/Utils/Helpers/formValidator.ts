import { imageUrlHelper } from "./imageUrlHelper";

export const formValidator = (formInputs: any) => {
	let tempErrors = {
		nameSurname: false,
		jobTitle: false,
		about: false,
		image: false,
	};
	if (formInputs.about === "") {
		tempErrors.about = true;
	}
	// if (formInputs.avatar === "" || !imageUrlHelper(formInputs.avatar)) {
	// 	tempErrors.image = true;
	// }
	if (formInputs.name === "") {
		tempErrors.nameSurname = true;
	}
	if (formInputs.job === "") {
		tempErrors.jobTitle = true;
	}
	let isformValid = !(tempErrors.about || tempErrors.jobTitle || tempErrors.nameSurname);
	return { tempErrors, isformValid };
};

export const toplama = (a: number, b: number) => {
	return a + b;
};
