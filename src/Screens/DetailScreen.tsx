import { useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AppStackParamList } from "../StackParamLists/AppStackParamList";
import { RouteProp } from "@react-navigation/native";
import { imageUrlHelper } from "../Utils/Helpers/imageUrlHelper";

type Props = {
	navigation: NativeStackNavigationProp<AppStackParamList, "Detail">;
	route: RouteProp<AppStackParamList, "Detail">;
};
const DetailScreen = ({ navigation, route }: Props) => {
	const { simpson } = route.params;
	const options: NativeStackNavigationOptions = {
		headerTitle: `About ${simpson.name.split(" ")[0]}`,
	};
	const [isValidURL, setIsValidURL] = useState(false);

	useEffect(() => {
		setIsValidURL(imageUrlHelper(simpson?.avatar));
		navigation.setOptions(options);
	}, []);
	return (
		<View style={styles.container}>
			{isValidURL ? (
				<Image source={{ uri: simpson.avatar }} width={50} height={50} style={styles.image} />
			) : (
				<Text style={styles.noImage}>⛔</Text>
			)}
			<Text style={styles.name}>{simpson.name}</Text>
			<Text style={styles.job}>{simpson.job}</Text>
			<Text style={styles.about}>{simpson.about}</Text>
		</View>
	);
};

export default DetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		marginHorizontal: 13,
	},
	image: {
		height: 300,
		width: 170,
		resizeMode: "contain",
		marginTop: "2%",
	},
	noImage: {
		padding: 10,
	},
	name: {
		fontWeight: "bold",
		fontSize: 20,
		letterSpacing: 1,
		textTransform: "capitalize",
	},
	job: {
		fontSize: 16,
		marginTop: 5,
		textTransform: "capitalize",
		color: "rgba(0,0,0,0.8)",
	},
	about: {
		fontSize: 16,
		color: "#555",
		marginVertical: 15,
	},
});
