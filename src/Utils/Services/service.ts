import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { GetSimpsonsAsync } from "./api";

const getSimpsons = async () => {
	let result: any;
	try {
		let existingData = await AsyncStorageLib.getItem("simpsons");
		if (!existingData) {
			let tempResult = await GetSimpsonsAsync();
			await AsyncStorageLib.setItem("simpsons", JSON.stringify(tempResult.data));
			result = tempResult;
		} else {
			result = {
				data: JSON.parse(existingData),
				status: 200,
				message: "success",
			};
		}
	} catch (error) {
		result = {
			data: [],
			status: 400,
			message: error,
		};
	}
	return result;
};

const createSimpson = async (simpson: object) => {
	let result = {
		message: "",
		status: 0,
	};
	let existingData = await AsyncStorageLib.getItem("simpsons");
	if (existingData) {
		let parsed = JSON.parse(existingData);
		let sorted = parsed.sort((a: any, b: any) => b.id - a.id);
		sorted.push({ ...simpson, id: Number(sorted[0].id) + 1 });
		await AsyncStorageLib.setItem("simpsons", JSON.stringify(sorted));
		return (result = {
			message: "Simpson Created Successfully",
			status: 200,
		});
	} else {
		return (result = {
			message: "Something went terribly wrong!!",
			status: 400,
		});
	}
};

const deleteSimpson = async (id: number | string) => {
	let result = {
		message: "",
		status: 0,
	};
	let existingData = await AsyncStorageLib.getItem("simpsons");
	if (existingData) {
		let data = JSON.parse(existingData);
		let filteredData = data.filter((simpson: any) => simpson.id !== id);
		await AsyncStorageLib.setItem("simpsons", JSON.stringify(filteredData));
		return (result = {
			message: "Simpson Deleted Successfully",
			status: 200,
		});
	} else {
		return (result = {
			message: "Something went terribly wrong!!",
			status: 400,
		});
	}
};

export { getSimpsons, deleteSimpson, createSimpson };
