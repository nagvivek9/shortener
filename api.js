const R=require('express').Router({caseSensitive:true});

R.all('/',function(req,res,cb){
 res.write('API route'),res.end();
});

module.exports = R;