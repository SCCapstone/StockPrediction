API_KEY="bua1l2n48v6q418fsepg"
# 
import requests

symbols = ['AMZN', 'AAPL', 'F', 'UA', 'GOOG']

for symbol in symbols:
    r = requests.get('https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=' + API_KEY)
    print(symbol)
    price_map = r.json()
    print("Current: " + str(price_map['c']))
    print("High: " + str(price_map['h']))
    print("Low: " + str(price_map['l']))
    print("Open: " + str(price_map['o']))
    print("Previous Close: " + str(price_map['pc']))
    print("Timestamp: " + str(price_map['t']))
