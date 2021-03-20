from django.contrib.auth import get_user_model
from rest_framework import authentication

User = get_user_model()


class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        if qs:
            user = qs.order_by('?').first()
            return (user, None)
        else:
            print('MUST HAVE A USER IN THE DATABASE TO USE REACT FOR DEVELOPMENT')
            return None
