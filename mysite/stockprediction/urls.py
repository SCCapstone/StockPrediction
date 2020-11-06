from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create-user/', views.user_create, name='user-create'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
]
