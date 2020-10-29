from alpha_vantage.timeseries import TimeSeries # Alpha Vantage
from pandas_datareader import data as data_reader # data_reader
from yahoo_fin.stock_info import get_live_price
import matplotlib.pyplot as plt # Plotting
import time # Benchmark time
import pandas # Data formatting

# Let's use this file to experiment with different Stock Price APIs
# We can bookmark time taken to retrieve responses from queries
# Find technical and practical limitations of the APIs, etc.

company = 'TESLA'
full_symbol = 'NYSE:TSLA'
symbol = 'TSLA'



# ======================================= Alpha Vantage =======================================
# Has many features that could be extremely helpful in retrieving accurate, real-time, prices
# We are limited to 500 queries per day *** WAY TOO LITTLE ***
# Since we are doing relatively short-term predictions, the intraday query would be appropriate
# Can retrieve data in various time intervals: 1min, 5min, 15min, 30min, 60min
# Can retrieve 100 last data points (outputsize='compact') or full-length data
# This API can also give us information about a company such as:
# Profit margin, Last Split Date, Last Split Factor, 52 week high, 52 week low,
# EPS, 50 Day moving average, 200 Day moving average, etc.
# =============================================================================================
av_start = time.time()
# Query Alpha Vantage
ts = TimeSeries(key='ID3FSEEQYF2WDB05', output_format='pandas')
# Retrieve Response
data, meta_data = ts.get_intraday(symbol=full_symbol, interval='1min', outputsize='full')
av_end = time.time()
print(data)
# Show data in plot
data['1. open'].plot()
plt.title('Intraday TimeSeries ' + company + '\nAlpha Vantage')
plt.show()
df = pandas.DataFrame(data)
df.to_csv('av_prices.csv', index=True)



# ================================== Yahoo Finance (kind of) ==================================
# The Yahoo Finance API was shut down in 2017 but brought back in 2019
# Will need to do more research to find reliable sources of this API
# If it still exists
# There is kind of a way to utilize this API using pandas-datareader
# The data is gathered on a daily basis
# There is no cap to the amount of queries
# The data is only as recent as yesterday though *** USED FOR HISTORICAL BUT NOT CURRENT ***
# =============================================================================================
y_start = time.time()
end_date = '2020-10-27'
# Query Yahoo
data = data_reader.DataReader(symbol, 'yahoo', end=end_date)
y_end = time.time()
print(data)
# Show data in plot
data['Open'].plot()
plt.title('Intraday TimeSeries ' + company + '\nYahoo Finance (pandas-datareader)')
plt.show()
df = pandas.DataFrame(data)
df.to_csv('y_prices.csv', index=True)


# =================================== Yahoo Finance Actual ===================================
# The Yahoo Finance API was shut down in 2017 but brought back in 2019
# This should be a reliable source for this API
# We have an option of gethering real-time prices *** WE NEED THIS ***
# There is no cap to the amount of queries
# =============================================================================================
# Query Yahoo
yf_start = time.time()
data = get_live_price(symbol)
yf_end = time.time()
print('Current Price of', full_symbol, ':', data)

# Results
print('Alpha Vantage took:', av_end - av_start, 'seconds')
print('Yahoo Finance (pandas-datareader) took:', y_end - y_start, 'seconds')
print('Yahoo Finance Actual:', yf_end - yf_start, 'seconds')
