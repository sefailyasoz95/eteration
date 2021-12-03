import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../Screens/ListScreen";
import CreateScreen from "../Screens/CreateScreen";
import DetailScreen from "../Screens/DetailScreen";

const App = createNativeStackNavigator();

const AppStack = () => {
	return (
		<App.Navigator>
			<App.Screen
				name='List'
				component={ListScreen}
				options={{
					headerTitle: "Simpsons",
				}}
			/>
			<App.Screen
				name='Create'
				component={CreateScreen}
				options={{
					headerTitle: "Add A Simpson",
				}}
			/>
			<App.Screen name='Detail' component={DetailScreen} />
		</App.Navigator>
	);
};

export default AppStack;
