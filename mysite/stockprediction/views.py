from django.shortcuts import render #render html page with form
from django.http import HttpResponseRedirect #able to redirect from page
from django.contrib.auth import authenticate, login, logout #built in authentication
from django.contrib.auth.models import User #Built in user table
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm #Built in user create/authenticate forms
from .models import Prediction #Prediction table

##################################################################
#
#   > User creation (builtin)
#       TODO
#       May need to extend User or make custom user model (not too hard)
#       To have email field
#
#   > Redirects to homepage on success
#
#   > TEMPLATE: user_create.html
#   
##################################################################

def user_create(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return HttpResponseRedirect('/stockprediction')
    else:
        form = UserCreationForm()
    return render(request, 'stockprediction/create_user.html', {'form' : form})

##################################################################
#
#   > User Logout (builtin)
#
#   > Redirects to home page on success
#
##################################################################

def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/stockprediction')

##################################################################
#
#   > User Login (builtin)
#
#   > Redirects to home page on success
#
#   > TEMPLATE: login.html
#
##################################################################

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpeRepsonseRedirect('/stockprediction')
    else:
        form = AuthenticationForm()
    return render(request, 'stockprediction/login.html', {'form' : form})

##################################################################
#
#  > Home page:
#       checks to see if the user is logged in (a)
#       displays regular home page with retrieved stocks to non anonymous (b)
#       non anonymous user, sign-in/sign-up links to anonymous (c)
#
#  > Template: index.html
#
##################################################################

def index(request):

    if not request.user.is_anonymous: #(a)
        #predictions = Prediction.objects.filter(User__username=request.user.username) #(b)
        return render(request, 'stockprediction/index.html', {})#{'predictions', predictions} #(b)
    else:
        return render(request, 'stockprediction/index.html', {}) #(c)
