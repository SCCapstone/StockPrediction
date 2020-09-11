from alpha_vantage.timeseries import TimeSeries
import matplotlib.pyplot as plt
import time
import pandas

# Let's use this file to experiment with different Stock Price APIs
# We can bookmark time taken to retrieve responses from queries
# Find technical and practical limitations of the APIs, etc.

# Alpha Vantage
# Has many features that could be extremely helpful in retrieving accurate, real-time, prices
# We are limited to 500 queries per day
# Since we are doing relatively short-term predictions, the intraday query would be appropriate
# Can retrieve data in various time intervals: 1min, 5min, 15min, 30min, 60min
# Can retrieve 100 last data points (outputsize='compact') or full-length data
# This API can also give us information about a company such as:
# Profit margin, Last Split Date, Last Split Factor, 52 week high, 52 week low,
# EPS, 50 Day moving average, 200 Day moving average, etc.
start = time.time()
# Query Alpha Vantage
ts = TimeSeries(key='ID3FSEEQYF2WDB05', output_format='pandas')
# Retrieve Response
data, meta_data = ts.get_intraday(symbol='NYSE:F', interval='1min', outputsize='full')
end = time.time()
print(data)
# Show data in plot
data['1. open'].plot()
plt.title('Intraday TimeSeries Ford')
plt.show()
df = pandas.DataFrame(data)
df.to_csv('prices.csv', index=True)

# Yahoo Finance (kind of)
# The Yahoo Finance API was shut down in 2017 but brought back in 2019
# Will need to do more research to find reliable sources of this API
# If it still exists

# Results
print('Alpha Vantage took:', end - start, 'seconds')
