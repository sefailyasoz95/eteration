import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Button from "../Components/Button/Button";
import SimpsonsList from "../Components/Simpsons/SimpsonsList";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
import { getSimpsons } from "../Utils/Services/service";

type Props = {
	navigation: NativeStackNavigationProp<AppStackParamList, "List">;
};
const ListScreen = ({ navigation }: Props) => {
	const [screenState, setScreenState] = useState({
		dataSource: [],
		loading: true,
	});
	const handleData = async () => {
		setScreenState({ dataSource: [], loading: true });
		let result = await getSimpsons();
		setScreenState({ dataSource: result.data, loading: false });
	};

	screenState.dataSource.length < 1 && handleData();

	return (
		<View style={styles.container}>
			{screenState.loading ? (
				<ActivityIndicator size={50} color='red' />
			) : (
				<SimpsonsList dataSource={screenState.dataSource} navigation={navigation} refreshData={handleData} />
			)}
			<Button
				text={`+`}
				testID={"+"}
				textStyle={styles.buttonText}
				buttonStyle={styles.buttonStyle}
				onPress={() => {
					navigation.navigate("Create");
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	buttonText: {
		fontSize: 50,
	},
	buttonStyle: {
		position: "absolute",
		bottom: "3%",
		right: "5%",
	},
});

export default ListScreen;
