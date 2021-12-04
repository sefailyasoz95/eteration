import { useNavigation } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/routers";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
import { formValidator } from "../Utils/Helpers/formValidator";
import { formErrorState } from "../Utils/InitialStates/formErrorState";
import { formValues } from "../Utils/InitialStates/formValues";
import { createSimpson, getSimpsons } from "../Utils/Services/service";
type CreateScreenProp = NativeStackNavigationProp<AppStackParamList, "Create">;

const CreateScreen = () => {
	const navigation = useNavigation<CreateScreenProp>();
	const [loading, setLoading] = useState(false);
	const [formInputs, setFormInputs] = useState(formValues);
	const [errorStates, setErrorStates] = useState(formErrorState);
	const handleNewCharacter = async () => {
		// burası kesinlikle daha iyi olabilir. Formik vb ekstra bir kütüphane kullanmak istemedim
		const { isformValid, tempErrors } = formValidator(formInputs);
		setErrorStates(tempErrors);
		if (isformValid) {
			let result = await createSimpson(formInputs);
			if (result.status === 200) {
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{ name: "List" }],
					}),
				);
			}
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			onTouchStart={Keyboard.dismiss}
			behavior={Platform.OS === "ios" ? "padding" : "padding"}>
			<Input
				placeholder='Name Surname'
				corner='rounded'
				onTextChanged={(value: string) => setFormInputs({ ...formInputs, name: value })}
				required={true}
				hasError={errorStates.nameSurname}
			/>
			<Input
				placeholder='Job Title'
				required={true}
				corner='rounded'
				hasError={errorStates.jobTitle}
				onTextChanged={(value: string) => setFormInputs({ ...formInputs, job: value })}
			/>
			<Input
				placeholder='About Him/Her'
				required={true}
				corner='rounded'
				type='textarea'
				hasError={errorStates.about}
				onTextChanged={(value: string) => setFormInputs({ ...formInputs, about: value })}
			/>
			<Input
				placeholder='Image Link'
				corner='rounded'
				onTextChanged={(value: string) => setFormInputs({ ...formInputs, avatar: value })}
			/>
			<Button
				textColor='#fff'
				text='Add Simpson'
				type='filled'
				onPress={handleNewCharacter}
				corner='curved'
				buttonColor='#000'
				textStyle={styles.buttonText}
				buttonStyle={styles.buttonContainer}
				loading={loading}
			/>
		</KeyboardAvoidingView>
	);
};

export default CreateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		marginTop: 20,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 16,
	},
	buttonContainer: {
		minWidth: 125,
	},
});
