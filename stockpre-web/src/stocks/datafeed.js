import { subscribeOnStream, unsubscribeFromStream } from './streaming.js'
import { authToken } from '../App.js'
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = authToken;

const lastBarsCache = new Map();

const configurationData = {
    supported_resolutions: ['1D', '1W', '1M'], // Will need to check if these resolutions are valid
    exchanges: [
        {
            value: 'NYSE',
            name: 'NYSE',
            desc: 'New York Stock Exchange'
        }
    ],
    symbol_types: [
        {
            name: 'Common Stock',
            value: 'stock'
        }
    ]
};

export default {
    onReady: (
        callback
    ) => {
        setTimeout(() => callback(configurationData));
    },
    resolveSymbol: async (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
    ) => {
        const symbols = await (await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${authToken}`)).json();
        //console.log("SYMBOLS:", symbols);
        const symbolItem = symbols.find(({ displaySymbol }) => symbolName === displaySymbol);
        //console.log("FOUND SYMBOL:", symbolItem);
        if (!symbolItem) {
            onResolveErrorCallback(`Cannot resolve symbol: ${symbolName}`);
            return;
        }
        const symbolInfo = {
            ticker: symbolItem.symbol,
            name: symbolItem.displaySymbol,
            description: symbolItem.description,
            type: symbolItem.type,
            session: '24x7',
            timezone: 'Etc/UTC',
            exchange: "NYSE",
            minmov: 1,
            pricescale: 100,
            has_intraday: false,
            has_no_volume: true,
            has_weekly_and_monthly: false,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
        };
        onSymbolResolvedCallback(symbolInfo);
    },
    getBars: async (
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback,
        onErrorCallback,
        firstDataRequest
    ) => {
        const TV2FinnhubResolutions = {"1D":"D", "1W":"W", "1M":"M"};
        const request = require('request');

        await request(`https://finnhub.io/api/v1/stock/candle?symbol=${symbolInfo.ticker}&resolution=${TV2FinnhubResolutions[resolution]}&from=${from}&to=${to}&token=${authToken}`,
            { json: true },
            (error, response, data) => {
                if (error) {
                    onErrorCallback(error);
                    return;
                }
                if (data["s"] === "no_data") {
                    onHistoryCallback([], {noData: true});
                    return;
                }
                const len = data['t'].length;
                let bars = [];
                for (var i = 0; i < len; i += 1) {
                    bars = [...bars, {
                        time: data['t'][i] * 1000,
                        low: data['l'][i],
                        high: data['h'][i],
                        open: data['o'][i],
                        close: data['c'][i]
                    }];
                }
                if (firstDataRequest) {
                    lastBarsCache.set(symbolInfo.displaySymbol, { ...bars[bars.length - 1] })
                }
                //console.log("GETBARS:", bars);
                onHistoryCallback(bars, {noData: false});
        }); 
    },
    searchSymbols: async (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
    ) => {
        console.log("SEARCHED");
    },
    subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback
    ) => {
        subscribeOnStream(
            symbolInfo.ticker,
            resolution,
            onRealtimeCallback,
            subscribeUID,
            onResetCacheNeededCallback,
            lastBarsCache.get(symbolInfo.ticker)
        );
    },
    unsubscribeBars: (
        subscriberUID
    ) => {
        unsubscribeFromStream(subscriberUID);
    }
};
