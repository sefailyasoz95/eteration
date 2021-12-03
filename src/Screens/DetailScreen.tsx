import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
type UpdateScreenProp = NativeStackNavigationProp<AppStackParamList, "Detail">;

const UpdateScreen = () => {
	const navigation = useNavigation<UpdateScreenProp>();

	return (
		<View style={styles.container}>
			<Text>Update here</Text>
		</View>
	);
};

export default UpdateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
