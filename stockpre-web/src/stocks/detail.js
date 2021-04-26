import { widget } from '../charting_library';
import React, { useEffect } from "react";
import Datafeed from "./datafeed.js"
import { apiPredictionLookup } from "./lookup";
import { Card, CardContent, makeStyles } from '@material-ui/core';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function americanDateToUnixTimestamp(date) {
	// mm/dd/yyyy to yyyy-mm-dd to Javascript timestamp (ms) to Unix timestamp (s)
	let fields = date.split('/');
	date = fields[2] + '-' + fields[0] + '-' + fields[1];
	return new Date(date).getTime() / 1000;
}

const defaultSettings = {
	symbol: 'AAPL',
	interval: 'D',
	containerId: 'tv_chart_container',
	datafeedUrl: 'https://demo_feed.tradingview.com',
	libraryPath: '/static/js/charting_library/', // Change to "/static/js/charting_library/" for django local and production
	chartsStorageUrl: 'https://saveload.tradingview.com',
	chartsStorageApiVersion: '1.1',
	clientId: 'tradingview.com',
	userId: 'public_user_id',
	fullscreen: false,
	autosize: false,
	studiesOverrides: {},
};
let currPrediction = null;
let tvWidget = null;

export function Stock(props) {
	const {
		symbol,
		prediction,
		didPredictionLookup,
		handleBackendPredictionLookup
	} = props;
	const classes = useStyles();
	useEffect(() => {
		const widgetOptions = {
			symbol: symbol ? symbol : defaultSettings.symbol, // Could throw warning here
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: Datafeed,
			interval: defaultSettings.interval,
			container_id: defaultSettings.containerId,
			library_path: defaultSettings.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: [
				'use_localstorage_for_settings', 
				'left_toolbar', 
				'header_symbol_search', 
				'display_market_status', 
				'header_screenshot', 
				'header_compare', 
				'header_indicators', 
				'compare_symbol', 
				'header_saveload', 
				'create_volume_indicator_by_default', 
				'control_bar', 
				'show_chart_property_page', 
				'countdown'
			],
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
		if (didPredictionLookup === false && !currPrediction) {
		  apiPredictionLookup(symbol, handleBackendPredictionLookup);
		};
		if (prediction && !currPrediction) {
			currPrediction = prediction;
			console.log("prediction set")
			console.log(currPrediction);
		}
		if (currPrediction !== null && tvWidget !== null) {
			const currTime = new Date().getTime() / 1000;
			const predTime = americanDateToUnixTimestamp(currPrediction.prediction_date);
			tvWidget.onChartReady(() => {
				const chart = tvWidget.chart();
				const {from, to} = chart.getVisibleRange();
				chart.setVisibleRange({from: from, to: predTime});
				try {
					chart.createMultipointShape(
						[{
							time: currTime,
							channel: 'close'
						}, 
						{
							time: predTime,
							price: currPrediction.upper_value,
							channel: 'close'
						}], 
						{
							shape: 'trend_line',
							lock: true,
							overrides: {
								linecolor: '#00ff00',
								linestyle: 2
							}
						}, null
					);
				} catch (err) {
					console.log(err);
				}
				try {
					chart.createMultipointShape(
						[{
							time: currTime,
							channel: 'close'
						}, 
						{
							time: predTime, 
							price: currPrediction.lower_value,
							channel: 'close'
						}], 
						{
							shape: 'trend_line', 
							lock: true,
							overrides: {
								linecolor: '#ff0000',
								linestyle: 2
							}
						}, null
					);
				} catch (err) {
					console.log(err);
				}
				try {
					chart.createMultipointShape(
						[{
							time: currTime,
							channel: 'close'
						}, 
						{
							time: predTime, 
							price: currPrediction.future_value,
							channel: 'close'
						}], 
						{
							shape: 'trend_line', 
							lock: true,
							overrides: {
								linecolor: '#000000',
								linestyle: 2
							}
						}, null
					);
				} catch (err) {
					console.log(err);
				}
			});
			
		}
		return () => {
			if (tvWidget !== null) {
				tvWidget.remove();
				tvWidget = null;
			}
			currPrediction = null;
		}
	}, [prediction]);

	return (
		<div>
			<Card className={classes.root}>
				<CardContent className={classes.content}>
					<div id={ defaultSettings.containerId } className={ 'TVChartContainer' }/>
				</CardContent>
			</Card>
		</div>

	);
}

const useStyles = makeStyles({
	root: {
		marginTop: '15px',
		marginBottom: '4px'
	},
	content: {
		borderRadius: '50px'
	}
});