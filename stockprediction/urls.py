"""stockprediction URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from accounts.views import (
    login_view,
    logout_view,
    register_view,
    profile_view,
)

from stocks.views import (
    stock_home_view,
    stock_detail_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', stock_home_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('profile/', profile_view),
    path('stocks/<str:ticker>', stock_detail_view),
    path('api/stocks/', include('stocks.api.urls')),
    path('api/prediction/', include('prediction.api.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
