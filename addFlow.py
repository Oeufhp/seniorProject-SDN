import requests
import json
from requests.auth import HTTPBasicAuth
import math

ip='10.0.2.15'
port='8181'
user='admin'
password='admin'

print '---------- Adding name to OVS ---------'
baseUrl= 'http://'+ip+':'+port
s1_addname='/controller/nb/v2/switchmanager/default/node/OF/00:00:00:00:00:00:00:01/property/description/s1'
headers={'Content-type':'application/json','Accept':'application/json'}

print '----------- Adding flow to switch ----------'
s1_addflow1='/controller/nb/v2/flowprogrammer/default/node/OF/00:00:00:00:00:00:00:01/staticFlow/s1_1'
s1_payload1={
    "installInHw":"true",
    "name":"flow1",
    "node":{"id":"00:00:00:00:00:00:00:01","type":"OF"},
    "ingressPort":"1",
    "actions":["OUTPUT=2"]
}
s1_addflow2='/controller/nb/v2/flowprogrammer/default/node/OF/00:00:00:00:00:00:00:01/staticFlow/s1_2'
s1_payload2={
    "installInHw":"true",
    "name":"flow2",
    "node":{"id":"00:00:00:00:00:00:00:01","type":"OF"},
    "ingressPort":"2",
    "actions":["OUTPUT=1"]
}

bindedUrl1=baseUrl+s1_addname
bindedUrl2=baseUrl+s1_addflow1
bindedUrl3=baseUrl+s1_addflow2

print bindedUrl1
print bindedUrl2
print bindedUrl3

auth=HTTPBasicAuth(user,password)

print '---------- Sending name request ---------'
response=requests.put(bindedUrl1, auth=auth, headers=headers)

print '---------- Sending flow request ---------'
response=requests.put(bindedUrl2, auth=auth, data=json.dumps(s1_payload1), headers=headers)
response=requests.put(bindedUrl3, auth=auth, data=json.dumps(s1_payload2), headers=headers)

print response.status_code
print response.headers['content-type']
print response.content
