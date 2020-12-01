import investpy as iv
import pandas as pd
import os
import numpy as np
import math
import keras
from train import get_model, train_model
from analyze import get_macd, get_rsi
#stocks = iv.get_stocks(country='United States')['symbol']

from keras import backend as K

#Trains on individual ticker, can be used for multiple training passes saves model
def train(ticker, model):
    rsi = []
    macd = []
    correct = []
    df = iv.get_stock_historical_data(stock=ticker, country='United States',
                                    from_date='29/11/1990',
                                    to_date='29/11/2020')
    close = df['Close']
    opens = df['Open']
    close = close[close!=0]
    opens = opens[opens!=0]
    percents = (100*(close-opens)/opens).values.tolist()
    closes = close.values.tolist()
    rsi = get_rsi(percents, train=True)
    macd, correct = get_macd(closes, train=True)

    rsi = np.array(rsi)
    macd = np.array(macd)
    correct = np.array(correct)
    #Randomizes list of inputs in unison
    p = np.random.permutation(len(rsi))
    rand_rsi = rsi[p]
    rand_macd = macd[p]
    rand_correct = correct[p]
    trained_model = train_model(model, rand_rsi, rand_macd, rand_correct, 100)
    #Used for checking output of final layer during training
    '''
    out = K.function([trained_model.layers[0].input,
                      trained_model.layers[1].input],
                     [trained_model.layers[8].output])
    layerout = out([rand_rsi, rand_macd])[0]
    layerout = np.squeeze(layerout)
    print(layerout)
    '''
    trained_model.save('./test_model_tf', save_format='tf')
