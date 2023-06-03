const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  // Rota raiz - Exibe o formulário de entrada
  if (reqUrl.pathname === '/trigmaster') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  }

  // Rota de cálculo - Realiza os cálculos de trigonometria
  if (reqUrl.pathname === '/calculate') {
    const { angle } = reqUrl.query;

    if (!angle || isNaN(parseFloat(angle))) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid angle');
    } else {
        const angleInRadians = parseFloat(angle) * (Math.PI / 180);
        const sin = Math.sin(angleInRadians);
        const cos = Math.cos(angleInRadians);
        const tan = Math.tan(angleInRadians);


      const result = {
        angle: parseFloat(angle),
        sin: sin.toFixed(4),
        cos: cos.toFixed(4),
        tan: tan.toFixed(4),
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
