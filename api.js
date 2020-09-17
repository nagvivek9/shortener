const R=require('express').Router({caseSensitive:true});
const REQUESTIP = require('request-ip');
const U=require('./util');

R.all('/shorten',function(req,res,cb){
 const url=req.USERDATA.P('url');
 if(!url) return res.json({status: 'data'});
 const s=U.random({l:5});
 const ua = req.get && req.get('User-Agent')||'unknown';
 const ip = (REQUESTIP.getClientIp(req)||':').split(':').pop()||'unknown';
 U.mysql.Q(`
  INSERT INTO shorten (original,shorten,ip,ua,date_created) 
  VALUES (:original,:shorten,:ip,:ua,now())
 `,
 {
  original: url,
  shorten:s,
  ip,
  ua
 },(e,r)=>{
  if(e) return res.json({status:'error', message:e});
  if(!r.insertId) return cb(new Error('Something went wrong!!'));
  res.json({status:'ok',url:`${req.protocol}://${req.get('host')}/${s}`});
 });
});

module.exports = R;