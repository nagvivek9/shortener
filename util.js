const CONFIG=require('./config');

function hasprop(o,p) {
 if(!o) return false;
 if(o[p]) return true;
 if(o.hasOwnProperty) return o.hasOwnProperty(p);
 return Object.hasOwnProperty.call(o,p);
}


module.exports= {
 mysql: require('./mysql')({
  config: CONFIG.mysql
 }),
 params: {
  setup: function(req,res,cb) {
   if(!req.USERDATA) req.USERDATA = {};
   req.USERDATA.P = function(n) {
    if(hasprop(req.body,n)) return req.body[n];
    if(hasprop(req.query,n)) return req.query[n];
    if(hasprop(req.params,n)) return req.params[n];
    if(hasprop(req.cookies,n)) return req.cookies[n];
    return undefined;
   };
   cb();
  }
 }
};