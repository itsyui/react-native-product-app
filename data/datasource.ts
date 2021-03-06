import { WidgetsFactory, DataLoaderFactory, IDataSourceLake } from "@itsy-ui/core";
import { isEmptyObject } from "@itsy-ui/utils";
import { AsyncStorage } from 'react-native';

const dataLoader = WidgetsFactory.instance.services["DataLoaderFactory"] as DataLoaderFactory;
const data = require("./data.json");

class DataSource implements IDataSourceLake {
	async getAll(type: string, params: any) {
		try {
			let records = data;
			if (params.pageCount && params.skipCount) {
				records = data.slice((params.pageCount - 1) * params.skipCount, params.pageCount * params.skipCount);
			}
			if (!isEmptyObject(params.filter)) {
				for (const key in params.filter) {
					if (params.filter.hasOwnProperty(key)) {
						const filterItem = params.filter[key];
						let filteredData = null;
						filterItem.forEach(x => {
							if (x.operation === "contains") {
								filteredData = data.filter(item => item[key].toLowerCase().includes(x.value.toLowerCase()));
							} else if (x.operation === "eq") {
								filteredData = data.filter(item => item[key] === parseInt(x.value));
							}
						});
						records = filteredData ? filteredData : records;
					}
				}
			}
			if (type === "cart") {
				const cartData = await AsyncStorage.getItem("cart");
				if (cartData) {
					const cartItems = JSON.parse(cartData);
					records = records.filter(x => cartItems.hasOwnProperty(x.id))
				} else {
					records = [];
				}
			}
			records["totalRecordsCount"] = records.length;
			return records;
		} catch (e) {
			console.log(e);
		}
	}

	create(record: any, params: any): Promise<any> {
		record["id"] = data[data.length - 1].id + 1;
		data.push(record);
		return record;
	}

	update(record: any, params: any): Promise<any> {
		const index = data.findIndex((d: any) => d.id === record.id);
		if (index >= 0) {
			data[index] = [...record];
			return record;
		}
		const message: any = {
			"message": "Unable to find the element."
		};

		return message;
	}

	upsert(record: any, params: any): Promise<any> {
		throw new Error("Method not implemented.");
	}

	delete(record: any): Promise<any> {
		const index = data.findIndex((d: any) => d.id === record.id);
		return data.splice(index, 1);
	}

	getObject(type: string, recordId: any, params: any) {
		const item = data.find((d: any) => d.id === parseInt(recordId));
		return item;
	}

	createRelationship(_): Promise<any> {
		throw new Error("Method not implemented.");
	}

	getRelationshipChildren(_): Promise<any> {
		throw new Error("Method not implemented.");
	}
}

dataLoader.registerLoader({
	datasource: new DataSource(),
});
