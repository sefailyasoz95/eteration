import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/Stacks/AppStack";
import { StatusBar } from "expo-status-bar";

export default function App() {
	return (
		<NavigationContainer>
			<AppStack />
			<StatusBar style='auto' />
		</NavigationContainer>
	);
}
