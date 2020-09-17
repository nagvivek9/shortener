const HTTP = require('http');
const BODYPARSER = require('body-parser');
const EXPRESS = require('express');
const app = EXPRESS();

app.use(function(req,res,cb) {
 res.set('Access-Control-Allow-Origin','*');
 cb();
});

app.use(BODYPARSER.urlencoded({extended:true})).use(BODYPARSER.json());

const server= HTTP.createServer(app);
server.listen(3000,function(){
 console.log(`HTTP server listening on the port ${3000}`);
});