import { ICustomStateMachineData, ICustomStateMachineProvider, WidgetsFactory, DataLoaderFactory } from "@itsy-ui/core";

const dataLoader = WidgetsFactory.instance.services["DataLoaderFactory"] as DataLoaderFactory;
const customStateProvider = dataLoader.getLoader<ICustomStateMachineProvider>("customStateProvider");

function doFoodCardGridSelectedRowsDone(evt: any) {
	return (getState: any, dispatch: any, transition: any) => {
		const selectedRows = evt.selectedRows;
		transition({
			type: "GRID_SELECTED_ROWS_DONE",
			controlID: "master_details",
			strict: true,
			selectedRows: evt.selectedRows,
		});
		transition({
			type: "NAVIGATE_URL",
			pageUrl: `details`,
			params: selectedRows[0],
		});
	};
}

const tabsGrid: ICustomStateMachineData = {
	stateJSON: {
		"states": {
			"gridSelectedRows": {
				"onEntry": [
					"onFoodCardGridSelectedRowsDone",
				],
				"on": {
					"GRID_SELECTED_ROWS": "gridSelectedRows",
					"GRID_SELECTED_ROWS_DONE": "gridSelectedRowsDone"
				},
			},
		},
	},
	mapDispatchToAction: (dispatch) => {
		return {
			onFoodCardGridSelectedRowsDone: (evt) => dispatch(doFoodCardGridSelectedRowsDone(evt)),
		};
	},
};

customStateProvider.registerCustomStateMachine("GridWidget", { "id": "food_details" }, tabsGrid);


function doSearchCustomState(evnt) {
	return async (_getState: any, _dispatch: any, transition: any) => {
		transition({
			type: "GRID_FILTER",
			searchValue: evnt.data,
		});
		transition({
			type: "SEARCH_LOAD_DONE",
		});
	};
}
const productSearch: ICustomStateMachineData = {
	name: "searchStateMachine",
	stateJSON: {
		"states": {
			"searchLoad": {
				"onEntry": [
					"onSearchCustomState",
				],
				"on": {
					"SEARCH_LOAD_DONE": "onLoaded",
				},
			},
		},
	},
	mapDispatchToAction: (dispatch) => {
		return {
			onSearchCustomState: (data) => dispatch(doSearchCustomState(data)),
		};
	},
};

customStateProvider.registerCustomStateMachine("SearchWidget", {
	"id": "product_search"
}, productSearch);