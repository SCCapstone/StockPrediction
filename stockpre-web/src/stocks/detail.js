import { widget } from '../charting_library';
import React, { useEffect } from "react";

import { apiPredictionLookup } from "./lookup";

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
const defaultSettings = {
	symbol: 'AAPL',
	interval: 'D',
	containerId: 'tv_chart_container',
	datafeedUrl: 'https://demo_feed.tradingview.com',
	libraryPath: '/charting_library/',
	chartsStorageUrl: 'https://saveload.tradingview.com',
	chartsStorageApiVersion: '1.1',
	clientId: 'tradingview.com',
	userId: 'public_user_id',
	fullscreen: false,
	autosize: false,
	studiesOverrides: {},
	custom_indicators_getter: function (PineJS) {
		return Promise.resolve([
			{
				name: "prediction",
				metainfo: {
					_metainfoVersion: 40,
					id: "prediction@tv-basicstudies-1",
					scriptIdPart: "",
					name: "prediction",
					description: "Prediction of AAPL",

				}
			}
		]);
	}
};
export function Stock(props) {
	const {
		symbol,
		prediction,
		didPredictionLookup,
		handleBackendPredictionLookup
	} = props;
	let tvWidget = null;
	useEffect(() => {
		const widgetOptions = {
			symbol: symbol ? symbol : defaultSettings.symbol, // Could throw warning here
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed(defaultSettings.datafeedUrl),
			interval: defaultSettings.interval,
			container_id: defaultSettings.containerId,
			library_path: defaultSettings.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings', 'left_toolbar', 'header_symbol_search', 'display_market_status', 'header_screenshot', 'header_compare', 'header_indicators', 'compare_symbol', 'header_saveload', 'create_volume_indicator_by_default', 'control_bar', 'show_chart_property_page', 'countdown',],
			enabled_features: ['study_templates'],
			charts_storage_url: defaultSettings.chartsStorageUrl,
			charts_storage_api_version: defaultSettings.chartsStorageApiVersion,
			client_id: defaultSettings.clientId,
			user_id: defaultSettings.userId,
			fullscreen: defaultSettings.fullscreen,
			autosize: defaultSettings.autosize,
			studies_overrides: defaultSettings.studiesOverrides,
		};
		tvWidget = new widget(widgetOptions);
		if (didPredictionLookup === false) {
		  apiPredictionLookup(symbol, handleBackendPredictionLookup);
		};
		if (prediction) {
			console.log(prediction);
		} else {
			console.log("no pred");
		}
		return () => {
			if (tvWidget !== null) {
				tvWidget.remove();
				tvWidget = null;
			}
		}
	});

	return (
		<div
			id={ defaultSettings.containerId }
			className={ 'TVChartContainer' }
		/>
	);
}