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
 },
 random: function(pp) {
  if(!pp) return (Math.random()*8999+1000+'').substring(0,4);
  var text = "";
  var chars=pp.c||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var l=pp.l||20;
  for (let i = 0; i < l; i++)
   text +=chars.charAt(Math.floor(Math.random() * chars.length));
  return text;
 }
};