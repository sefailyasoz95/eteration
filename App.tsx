import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/Stacks/AppStack";

export default function App() {
	return (
		<NavigationContainer>
			<AppStack />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
