var querystring=require('querystring');
var http=require('http');

//------------ data for add flow ------------
var postData1=querystring.stringtify({
    'installInHw':'true',
    'name':'s1-flow1',
    'node':{'id':'11:11:11:11:11:11:11:01','type':'OF'},
	'ingressPort':'1',
	'actions':['OUTPUT=2']

});

var postData2=querystring.stringtify({
    'installInHw':'true',
    'name':'s1-flow2',
    'node':{'id':'11:11:11:11:11:11:11:01','type':'OF'},
	'ingressPort':'2',
	'actions':['OUTPUT=1']

});
//------------ data for add flow ------------

//------------ options for add name ------------
var options1={
    host:'10.0.2.15',
    port:8181,
    headers:{'Content-type': 'application/json', 'Accept': 'application/json'},
    auth:'admin:admin',
    method:'PUT',
    path:'/controller/nb/v2/switchmanager/default/node/OF/11:11:11:11:11:11:11:01/property/description/s1'
};
//------------ options for add flow ------------
var options2={
    host:'10.0.2.15',
    port:8181,
    headers:{'Content-type': 'application/json', 'Accept': 'application/json'},
    auth:'admin:admin',
    method:'PUT',
    path:'/controller/nb/v2/flowprogrammer/default/node/OF/11:11:11:11:11:11:11:01/staticFlow/s1'
};
//------------ perform http req for add name ------------
var req1 = http.request(options1, (res1) => {
  console.log(`STATUS: ${res1.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res1.headers)}`);
  res1.setEncoding('utf8');
  res1.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res1.on('end', () => {
    console.log('No more data in response.');
  });
});

req1.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

req1.end();

//------------ perform http req for add flow ------------
var req2 = http.request(options2, (res2) => {
  console.log(`STATUS: ${res2.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res2.headers)}`);
  res2.setEncoding('utf8');
  res2.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res2.on('end', () => {
    console.log('No more data in response.');
  });
});

req2.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});
req2.write(postData1);
req2.end();

var req3 = http.request(options3, (res3) => {
  console.log(`STATUS: ${res3.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res3.headers)}`);
  res3.setEncoding('utf8');
  res3.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res3.on('end', () => {
    console.log('No more data in response.');
  });
});

req3.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});
req3.write(postData2);
req3.end();




