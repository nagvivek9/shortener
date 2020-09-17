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

 function conn(c,cb) {
  var P = pool(c);
  if(!P) return cb(new Error('Failed to create mysql pool for '+c));
  P.getConnection(function(e,C) {
   if(e) return cb(e,C);
   C.config.queryFormat = function(q,v) {
    if(!v) return q;
    return q.replace(/:(\w+)/g, function(t,k) {
     return v.hasOwnProperty(k) ? ((v[k]===null)?'NULL':this.escape(v[k])) : t;
    }.bind(this));
   };
   C.Q = function(q,p,cb) {
    console.trace({query:q,args:p},'MySQL: %s',q);
    const t0=new Date();
    this.query(q,p,function(e,r) {
     const t1=new Date();
     const dt = t1-t0;
     console.trace("MySQL query '%s' took %dms",q,dt);
     cb(e,r);
    });
   };
   cb(null,C);
  });
 }

 return {
  C: function(n,cb) {
   return conn(n,cb);
  }
 };
};