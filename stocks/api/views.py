from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q
from django.db.models.functions import Length

from ..models import Stock
from ..serializers import StockSerializer
from prediction.models import Prediction

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def stock_detail_api_view(request, ticker, *args, **kwargs):
    qs = Stock.objects.filter(ticker=ticker)
    # qs= Stock.objects.filter(Q(ticker=ticker) | Q(company_name__icontains=ticker))
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = StockSerializer(
        obj, many=False, context={'user': request.user})
    return Response(serializer.data, status=200)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def stock_list_api_view(request, *args, **kwargs):
    user = request.user
    qs = user.tracking
    serializer = StockSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def stock_search_api_view(request, *args, **kwargs):
    term = request.data.get('searchTerm')
    print(term)
    if not term:
        term = ''
    qs = Stock.objects.filter(Q(ticker__iexact=term) | Q(
        ticker__icontains=term) | Q(company_name__icontains=term)).distinct()[:10]
    print(qs)
    serializer = StockSerializer(qs, many=True)
    # print(serializer.data)
    return Response(serializer.data, status=200)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def stock_action_api_view(request, ticker, *args, **kwargs):
    user = request.user
    qs_is_tracking = Stock.objects.filter(tracked_by=user)
    stock = Stock.objects.filter(ticker=ticker).first()
    qs = qs_is_tracking.filter(ticker=ticker)
    obj = qs.first()
    if not obj is None:
        obj.tracked_by.remove(user)
        prediction_obj = Prediction.objects.filter(
            owner=user, stock__ticker=ticker)
        if prediction_obj.exists():
            prediction_obj.first().delete()
        serializer = StockSerializer(obj, many=False, context={'user': user})
        return Response(serializer.data, status=200)
    else:
        stock.tracked_by.add(user)
        serializer = StockSerializer(stock, many=False, context={'user': user})
        return Response(serializer.data, status=200)
