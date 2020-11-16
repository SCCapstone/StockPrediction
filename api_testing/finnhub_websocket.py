API_KEY="bua1l2n48v6q418fsepg"

import websocket

def on_message(ws, message): # Save input to database
    print(message)

def on_error(ws, error): # Log to file
    print(error)

def on_close(ws): # Log to file
    print("### closed ###")

def on_open(ws):
    ws.send('{"type":"subscribe","symbol":"AAPL"}')
    ws.send('{"type":"subscribe","symbol":"AMZN"}')
    ws.send('{"type":"subscribe","symbol":"FB"}')
    ws.send('{"type":"subscribe","symbol":"GOOG"}')
    ws.send('{"type":"subscribe","symbol":"GOOGL"}')
    ws.send('{"type":"subscribe","symbol":"FVRR"}')
    ws.send('{"type":"subscribe","symbol":"WORK"}')
    ws.send('{"type":"subscribe","symbol":"MSFT"}')
    ws.send('{"type":"subscribe","symbol":"ATVI"}')
    ws.send('{"type":"subscribe","symbol":"MED"}')
    ws.send('{"type":"subscribe","symbol":"BABA"}')
    ws.send('{"type":"subscribe","symbol":"NXST"}')
    ws.send('{"type":"subscribe","symbol":"ABBV"}')
    ws.send('{"type":"subscribe","symbol":"NMIH"}')
    ws.send('{"type":"subscribe","symbol":"PEAK"}')
    ws.send('{"type":"subscribe","symbol":"NEM"}')
    ws.send('{"type":"subscribe","symbol":"KIRK"}')
    ws.send('{"type":"subscribe","symbol":"NIO"}')
    ws.send('{"type":"subscribe","symbol":"PRPLW"}')
    ws.send('{"type":"subscribe","symbol":"ZM"}')
    ws.send('{"type":"subscribe","symbol":"PRTS"}')
    ws.send('{"type":"subscribe","symbol":"TRIL"}')
    ws.send('{"type":"subscribe","symbol":"TSLA"}')
    ws.send('{"type":"subscribe","symbol":"NLS"}')
    ws.send('{"type":"subscribe","symbol":"SE"}')
    ws.send('{"type":"subscribe","symbol":"QDEL"}')
    ws.send('{"type":"subscribe","symbol":"PTON"}')
    ws.send('{"type":"subscribe","symbol":"SITM"}')
    ws.send('{"type":"subscribe","symbol":"LVGO"}')
    ws.send('{"type":"subscribe","symbol":"KSPN"}')
    ws.send('{"type":"subscribe","symbol":"BTAI"}')

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://ws.finnhub.io?token=" + API_KEY,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()
    