from background_task import background
from .data_collection import DataCollection

# TODO:
#    Stress test requests
#    Ensure that the poll stocks task is nonblocking

@background(schedule=2) 
def request(symbol):
    DataCollection.request(symbol)

@background
def poll_stocks():
    DataCollection.main()
