import http from 'http';
import app from './app';
import dbConfig from './db/config';

dbConfig.connect();

const server = http.createServer(app);

server.listen(process.env.PORT);

console.log('server started');

const shutdownProcess = () => {
  // eslint-disable-next-line no-console
  server.close(() => {
    // eslint-disable-next-line no-console
    dbConfig.disconnect();
    process.exit(0);
  });
};

process.on('SIGTERM', shutdownProcess);
process.on('SIGINT', shutdownProcess);
