from django.conf import settings
from django.db import models

from stocks.models import Stock

User = settings.AUTH_USER_MODEL

#####################################################################
# Model for Prediction
# I decided to break up the prediction and stock models because they are fundementally different
# A prediction basically has a one to one relationship with a stock-user pair,
# so a user may track a stock, and they have their own unique prediction for that stock
# upon untracking, the prediction is deleted
# open to ideas here for sure, i feel like this was best
#####################################################################
class Prediction(models.Model):
    future_value = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
