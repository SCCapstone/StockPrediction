from rest_framework import serializers

from .models import Stock


class StockSerializer(serializers.ModelSerializer):
    is_tracking = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Stock
        fields = ['ticker', 'company_name', 'is_tracking']

    def get_is_tracking(self, obj):
        user = self.context.get('user')
        if user in obj.tracked_by.all():
            return True
        else:
            return False
