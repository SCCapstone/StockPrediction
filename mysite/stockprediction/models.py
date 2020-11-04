from django.db import models
from django.contrib.auth.models import User #Django base user

##################################################################################################
#  > Stock prediction model
#   
#  > ticker: company ticker 5 characters long
#
#  > name: full company name, 30 characters long
#       TODO
#       max_length too high?     
#
#  > current_price: last known price of share, 10 digits long, 2 decimal places
#       TODO
#       May need to be changed to FloatField, but do not want to have too many digits. 
#       Decimal Field may not easily convert to float
#
#  > historical_price: used for displaying chart
#       TODO
#       Few options, we could use JSON or numpy files and just store them, or we can
#       just create a custom field to store floats/decimals
#
#  > exp_price_change: predicted price change ? amount of time from date made
#       TODO
#       Maybe we want to use a range of values, a distribution of them with different confidences
#       More useful, again potentially storing a dictionary/list, maybe custom field or json/numpy
#
#  > tracking: Users tracking this stock
#
#  > date_made: date prediction was made
#
######################################################################################################

class Prediction(models.Model):

    ticker = models.CharField(max_length=5)

    name = models.CharField(max_length=30)

    current_price = models.DecimalField(max_digits=10, decimal_places=2)

    tracking = models.ManyToManyField(User)

    date_made = models.DateField()
