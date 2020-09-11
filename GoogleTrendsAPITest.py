from pytrends.request import TrendReq
import matplotlib.pyplot as plt
import time
import pandas

# Let's use this file to experiment with different Google Trend APIs
# We can bookmark time taken to retrieve responses from queries
# Find technical and practical limitations of the APIs, etc.

# pytrends
# pytrends is an unofficial API for retrieveing Google Trends Data
# The main limitation of this API is that since it is unofficial it doesn't have access
# to real-time trend data. The API is limited to weekly data which is only updated
# at the end of the week. I believe that Google has an official API but more research is needed.
start = time.time()
# Setup query terms and conditions
pytrend = TrendReq(hl='en-US', tz=300)
keyword = ['ford']
timeframe = '2020-08-27 2020-09-09'
geo = 'US'
cat = 0
gprop = ''
# Retrieve Response
data = pytrend.get_historical_interest(keyword, year_start=2020, month_start=8, day_start=27, year_end=2020, month_end=9, day_end=10, cat=cat, geo=geo)
end = time.time()
print(data)
# Show data in plot
data.plot()
plt.title('Google Trend Data: Ford')
plt.show()
data.to_csv('trends.csv', index=True)


# Results
print('pytrends took:', end - start, 'seconds')
