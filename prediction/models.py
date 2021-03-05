from django.conf import settings
from django.db import models

from stocks.models import Stock

User = settings.AUTH_USER_MODEL

class Prediction(models.Model):
    future_value = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)