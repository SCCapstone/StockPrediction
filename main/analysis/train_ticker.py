import os
import argparse
import pathlib
import tensorflow as tf
from tensorflow import keras
import numpy as np
from train import get_model
from get_data import train

#Allows for training on specific tickers
parser = argparse.ArgumentParser()
parser.add_argument('--ticker')
parser.add_argument('--model', nargs='?', const=None)
args = parser.parse_args()
ticker = args.ticker
model_name = args.model
if model_name is None:
    model = get_model()
else:
    model = keras.models.load_model('./{}'.format(model_name))
train(ticker, model)
