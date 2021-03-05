from django.urls import path

from .views import (
    prediction_create_api_view,
    prediction_detail_api_view,
)

urlpatterns = [
    path('', prediction_detail_api_view),
    path('create', prediction_create_api_view),
]