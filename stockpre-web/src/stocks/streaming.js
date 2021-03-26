import { authToken } from '../App.js' 

const socket = new WebSocket(`wss://ws.finnhub.io?token=${authToken}`);

document.cookie = `X-Authorization=${authToken}; path=/` 

function getNextDailyBarTime(barTime) {
    const date = new Date(barTime);
    date.setDate(date.getDate() + 1);
    return date.getTime();
}

const subscriptions = new Map();

socket.onopen = (e) => {
    console.log('Socket connected');
};

socket.onclose = (reason) => {
    console.log('Socket disconnected:', reason);
};

socket.onerror = (error) => {
    console.log('Socket error:', error);
};

export function subscribeOnStream(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback,
    lastDailyBar
) {
    const handler = {
        id: subscribeUID,
        callback: onRealtimeCallback,
    };
    let subscriptionItem = subscriptions.get(symbolInfo);
    if (subscriptionItem) {
        // already subscribed to the channel, use the existing subscription
        subscriptionItem.handlers.push(handler);
        return;
    }
    subscriptionItem = {
        subscribeUID,
        resolution,
        lastDailyBar,
        handlers: [handler],
    };
    subscriptions.set(symbolInfo, subscriptionItem);
    console.log('[subscribeBars]: Subscribe to streaming symbol:', symbolInfo);
    socket.send(JSON.stringify({'type': 'subscribe', 'symbol': symbolInfo}));
}
export function unsubscribeFromStream(subscriberUID) {
    for (const symbol of subscriptions.keys()) {
        const subscriptionItem = subscriptions.get(symbol);
        const handlerIndex = subscriptionItem.handlers
            .findIndex(handler => handler.id === subscriberUID);

        if (handlerIndex !== -1) {
            // remove from handlers
            subscriptionItem.handlers.splice(handlerIndex, 1);

            if (subscriptionItem.handlers.length === 0) {
                // unsubscribe from the channel, if it was the last handler
                console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', symbol);
                socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}));
                subscriptions.delete(symbol);
                break;
            }
        }
    }
}

socket.onmessage = msg => {
    //console.log('[socket] Message:', msg['data']);
    const {
        data,
        type
    } = JSON.parse(msg['data']);
    if (type !== "trade") return;
    //console.log("responses:", data);
    data.forEach(response => {
        const price = response.p;
        const symbol = response.s;
        const time = response.t;
        const subscriptionItem = subscriptions.get(symbol);
        if (subscriptionItem === undefined) return;
        const lastDailyBar = subscriptionItem.lastDailyBar;
        if (lastDailyBar === undefined) {
            subscriptionItem.lastDailyBar = {
                time: time,
                open: price,
                high: price,
                low: price,
                close: price
            }
            return;
        }
        const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);
        let bar;
        //console.log(`TIME: ${time}, BARTIME: ${nextDailyBarTime}`)
        if (time >= nextDailyBarTime) {
            bar = {
                time: time,
                open: price,
                high: price,
                low: price,
                close: price
            }
        } else {
            bar = {
                ...lastDailyBar,
                high: Math.max(lastDailyBar.high, price),
                low: Math.min(lastDailyBar.low, price),
                close: price
            }
        }
        subscriptionItem.lastDailyBar = bar;

        subscriptionItem.handlers.forEach(handler => handler.callback(bar));
    });
};