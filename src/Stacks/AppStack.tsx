import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../Screens/ListScreen";
import CreateScreen from "../Screens/CreateScreen";
import DetailScreen from "../Screens/DetailScreen";

const App = createNativeStackNavigator();

const AppStack = () => {
	return (
		<App.Navigator>
			<App.Screen name='List' component={ListScreen} />
			<App.Screen name='Create' component={CreateScreen} />
			<App.Screen name='Detail' component={DetailScreen} />
		</App.Navigator>
	);
};

export default AppStack;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
