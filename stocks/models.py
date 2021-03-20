from django.conf import settings
from django.db import models
from django.db.models import Q

User = settings.AUTH_USER_MODEL

'''
class StockQuerySet(models.QuerySet):
    def feed(self, user):
        is_tracking = user.tracking.exists()
        tracked_tickers = []
        if is_tracking:
            tracked_tickers = user.tracking.values_list("ticker", flat=True)
        return self.filter(
            Q(ticker__in=tracked_tickers)
        )

class StockManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return StockQuerySet(self.model, using=self._db)
    
    def feed(self, user):
        return self.get_queryset().feed(user)
'''


class Stock(models.Model):
    ticker = models.CharField(max_length=255, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    tracked_by = models.ManyToManyField(
        User, related_name='tracking', blank=True)

    #objects = StockManager()
