from rest_framework import serializers

from .models import Prediction
from stocks.serializers import StockSerializer

# class PredictionCreateSerializer(serializers.ModelSerializer):
#     stock = StockSerializer(source='stock', read_only=True)

#     class Meta:
#         model = Prediction
#         fields = ['stock', 'future_value']


class PredictionSerializer(serializers.ModelSerializer):
    # Could add info about the stock itself (ticker etc)
    stock = StockSerializer(read_only=True)
    # May want extra info on the prediciton (accuracy etc)
    prediction = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Prediction
        fields = ['stock', 'prediction', 'prediction_date']

    def get_prediction(self, obj):
        prediction = {"future_value": obj.future_value,
                      "upper_value": obj.upper_value, "lower_value": obj.lower_value}
        return prediction
