const MYSQL = require('mysql');

module.exports = function(o) {
 var pools = {};
 function pool(c) {
  if(!c) c='default';
  if(pools[c]) return pools[c];
  if(!o.config[c])
   return console.error({connname:c},'No mysql connection %s defined',c),null;
  return pools[c]=MYSQL.createPool(o.config[c]);
 }
};