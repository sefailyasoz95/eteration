import AsyncStorageLib from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { GetSimpsonsAsync } from "../../Utils/Services/api";
import { createSimpson, deleteSimpson, getSimpsons } from "../../Utils/Services/service";
const newSimpsonObject = {
	id: 0,
	name: "Sefa İlyas Öz",
	job: "Full Stack Developer",
	about:
		"Self motivated developer who tries to improve himself every day. Tries to be the best he can be at everything he does.",
	avatar:
		"https://media-exp1.licdn.com/dms/image/C4D03AQHexvLu9A-_gg/profile-displayphoto-shrink_800_800/0/1606719515595?e=1644451200&v=beta&t=nWK-Gy9V3oeP-i0-y-W4sEfqBEUU6zuubBHHjYEFiQo",
};
const createSuccessResult = {
	message: "Simpson Created Successfully",
	status: 200,
};
const deleteSuccessResult = {
	message: "Simpson Deleted Successfully",
	status: 200,
};
beforeEach(async () => {
	await AsyncStorageLib.clear();
});

describe("getting simpsons", () => {
	it("should get simpsons from the api", async () => {
		const apiResult = await GetSimpsonsAsync();
		expect(apiResult).toBeTruthy();
	});
	it("try to get simpson from storage, if not exists get from api, save to the storage and return the result", async () => {
		const apiResult = await GetSimpsonsAsync();
		const result = await getSimpsons();
		expect(result).toMatchObject(apiResult);
	});
});

describe("creating a new simpson", () => {
	it(`should first get the existing simpsons then push a new one to the array, 
	save it to the storage and return the new array`, async () => {
		let createResult = await createSimpson(newSimpsonObject);
		expect(createResult).toMatchObject(createSuccessResult);
	});
});

describe("deleting a simpson", () => {
	it(`should first get the existing simpsons then filter the given id and return the filtered result`, async () => {
		let deleteResult = await deleteSimpson(1);
		expect(deleteResult).toMatchObject(deleteSuccessResult);
	});
});
