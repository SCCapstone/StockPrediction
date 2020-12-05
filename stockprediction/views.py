from django.shortcuts import render #render html page with form
from django.http import HttpResponseRedirect #able to redirect from page
from django.contrib.auth import authenticate, login, logout #built in authentication
from django.contrib.auth.models import User #Built in user table
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm #Built in user create/authenticate forms

from .models import Prediction, Ticker #Prediction table
from modules.data_collection import DataCollection#Used to request from finnhub
from analysis.predict import get_prediction #Uses NN to make prediction

############################################################################
#
#   > Displays stock chart
#   > Checks if user is tracking stock
#   > Displays prediction if tracked
#   > TEMPLATE: stock_page.html
#
###########################################################################
def show_stock(request, **kwargs):
    ticker = kwargs['ticker']
    prediction = Prediction.objects.filter(ticker=ticker, tracking=request.user)
    added = True if prediction else False
    if added:
        prediction = Prediction.objects.get(ticker=ticker,
                                            tracking=request.user)
    return render(request, 'stockprediction/stock_page.html', {'ticker':
                                                               ticker, 'added':
                                                               added,
                                                               'pred':
                                                               prediction})
###########################################################################
#
#   > Adds prediction to user's list of predictions
#   > Checks to see if a prediction already exists for ticker
#   > Requests data from Finnhub.io to make new prediction
#
###########################################################################
def add_prediction(request, **kwargs):
    symbol = kwargs['ticker']
    pred = None
    if Prediction.objects.filter(ticker=symbol).exists():
        old = Prediction.objects.get(ticker=symbol)
        old.tracking.add(request.user)
        old.save()
        pred = old
    else:
        price_map = DataCollection.request_historical(symbol)
        volumes = price_map['v']
        opens = price_map['o']
        highs = price_map['h']
        lows = price_map['l']
        closes = price_map['c']
        model_pred = get_prediction(opens, closes, volumes, highs, lows)
        made = Prediction.objects.create(ticker=symbol, prediction=model_pred)
        made.tracking.add(request.user)
        made.save()
        pred = made
    return render(request, 'stockprediction/stock_page.html', {'ticker':
                                                               symbol, 'added':
                                                               True,
                                                               'pred':
                                                               pred})
##################################################################
#
#   > Removes prediction from users list of tracked stocks
#   > TEMPLATE: stock_page.html
#
##################################################################
def remove_prediction(request, **kwargs):
    symbol = kwargs['ticker']
    old = Prediction.objects.get(ticker=symbol)
    old.tracking.remove(request.user)
    return render(request, 'stockprediction/stock_page.html', {'ticker':
                                                               symbol, 'added':
                                                               False})

##################################################################
#
#   > User creation (builtin)
#
#   > Redirects to homepage on success
#
#   > TEMPLATE: user_create.html
#   
##################################################################

def user_create(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return HttpResponseRedirect('/stockprediction')
    else:
        form = UserCreationForm()
    return render(request, 'stockprediction/create_user.html', {'form' : form})

##################################################################
#
#   > User Logout (builtin)
#
#   > Redirects to home page on success
#
##################################################################

def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/stockprediction')

##################################################################
#
#   > User Login (builtin)
#
#   > Redirects to home page on success
#
#   > TEMPLATE: login.html
#
##################################################################

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('/stockprediction')
    else:
        form = AuthenticationForm()
    return render(request, 'stockprediction/login.html', {'form' : form})

##################################################################
#
#  > Home page:
#       checks to see if the user is logged in (a)
#       displays regular home page with retrieved stocks to non anonymous (b)
#       non anonymous user, sign-in/sign-up links to anonymous (c)
#   > Handles searching tickers
#
#  > Template: index.html
#
##################################################################

def index(request):
    if not request.user.is_anonymous: #(a)
        ticker = ''
        if request.method == 'GET':
            ticker = request.GET.get('search')
            ticker = ticker.upper() if ticker else ticker
            if not Ticker.objects.filter(symbol=ticker).exists():
                ticker = ''
        predictions = Prediction.objects.filter(tracking=request.user)
        return render(request, 'stockprediction/index.html', {'predictions': predictions, 'ticker' : ticker}) #(b)
    else:
        return render(request, 'stockprediction/index.html', {}) #(c)
