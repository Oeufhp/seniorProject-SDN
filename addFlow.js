var querystring=require('querystring');
var http=require('http');
var request=require('request');


var username="admin";
var password="admin";
var url="http://localhost:8181"
var auth="Basic "+ new Buffer(username +":"+password).toString("base64");

request(
  {
    url:url,
    headers:{"Authorization":auth}
  },
  function(err,res,body){
    if(res){
    console.log(res.statusCode);
  }
   else if(err){
    console.error(err); 
   }
   console.log(body)
  }
);
//------------ data for add flow ------------
// var postData1=querystring.stringtify({
//     installInHw:'true',
//     name:'s1-flow1',
//     node:{'id':'11:11:11:11:11:11:11:01','type':'OF'},
// 	  ingressPort:'1',
// 	  actions:['OUTPUT=2']

// });

var putData1={
    'installInHw':'true',
    'name':'s1-flow1',
    'node':{'id':'00:00:00:00:00:00:00:01','type':'OF'},
	  'ingressPort':'1',
	  'actions':['OUTPUT=2']
};

// var postData2=querystring.stringtify({
//     'installInHw':'true',
//     'name':'s1-flow2',
//     'node':{'id':'11:11:11:11:11:11:11:01','type':'OF'},
// 	  'ingressPort':'2',
// 	  'actions':['OUTPUT=1']

// });

var putData2={
    'installInHw':'true',
    'name':'s1-flow2',
    'node':{'id':'00:00:00:00:00:00:00:01','type':'OF'},
	  'ingressPort':'2',
	  'actions':['OUTPUT=1']

};
//------------ data for add flow ------------

//------------ options for add name ------------
var options1={
  url:'localhost:8181/controller/nb/v2/switchmanager/default/node/OF/00:00:00:00:00:00:00:01/property/description/s1',
  headers:{'Content-type':'application/json','Accept':'application/json'},
  // username:'admin',
  // password:'admin'
};
//------------ options for add flow ------------
var options2={
  url:'localhost:8181//controller/nb/v2/flowprogrammer/default/node/OF/00:00:00:00:00:00:00:01/staticFlow/s1_1',
  headers:{'Content-type':'application/json','Accept':'application/json'},
  username:'admin',
  password:'admin'
}
var options3={
  url:'localhost:8181//controller/nb/v2/flowprogrammer/default/node/OF/00:00:00:00:00:00:00:01/staticFlow/s1_2',
  headers:{'Content-type':'application/json','Accept':'application/json'},
  // username:'admin',
  // password:'admin'
}
//------------ perform http req for add name ------------
var username='admin';
var pass='admin';
request.get('localhost:8181/index.html').auth(username,pass);
request.post(options1,function(err,httpResponse,body){
  if(httpResponse){
    console.log(res.statusCode);
  }
  else if(err){
    console.error(err); 
  }
  console.log(body)
});
//------------ perform http req for add flow ------------
request.get('localhost:8181/index.html').auth(username,pass);
request.post(options2,putData1,function(err,httpResponse,body){
  if(httpResponse){
    console.log(res.statusCode);
  }
  else if(err){
    console.error(err); 
  }
  console.log(body)
});
request.post(options3,putData2,function(err,httpResponse,body){
  if(httpResponse){
    console.log(res.statusCode);
  }
  else if(err){
    console.error(err); 
  }
  console.log(body)
});



