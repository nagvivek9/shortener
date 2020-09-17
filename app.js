const HTTP = require('http');
const BODYPARSER = require('body-parser');
const PATH = require('path');
const EXPRESS = require('express');
const app = EXPRESS();
const U=require('./util');

const htdocsdir = PATH.join(__dirname,'htdocs');
app.use(function(req,res,cb) {
 res.set('Access-Control-Allow-Origin','*');
 cb();
});

app.use(BODYPARSER.urlencoded({extended:true})).use(BODYPARSER.json());
app.use(U.params.setup);

app.use(EXPRESS.static(htdocsdir));

const server= HTTP.createServer(app);
server.listen(3000,function(){
 console.log(`HTTP server listening on the port ${3000}`);
});