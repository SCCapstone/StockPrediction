API_KEY="bua1l2n48v6q418fsepg"

import csv
import requests
import websocket

# TODO:
#    add docstrings
#    modify on_message & request methods to save the message to the database
#    modify on_error & on_close methods to log the event in a log file
#    modify on_open method to subscribe to ALL stocks


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
        ws.run_forever

    @staticmethod
    def request(symbol):
        r = requests.get('https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=' + API_KEY)
        print(symbol)
        print(r.json())
