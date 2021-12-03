import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, GestureResponderEvent, Alert } from "react-native";
import { imageUrlHelper } from "../../Utils/Helpers/imageUrlHelper";
import { deleteSimpson } from "../../Utils/Services/service";
type Props = {
	item: any;
	onPress: (event: GestureResponderEvent) => void;
	onDelete: (event: GestureResponderEvent) => void;
};

const SimpsonItem: React.FC<Props> = ({ item, onPress, onDelete }) => {
	const [isValidURL, setIsValidURL] = useState(false);
	useEffect(() => {
		setIsValidURL(imageUrlHelper(item.avatar));
	}, []);

	return (
		<TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
			<View style={styles.imageAndName}>
				{isValidURL ? (
					<Image source={{ uri: item.avatar }} width={50} height={50} style={styles.image} />
				) : (
					<Text style={styles.noImage}>⛔</Text>
				)}
				<Text style={styles.name}>{item.name}</Text>
			</View>
			<TouchableOpacity onPress={() => onDelete(item)}>
				<Text style={styles.deleteButton}>{`x`} </Text>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		padding: 10,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 5,
		backgroundColor: "#fff",
		elevation: 5,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.3,
		shadowRadius: 3,
		borderRadius: 10,
	},
	image: {
		height: 50,
		width: 50,
		resizeMode: "contain",
	},
	noImage: {
		padding: 10,
	},
	name: {
		letterSpacing: 1,
		marginHorizontal: 10,
	},
	imageAndName: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	deleteButton: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#ff2222",
		padding: 10,
	},
});

export default SimpsonItem;
