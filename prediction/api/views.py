from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import render, redirect
from datetime import datetime, timedelta

from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..models import Prediction

from ..serializers import PredictionSerializer

from ..analysis import get_prediction

from stocks.models import Stock


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def prediction_detail_api_view(request, *args, **kwargs):
    ticker = request.data.get('ticker')
    user = request.user
    qs = Prediction.objects.filter(owner=user, stock__ticker=ticker)
    if not qs.exists():
        return Response({"prediction": None}, status=200)
    prediction_obj = qs.first()
    serializer = PredictionSerializer(instance=prediction_obj)
    return Response(serializer.data, status=200)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def prediction_create_api_view(request, *args, **kwargs):
    ticker = request.data.get('ticker')
    user = request.user
    stock = Stock.objects.get(ticker=ticker)
    old_prediction = Prediction.objects.filter(owner=user, stock=stock)
    if old_prediction.exists():
        old_prediction.first().delete()
    prediction_date = datetime.now() + timedelta(days=30)
    prediction_date = prediction_date.strftime("%m/%d/%Y")
    future_value, upper_value, lower_value = get_prediction(ticker)
    new_prediction = Prediction(future_value=future_value, upper_value=upper_value,
                                lower_value=lower_value, prediction_date=prediction_date, owner=user, stock=stock)
    # validate serializer?
    new_prediction.save()
    serializer = PredictionSerializer(new_prediction)
    return Response(serializer.data, status=201)
