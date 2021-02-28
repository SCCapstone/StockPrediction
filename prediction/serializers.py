from rest_framework import serializers

from .models import Prediction
from stocks.serializers import StockSerializer

# class PredictionCreateSerializer(serializers.ModelSerializer):
#     stock = StockSerializer(source='stock', read_only=True)

#     class Meta:
#         model = Prediction
#         fields = ['stock', 'future_value']
#####################################################################
#   Takes in the data from a model instance, and returns
#   serialized data in JSON format
#####################################################################
class PredictionSerializer(serializers.ModelSerializer):
    #Could add info about the stock itself (ticker etc)
    stock = StockSerializer(read_only=True) # Need Stock Serializer to have 'stock' field contain JSON data of Stock model
    #May want extra info on the prediciton (accuracy etc)

    class Meta:
        model = Prediction
        fields = ['stock', 'future_value']