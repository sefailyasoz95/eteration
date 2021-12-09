import { CommonActions } from "@react-navigation/routers";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from "react-native";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
import { formValidator } from "../Utils/Helpers/formValidator";
import { formErrorState } from "../Utils/InitialStates/formErrorState";
import { formValues } from "../Utils/InitialStates/formValues";
import { createSimpson } from "../Utils/Services/service";

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, "Create">;
};

const CreateScreen = ({ navigation }: Props) => {
  const [formInputs, setFormInputs] = useState(formValues);
  const [errorStates, setErrorStates] = useState(formErrorState);
  const handleNewCharacter = async () => {
    const { isformValid, tempErrors } = formValidator(formInputs);
    setErrorStates(tempErrors);
    if (isformValid) {
      let result = await createSimpson(formInputs);
      if (result.status === 200) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "List" }],
          })
        );
      }
    }
  };
  // NOTE
  // useEffect(() => {
  // 	console.log("effecg formInputs: ", formInputs);
  // }, [formInputs]);
  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={Keyboard.dismiss}
      // behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <Input
        placeholder="Name Surname"
        testID="NameSurname"
        corner="rounded"
        onTextChanged={(value: string) => setFormInputs({ ...formInputs, name: value })}
        required={true}
        hasError={errorStates.nameSurname}
      />
      <Input
        placeholder="Job Title"
        testID="JobTitle"
        required={true}
        corner="rounded"
        hasError={errorStates.jobTitle}
        onTextChanged={(value: string) => setFormInputs({ ...formInputs, job: value })}
      />
      <Input
        placeholder="About Him/Her"
        testID="AboutHim/Her"
        required={true}
        corner="rounded"
        type="textarea"
        hasError={errorStates.about}
        onTextChanged={(value: string) => setFormInputs({ ...formInputs, about: value })}
      />
      <Input
        placeholder="Image Link"
        testID="ImageLink"
        corner="rounded"
        onTextChanged={(value: string) => setFormInputs({ ...formInputs, avatar: value })}
      />
      <Button
        text="Add Simpson"
        testID={"AddSimpson"}
        variant="filled"
        onPress={handleNewCharacter}
        corners="curved"
        color="black"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
      />
    </SafeAreaView>
  );
};

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

export default CreateScreen;
