import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
type CreateScreenProp = NativeStackNavigationProp<AppStackParamList, "Create">;

const CreateScreen = () => {
	const navigation = useNavigation<CreateScreenProp>();

	return (
		<View style={styles.container}>
			<Text>Create here</Text>
		</View>
	);
};

export default CreateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
