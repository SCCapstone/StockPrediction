# Structure of code

## *Setup if you've cloned/pulled before commit 70f7691
Added new migration file in /stocks/migrations. It populates the table with tickers and stock names, so run the migrations when you startup again.
#### *It may ask if you want to merge the migrations, say yes*

### Each relevant folder will have its own documentation in there as well

#### '/' will be root directory for project

## Internal Django apps, folders in top level directory

* stockprediction (main folder)
* prediction
* stocks
* accounts

#### Internal Django Apps are used to seperate different sections of code. Accounts, stocks and prediction are all seperate components of the application as a whole
#### Each app has its own models, views and urls
#### Main folder (stockprediction) connects these urls to the main paths we use on the website

## Templates under templates obviously

## React app contained in /stockpre-react or /stockpre-web, not sure which one will be accessible from github, both contain right info. Just use -react probably

#### React app contains all the components used in the webpage
#### Also contains the connection between the DOM elements and the js code
#### Instructions on how to use React are in /stockpre-react or /stockpre-web

## Other relevant folders/files

#### Folders

* analysis - contains code for analyzing stock market data, training neural network
* modules - contains code for getting data from finnhub
* static - contains static files for webapp, most importantly the related .js and .css files generated from React
* static-root - generated when running ./manage.py collectstatic

#### Files

* company_names.csv - list of all company names
* tickers.csv - list of all tickers
* README.md
* Pipfile and Pipfile.lock - download for pipenv
* manage.py - to run django

## Important miscellaneous info

### When you start up, you will have to navigate to /register to create an account, then /login to log yourself in. then go to /

### if you get a 403 error, go into settings and scroll to the bottom, theres some info of what to do there.
