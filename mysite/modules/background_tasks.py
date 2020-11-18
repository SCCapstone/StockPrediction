from background_task import background
from .data_collection import DataCollection

# TODO:
#    Stress test requests to ensure that a large amount of requests will not 
#    use all of our available API call limit
#    Ensure that the poll stocks task is nonblocking

@background(schedule=2) 
def request_price(symbol):
    DataCollection.request_price(symbol)

@background(schedule=2)
def request_sentiment(symbol):
    DataCollection.request_sentiment(symbol)

@background
def poll_stocks():
    DataCollection.main()
