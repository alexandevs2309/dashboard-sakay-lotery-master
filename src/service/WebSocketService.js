class WebSocketService {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.listeners = {};
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = (event) => {
            this._notifyListeners('open', event);
            console.log('Conexión WebSocket establecida');

        };

        this.socket.onmessage = (event) => {
            this._notifyListeners('message', event);
        };

        this.socket.onclose = (event) => {
            this._notifyListeners('close', event);
            setTimeout(() => {
                this.connect();
            }, 5000);
        };

        this.socket.onerror = (event) => {
            this._notifyListeners('error', event);
        };
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error("WebSocket no está abierto.");
        }
    }

    addListener(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    removeListener(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
        }
    }

    _notifyListeners(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener(data));
        }
    }
}

// Instancia de WebSocketService
export default new WebSocketService('ws://127.0.0.1:8000/ws/lottery/');
