import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/Stacks/AppStack";
import { StatusBar } from "expo-status-bar";

const App = () => {
	return (
		<NavigationContainer>
			<AppStack />
		</NavigationContainer>
	);
};

export default App;
