from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django import template

register = template.Library()

# might be used later
@register.filter(name='add_class')
def add_class(value, arg):
    return value.as_widget(attrs={'class': arg})
   
    
def login_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        form = AuthenticationForm(request, data=request.POST or None)
        if form.is_valid():
            user_ = form.get_user()
            login(request, user_)
            return redirect("/")
        context = {
            "form": form,
            "btn_label": "Login",
            "title": "Login",
            "extras": "Don't have an account? Click here to make one",
        }
        return render(request, "accounts/auth.html", context)
    else:
        return redirect("/")


def logout_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        if request.method == "POST":
            logout(request)
            return redirect("/login")
        context = {
            "form": None,
            "description": "Are you sure you want to logout?",
            "btn_label": "Click to confirm logout",
            "title": "Logout"
        }
        return render(request, "accounts/auth.html", context)
    else:
        return redirect("/login")


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save()
        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get("password1")
        user = authenticate(username=username, password=raw_password)
        # Can send confirmation email
        login(request, user)
        return redirect("/")
    context = {
        "form": form,
        "btn-label": "Register",
        "title": "Register"
    }
    return render(request, "accounts/auth.html", context)


def profile_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return render(request, "accounts/profile.html", {})
    else:
        return redirect("/login")
