from alpha_vantage.timeseries import TimeSeries
from pytrends.request import TrendReq
import matplotlib.pyplot as plt
import pandas

company_name = 'Under Armour'
company_symbol = 'NYSE:UAA'

# pytrends
# Setup query terms and conditions
pytrend = TrendReq(hl='en-US', tz=300)
keyword = [company_name]
timeframe = '2020-04-22 2020-09-09'
geo = 'US'
cat = 0
gprop = ''
# Retrieve Response
pytrend.build_payload(keyword, cat=cat, timeframe=timeframe, geo=geo, gprop=gprop)
pytrend_data = pytrend.interest_over_time().drop('isPartial', axis=1)
print(pytrend_data)

# Alpha Vantage
# Setup query
ts = TimeSeries(key='ID3FSEEQYF2WDB05', output_format='pandas')
# Retrieve Response
stock_data, meta_data = ts.get_daily(symbol=company_symbol, outputsize='compact')
stock_data = stock_data.drop(['1. open', '4. close', '5. volume'], axis=1)
print(stock_data)

# Combine data
fig, ax = plt.subplots()
stock_high = stock_data.drop('3. low', axis=1)
stock_low = stock_data.drop('2. high', axis=1)
ax.plot(stock_high, color='green', label='High Price')
ax.plot(stock_low, color='red', label='Low Price')
ax.set_xlabel("Date")
ax.set_ylabel("Stock Price ($)")
ax.legend(loc='upper left')
ax2 = ax.twinx()
ax2.plot(pytrend_data, color='black', label='Trend')
ax2.set_ylabel("Number of Searches (%)")
ax2.legend()
plt.title('Stock Prices and Search Trends Plot by Date\nKeyword: ' + company_name + ', Symbol: ' + company_symbol)
plt.show()
stock_data.join(pytrend_data, how='outer').to_csv('combo_data.csv', index=True)