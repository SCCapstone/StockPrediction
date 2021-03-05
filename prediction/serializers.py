from rest_framework import serializers

from .models import Prediction
from stocks.serializers import StockSerializer

# class PredictionCreateSerializer(serializers.ModelSerializer):
#     stock = StockSerializer(source='stock', read_only=True)

#     class Meta:
#         model = Prediction
#         fields = ['stock', 'future_value']

class PredictionSerializer(serializers.ModelSerializer):
    #Could add info about the stock itself (ticker etc)
    stock = StockSerializer(read_only=True)
    #May want extra info on the prediciton (accuracy etc)

    class Meta:
        model = Prediction
        fields = ['stock', 'future_value']