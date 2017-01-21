var express=require('express');
var app=express();
var path=require('path');

app.use('/', function(req, res) {
    res.static(__dirname + '../../index.html');
});

app.listen(7777,function() { console.log('App is running in port 7777'); });