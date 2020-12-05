API_KEY="bua1l2n48v6q418fsepg"

import csv
import json
import requests
import websocket
import time

# TODO:
#    add docstrings
#    modify on_message method to save the message to the database
#    modify on_error & on_close methods to log the event in a log file
#    maybe done: modify on_open method to subscribe to ALL stocks


class DataCollection:
    @staticmethod
    def __on_message(ws, message):
        print(message)

    @staticmethod
    def __on_error(ws, error):
        print(error)

    @staticmethod
    def __on_close(ws):
        print("### closed ###")
    
    @staticmethod
    def __on_open(ws):
        with open('companylist.csv') as csv_file:
            tickers = csv.reader(csv_file, delimiter=',', quotechar='"')
            tickers.next() # Skip header
            for ticker in tickers:
                ws.send('{"type":"subscribe","symbol":"' + ticker[0] + '"}')

    @staticmethod
    def main():
        ws = websocket.enableTrace.WebSocketApp("wss://ws.finnhub.io?token=" + API_KEY,
            on_message=DataCollection.__on_message,
            on_error=DataCollection.__on_error,
            on_close=DataCollection.__on_close)
        ws.on_open = DataCollection.__on_open
        ws.run_forever()

    @staticmethod
    def request_price(symbol):
        r = requests.get('https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=' + API_KEY)
        try:
            return r.json()
        except ValueError:
            return {}
    #Used to get historical data to pass to the neural network
    @staticmethod
    def request_historical(symbol):
        now = time.time()
        then = now - 6450000 #uses unix time, this is 51 days
        then = int(then)
        now = int(now)
        r = requests.get('https://finnhub.io/api/v1/stock/candle?symbol={}&resolution=D&from={}&to={}&token={}'.format(symbol,then,now,API_KEY))
        try:
            return r.json()
        except ValueError:
            return {}
    @staticmethod
    def request_sentiment(symbol):
        r = requests.get('https://finnhub.io/api/v1/news-sentiment=' + symbol + '&token=' + API_KEY)
        try:
            return r.json()
        except ValueError:
            return {}

