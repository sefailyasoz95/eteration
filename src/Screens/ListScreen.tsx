import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Components/Button";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";

type HomeScreenProp = NativeStackNavigationProp<AppStackParamList, "List">;

const HomeScreen = () => {
	const navigation = useNavigation<HomeScreenProp>();
	return (
		<View style={styles.container}>
			<Text>List Screen</Text>
			<Button
				text='Go To Create Screen'
				corner='curved'
				type='outlined'
				buttonColor='black'
				textColor='black'
				textStyle={styles.buttonText}
				onPress={(e) => {
					navigation.navigate("Create");
				}}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontWeight: "600",
	},
});
