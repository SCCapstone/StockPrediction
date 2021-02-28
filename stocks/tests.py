from django.test import TestCase
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient

from .models import Stock
from prediction.analysis import get_prediction

User = get_user_model()

class StockTestCase(TestCase):
    def setUp(self):
        self.user_a = User.objects.create_user(username='userA', password='password')
        self.user_b = User.objects.create_user(username='userB', password='password')
        Stock.objects.create(ticker='ABC')
        Stock.objects.create(ticker='XYZ')
        self.stock_count = Stock.objects.all().count()
    
    def test_get_prediction(self):
        prediction = get_prediction('ABC')
        val = float(1)
        self.assertEqual(type(val), type(prediction))

    def get_client(self):
        client = APIClient()
        client.login(username=self.user_a.username, password='password')
        return client

    def test_user_add_stock(self):
        client = self.get_client()
        response = client.post('/api/stocks/ABC/action')
        self.assertEqual(response.status_code, 200)
        ticker = response.json().get('ticker')
        self.assertEqual(ticker, 'ABC')
        user = self.user_a
        user_tracking = user.tracking.all().first()
        self.assertEqual(user_tracking.ticker, ticker)
        self.assertEqual(response.json().get('is_tracking'), True)