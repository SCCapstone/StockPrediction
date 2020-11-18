from background_task import background
from .data_collection import DataCollection

# TODO:
#    Modify requests to save outputs to the database
#    Stress test requests to ensure that a large amount of requests will not 
#    use all of our available API call limit
#    Ensure that the poll stocks task is nonblocking

@background(schedule=2) 
def request_price(symbol):
    # DataCollection.request_price returns a map of the current price of the stock
    # https://finnhub.io/docs/api#quote
    # price_map = {'c':float, 'h':float, 'l':float, 'o':float, 'pc':float, 't':Long}
    price_map = DataCollection.request_price(symbol)
    print(price_map)

@background(schedule=2)
def request_sentiment(symbol):
    # DataCollection.request_sentiment returns a map of the current sentiment of the stock
    # https://finnhub.io/docs/api#news-sentiment
    # sentiment_map = {'buzz':{'articlesInLastWeek':Int, 'buzz':float, 'weeklyAverage':float}, 'companyNewsScore':float,...}
    sentiment_map = DataCollection.request_sentiment(symbol)
    print(sentiment_map)

@background
def poll_stocks():
    DataCollection.main()
