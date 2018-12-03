import http from 'http';
import app from './server';

const server = http.createServer(app);

const PORT_NUMBER = process.env.PORT;

app.listen(PORT_NUMBER, () => {
    console.log(`Server listening on port ${PORT_NUMBER}`);
});

if(module.hot) {
    module.hot.accept(['./server'], () => {
        server.removeListener('request', app);
        server.on('request', app);
    });
}