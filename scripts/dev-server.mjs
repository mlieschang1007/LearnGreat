import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=process.argv[2]==='dist'?path.resolve('dist'):process.cwd();
const types={'.html':'text/html;charset=utf-8','.js':'text/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
const port=Number(process.env.PORT)||4173;
http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const requestPath=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');
 const target=path.resolve(root,requestPath);
 if(!(target===root||target.startsWith(root+path.sep))){res.writeHead(403);res.end('Forbidden');return;}
 fs.readFile(target,(err,data)=>{
  if(err){res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});res.end(data);
 });
}).listen(port,()=>console.log(`LearnGreat: http://localhost:${port}`));
