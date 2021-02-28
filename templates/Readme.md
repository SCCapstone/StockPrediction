## Readme for templates

#### base.html contains our React stuff, and must be extende by each template we want to use the react stuff.
#### react folder is used for when we import the react app, check the react app readme for more info
#### accounts has stuff for authentication, connects directly through base urls, and accounts app
#### components is just for form.html which is just for the authentication, login, registration etc.
#### pages currently only has the home page, which renders the navbar and stock list, connects to /stocks/views.py->stock_home_view
#### stocks is just the stock detail page, renders navbar and stock details, with TradingView widget, connects to /stocks/views.py->stock_detail_view