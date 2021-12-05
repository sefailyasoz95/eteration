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
	if (formInputs.name === "") {
		tempErrors.nameSurname = true;
	}
	if (formInputs.job === "") {
		tempErrors.jobTitle = true;
	}
	let isformValid = !(tempErrors.about || tempErrors.jobTitle || tempErrors.nameSurname);
	return { tempErrors, isformValid };
};
