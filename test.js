const REQUEST = require('request');
var expect=require('chai').expect;

describe('API testing using Mocha', function() {
 this.timeout(20000);
 function okay(e,r) {
  expect(e).to.not.exist;
  expect(r).to.exist;
  expect(r.status).to.equal('ok');
 }

 describe('/shorten',function() {
  it('This API should return the shorten form of the given URL',function(done) {

   var options = {
     'method': 'POST',
     'url': 'http://localhost:3000/api/shorten',
     'headers': {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     form: {
       'url': 'https://twitter.com'
     },
     json: true
   };
   REQUEST(options, function (e, r) {
    r=r.body;
    okay(e,r);
    expect(r.url).to.exist;
    done();
   });
  });
 });

});