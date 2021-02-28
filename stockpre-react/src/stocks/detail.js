import React, { useEffect } from 'react'
//Simple component all it does is display the ticker for a stock
export function Stock(props) {
    const {ticker} = props
    console.log(ticker);
    useEffect(() => {
        const script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.src = "https://s3.tradingview.com/tv.js";
        const script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.innerHTML = `new TradingView.widget({
        "autosize": true,
        "symbol": "${ ticker }",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "hide_legend": true,
        "save_image": false,
        "container_id": "tradingview_29472"
        });`
        script1.appendChild(script2);
        document.body.appendChild(script1);
        return () => {
            try {
            script1.removeChild(script2);
            document.body.removeChild(script1);
            } catch {}
        }
    }, []);
    return <div class="tradingview-widget-container" style={{padding: 40 + 'px'}}>
        <div id="tradingview_29472"></div>
        <div class="tradingview-widget-copyright">
            <a href={`https://www.tradingview.com/symbols/${ ticker }/`} rel="noopener" target="_blank">
                <span class="blue-text">{ticker} Chart</span>
            </a> by TradingView
        </div>
    </div>
}