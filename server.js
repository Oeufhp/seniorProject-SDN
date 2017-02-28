var express=require('express');
var fs=require('fs');
var app=express();
var morgan=require('morgan');
var port = process.env.PORT ? process.env.PORT : 7777;
var path=__dirname+'/ui';
var path1=require('path');

app.use(morgan('dev'));
app.use("/", express.static(path));
app.use('flow-page',express.static(path+'/flow-page'));
app.use('device-page',express.static(path+'/device-page'));
app.use('/bower_components',express.static(__dirname+'/bower_components'));

app.listen(port,function(){
  console.log("eSDN is running at port "+ port);
});