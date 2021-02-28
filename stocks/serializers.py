from rest_framework import serializers

from .models import Stock

#Serializer for stock model
class StockSerializer(serializers.ModelSerializer):
    # is_tracking is not a field in 'Stock' model, so we must create a new field for it
    # We need this to send back to react to tell it what to render, it's essentially an internal state
    is_tracking = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Stock
        fields = ['ticker', 'company_name', 'is_tracking']

    # sets the is_tracking field for ONE ticker on ONE user
    def get_is_tracking(self, obj):
        user = self.context.get('user')
        if user in obj.tracked_by.all():
            return True
        else:
            return False
