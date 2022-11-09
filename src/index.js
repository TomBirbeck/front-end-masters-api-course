import http from 'http';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    console.log('hello from server');
    res.end();
  }
});

server.listen(3001, () => {
  console.log('server running on http://localhost:3001');
});
