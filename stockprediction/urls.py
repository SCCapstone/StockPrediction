from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create-user/', views.user_create, name='user-create'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('<str:ticker>/', views.show_stock, name='stock'),
    path('<str:ticker>/add', views.add_prediction, name='prediction'),
    path('<str:ticker>/remove', views.remove_prediction, name='remove'),
]
