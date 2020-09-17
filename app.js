const HTTP = require('http');
const EXPRESS = require('express');
const app = EXPRESS();

const server= HTTP.createServer(app);
server.listen(3000,function(){
 console.log(`HTTP server listening on the port ${3000}`);
});