from django.db.models import Q

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..models import Stock
from ..serializers import StockSerializer
from prediction.models import Prediction


#Pretty simple view, just gets the 'Stock' object associated with the ticker
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def stock_detail_api_view(request, ticker, *args, **kwargs):
    qs = Stock.objects.filter(ticker=ticker)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    # Must pass context in so we can fill the 'is_tracking' field and send it back to react
    serializer = StockSerializer(obj, many=False, context={'user': request.user})
    return Response(serializer.data, status=200)

#Returns list of all stocks user is tracking
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def stock_list_api_view(request, *args, **kwargs):
    user = request.user
    qs = user.tracking
    serializer = StockSerializer(qs, many=True)
    return Response(serializer.data, status=200)

#Returns a list of stocks matching the users input
#IN THE FUTURE we will want to have this check company names
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def stock_search_api_view(request, *args, **kwargs):
    #Get the term that is in the input field of search bar, sent back as context by react
    term = request.data.get('searchTerm')
    #Filter by which tickers/company names contain the term, only get the first 10
    qs = Stock.objects.filter(
        Q(ticker__iexact=term) | Q(ticker__icontains=term) | Q(company_name__icontains=term)
    ).distinct()[:10]
    serializer = StockSerializer(qs, many=True)
    return Response(serializer.data, status=200)

#Again here is where it gets fun
# alot going on in this view, definitely can be optimized with something, not sure
# This handles the stock actions, add/remove
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def stock_action_api_view(request, ticker, *args, **kwargs):
    user = request.user
    # Get the stocks that current user tracks
    qs_is_tracking = Stock.objects.filter(tracked_by=user)
    # Get the STOCK object the ticker is referencing
    stock = Stock.objects.filter(ticker=ticker).first()
    # Now filter the stocks that the user tracks and see if that ticker is in the list
    qs = qs_is_tracking.filter(ticker=ticker)
    obj = qs.first()
    if not obj is None:
        # If the ticker is in the list of tracked stocks, pressing the button again will remove it
        obj.tracked_by.remove(user)
        # Also must check to see if there is an associated prediction with the user, and the ticker,
        # delte it if there is. Cannot have a prediction without tracking the stock
        prediction_obj = Prediction.objects.filter(owner=user, stock__ticker=ticker)
        if prediction_obj.exists():
            prediction_obj.first().delete()
        # Returning the ticker and 'is_tracking'
        serializer = StockSerializer(obj, many=False, context={'user': user})
        return Response(serializer.data, status=200)
    else:
        # If the ticker is not tracked, then pressing the button will add it
        stock.tracked_by.add(user)
        # Returning the ticker and 'is_tracking'
        serializer = StockSerializer(stock, many=False, context={'user': user})
        return Response(serializer.data, status=200)
