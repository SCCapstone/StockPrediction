API_KEY="bua1l2n48v6q418fsepg"
# 
import requests

symbols = ['AMZN', 'AAPL', 'F', 'UA', 'GOOG']

for symbol in symbols:
    r = requests.get('https://finnhub.io/api/v1/quote?symbol=' + symbol + '&token=' + API_KEY)
    print(symbol)
    print(r.json())
