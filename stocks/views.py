from django.shortcuts import render


# basic homepage with list of stocks
def stock_home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html')

# connects to the ticker page to show a detailed view of a stock
def stock_detail_view(request, ticker, *args, **kwargs):
    return render(request, 'stocks/ticker.html', context={"ticker" : ticker})
