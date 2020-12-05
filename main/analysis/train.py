import os
import csv
import numpy as np
import math
import keras
from keras import models, layers
from analyze import get_macd, get_rsi

def get_model():
    rsi_input = layers.Input(shape=(36,))
    macd_input = layers.Input(shape=(24,))
    x = layers.Dense(18, activation='tanh')(rsi_input)
    x = layers.Dense(6, activation='tanh')(x)
    x = keras.Model(inputs=rsi_input, outputs=x)

    y = layers.Dense(12, activation='tanh')(macd_input)
    y = layers.Dense(6, activation='tanh')(y)
    y = keras.Model(inputs=macd_input, outputs = y)

    combined = layers.Concatenate()([x.output, y.output])#[x.output, y.output])

    z = layers.Dense(3, activation='linear')(combined)
    z = layers.Dense(1, activation='linear')(z)

    model = keras.Model(inputs=[x.input, y.input], outputs=z)

    model.compile(loss='mean_absolute_percentage_error', optimizer='adam')
    return model

def train_model(model, rsi, macd, correct, batch_size):
    model.fit([rsi, macd], correct, epochs=1, batch_size=1)
    return model

'''
prices = []
volumes = []
percents = []
opens = []
with open('spy.csv','r') as csvfile:
    csvreader = csv.reader(csvfile)
    next(csvreader)
    for row in csvreader:
        vol = row[-2]
        if not vol == '-':
            percents.append(float(row[-1].replace('%','')))
            opens.append(float(row[2]))
            prices.append(float(row[1]))
            if vol.find('K') == -1:
                volumes.append(float(vol.replace('M',''))*1000000)
            elif vol.find('M') == -1:
                volumes.append(float(vol.replace('K',''))*1000)
            else:
                print('ERROR WITH VOLUME')

rsi = get_rsi(percents, train=True)
macd, correct = get_macd(prices, train=True)

rsi = np.array(rsi)
macd = np.array(macd)
correct = np.array(correct)
model = train_model(rsi, macd, correct)
model.save('spy_macd_rsi_v0')
'''
