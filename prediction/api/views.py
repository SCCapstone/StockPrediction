from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import render, redirect

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..models import Prediction

from ..serializers import PredictionSerializer

from ..analysis import get_prediction

from stocks.models import Stock

#####################################################################
#   api endpoint for getting prediction details
#   
#   request contains 'ticker' data, the requested ticker
#####################################################################
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def prediction_detail_api_view(request, *args, **kwargs):
    ticker = request.data.get('ticker')
    user = request.user
    # Get Prediction of the specific ticker, and current user
    qs = Prediction.objects.filter(owner=user, stock__ticker=ticker)
    if not qs.exists():
        # User does not have a prediction for this ticker
        return Response({"future_value" : None}, status=200)
    prediction_obj = qs.first()
    # Serialize prediction and send back to React
    serializer = PredictionSerializer(instance=prediction_obj)
    return Response(serializer.data, status=200)

#####################################################################
#   api endpoint for when a prediction is made
#
#   request contains 'ticker' data, the requested ticker
#####################################################################
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def prediction_create_api_view(request, *args, **kwargs):
    ticker = request.data.get('ticker')
    user = request.user
    # Get the stock object related to the ticker
    stock = Stock.objects.get(ticker=ticker)
    # Get prediction related to requested stock/ticker, and current user
    old_prediction = Prediction.objects.filter(owner=user, stock=stock)
    if old_prediction.exists():
        # Delete old prediction
        old_prediction.first().delete()
    # Get new prediction and create new Prediction instance
    future_value = get_prediction(ticker)
    new_prediction = Prediction(future_value=future_value, owner=user, stock=stock)
    #validate serializer?
    new_prediction.save()
    # Serialize prediction and send back to React
    serializer = PredictionSerializer(new_prediction)
    return Response(serializer.data, status=201)