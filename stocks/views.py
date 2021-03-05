from django.shortcuts import render


def stock_home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html')

def stock_detail_view(request, ticker, *args, **kwargs):
    return render(request, 'stocks/ticker.html', context={"ticker" : ticker})
