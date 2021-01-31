import os
import pathlib
import tensorflow as tf
from tensorflow import keras
import numpy as np
from .analyze import get_rsi, get_macd

##########################################################
#
#   > Generates prediction for price in 30 days
#   > Calculates percentages from data from finnhub
#   > Loads keras model
#   > Uses functions from analyze.py to generate inputs for NN
#
###########################################################
def get_prediction(opens, closes, volumes, highs, lows):
    percents = []
    for o, c in zip(opens,closes):
        percents.append(100 * (c - o)/o)
    rsi = get_rsi(percents)
    macd = get_macd(closes)
    rsi = np.array(rsi)
    macd = np.array(macd)
    p = pathlib.Path(__file__).parent.absolute() / 'test_model_tf'#'spy_macd_rsi_v0'
    model = keras.models.load_model(p)
    pred = model.predict([rsi, macd])
    #print(pred)
    pred = float(pred)
    return pred
