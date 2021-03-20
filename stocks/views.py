from django.shortcuts import render, redirect


def stock_home_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return render(request, 'pages/home.html')
    else:
        return redirect('/login')


def stock_detail_view(request, ticker, *args, **kwargs):
    return render(request, 'stocks/ticker.html', context={"ticker": ticker})
