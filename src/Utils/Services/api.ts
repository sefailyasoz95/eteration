import axios from "axios";
import { API_URL } from "../Constants/constants";

const GetSimpsonsAsync = async () => {
	let result = await axios.get(API_URL);
	return {
		data: result.data,
		status: result.status,
		message: result.statusText,
	};
};

export { GetSimpsonsAsync };
