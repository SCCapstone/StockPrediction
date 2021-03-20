from django.conf import settings
from django.db import models

from stocks.models import Stock

User = settings.AUTH_USER_MODEL


class Prediction(models.Model):
    future_value = models.DecimalField(max_digits=10, decimal_places=2)
    upper_value = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    lower_value = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    prediction_date = models.CharField(max_length=255, null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
