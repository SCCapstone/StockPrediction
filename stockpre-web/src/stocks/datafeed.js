
const configurationData = {
    supported_resolutions: ['1D', '1W', '1M'], // Will need to check if these resolutions are valid
    exchanges: [
        {
            value: 'NYSE',
            name: 'NYSE',
            desc: 'New York Stock Exchange'
        },
        {
            value: 'NASDAQ',
            name: 'NASDAQ',
            desc: 'NASDAQ Stock Exchange'
        }
    ],
    symbol_types: [
        {
            name: 'stock',
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

    },
    searchSymbols: async (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
    ) => {

    },
    subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback
    ) => {

    },
    unsubscribeBars: (
        subscriberUID
    ) => {

    }
};
