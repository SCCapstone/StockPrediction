from django.urls import path

from .views import (
    stock_detail_api_view,
    stock_list_api_view,
    stock_search_api_view,
    stock_action_api_view
)

urlpatterns = [
    path('', stock_list_api_view),
    path('search', stock_search_api_view),
    path('<str:ticker>', stock_detail_api_view),
    path('<str:ticker>/action', stock_action_api_view)
]