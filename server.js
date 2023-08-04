const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            if (message.type === 'message' && message.content) {
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(message)); // Wysyłamy cały obiekt jako JSON
                    }
                });
            }
        } catch (error) {
            console.error('Błąd parsowania danych:', error);
        }
    });
});

const port = 8080;
server.listen(port, () => {
    console.log(`WebSocket server is listening on port ${port}`);
});
