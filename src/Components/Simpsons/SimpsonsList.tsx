import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { Alert, FlatList, RefreshControl, StyleSheet } from "react-native";
import { AppStackParamList } from "../../StackParamLists/AppStackParamList";
import { deleteSimpson } from "../../Utils/Services/service";
import SimpsonItem from "./SimpsonItem";

type Props = {
	dataSource: Array<Object>;
	navigation: NativeStackNavigationProp<AppStackParamList, "List">;
	refreshData: Function;
	testID: string;
};

const SimpsonsList: React.FC<Props> = ({ dataSource, navigation, refreshData, testID }) => {
	const showSimpsonDetail = (simpson: any) => {
		navigation.navigate("Detail", { simpson });
	};
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refreshData();
		setRefreshing(false);
	}, []);
	const handleDelete = (item: any) => {
		Alert.alert("Hey there!", `Are you sure to delete ${item.name}?`, [
			{
				text: "Cancel",
				onPress: () => null,
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: async () => {
					await deleteSimpson(item.id);
					refreshData();
				},
			},
		]);
	};
	return (
		<FlatList
			data={dataSource}
			testID={testID || "flatlist"}
			contentContainerStyle={styles.containerStyle}
			style={styles.flatList}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			renderItem={({ item, index }) => (
				<SimpsonItem key={index} testID='simpsonItem' item={item} onPress={showSimpsonDetail} onDelete={handleDelete} />
			)}
		/>
	);
};

const styles = StyleSheet.create({
	containerStyle: {},
	flatList: {
		maxHeight: "80%",
		marginTop: "5%",
		width: "95%",
	},
});

export default SimpsonsList;
