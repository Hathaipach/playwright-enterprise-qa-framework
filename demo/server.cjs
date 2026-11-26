const http = require('node:http');
const product = { id: 'P001', name: 'Coffee', price: 120 };
const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Demo Shop</title><style>body{font:18px system-ui;max-width:600px;margin:24px auto;padding:16px}button{padding:14px}article{border:1px solid #aaa;padding:20px}</style><h1>Demo Shop</h1><article><h2>Coffee</h2><p>THB 120</p><button id="add">Add Coffee</button></article><p role="status">0 item(s) | THB 0</p><script>let n=0;document.querySelector('#add').onclick=()=>{n++;document.querySelector('[role=status]').textContent=n+' item(s) | THB '+n*120}</script></html>`;
http.createServer((req,res)=>{
 const path = new URL(req.url,'http://localhost').pathname;
 if(path==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(html);}
 res.setHeader('Content-Type','application/json');
 if(path==='/health') return res.end(JSON.stringify({ok:true}));
 if(path==='/api/products/P001') return res.end(JSON.stringify(product));
 res.statusCode=404;res.end(JSON.stringify({error:'Not found'}));
}).listen(4173,'127.0.0.1');
