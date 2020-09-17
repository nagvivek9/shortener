const HTTP = require('http');
const BODYPARSER = require('body-parser');
const PATH = require('path');
const ASYNC=require('async');
const EXPRESS = require('express');
const app = EXPRESS();
const U=require('./util');

const htdocsdir = PATH.join(__dirname,'htdocs','ui-shortner','build');
app.use(function(req,res,cb) {
 res.set('Access-Control-Allow-Origin','*');
 cb();
});

app.use(BODYPARSER.urlencoded({extended:true})).use(BODYPARSER.json());
app.use(U.params.setup);

app.use('/api',require('./api.js'));
app.use(EXPRESS.static(htdocsdir));

app.all('/:id',function(req,res,cb){
 const id=req.USERDATA.P('id');
 if(!id) return res.write('oops');
 ASYNC.parallel({
  clicks: function clicks(cb) {
   U.mysql.Q(`
    UPDATE shorten SET clicks=clicks+1 WHERE shorten=:s LIMIT 1
   `,
   {s:id},cb);  
  },
  geturl: function geturl(cb) {
   U.mysql.Q(`
    SELECT original,date_created > NOW()-INTERVAL 30 DAY AS alive
    FROM shorten
    WHERE shorten=:s LIMIT 1
   `,
   {s:id},(e,r)=>{
    if(e) return cb(e);
    if(!r.length) return cb(null,'Not found');
    if(!r[0].alive) return cb(null, 'Link expired');
    cb(null,{url:r[0].original}); 
   });  
  }
 },(e,r)=>{
  if(e) return cb(e);
  if(r.geturl) {
   if(typeof r.geturl==='string') return res.writeHead(404, {'Content-Type': 'text/html'}),res.write(r.geturl),res.end();
   else res.redirect(301,r.geturl.url),res.end();
  }
  else res.writeHead(404, {'Content-Type': 'text/html'}),res.write('Not found'),res.end();
 });
});

app.use(function(req,res,cb) { 
 const api_path = (req.originalUrl||req.url||'').replace(/\?.*/,'');
 cb(`missing link — ${api_path}`);
});

const server= HTTP.createServer(app);
server.listen(3000,function(){
 console.log(`HTTP server listening on the port ${3000}`);
});