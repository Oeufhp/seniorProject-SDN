#First script for adding one flow with python in Opendaylight controller
#To 4 switches- single path adding flows
#Run in GIST and THAI smartX box
#Check flows is adding or not and ping test
#To install requests module: sudo easy_install requests
#Phyo 6.3.2016 Modified from the script run for mininet to run on OF@TEIN
import requests
import json
from requests.auth import HTTPBasicAuth
from threading import Timer
import time
import math

#ip = '127.0.0.1'
ip = '10.20.0.2' #Change to IP address of ODL controller
port = '8080'
user='admin'
passwd = 'admin'

#Adding Name of OVS
print "====================Adding Name to OVS======================"
#Server
base_url1 = 'http://' + ip + ':' + port
server_addname1 = '/controller/nb/v2/switchmanager/default/node/OF/11:11:11:11:11:11:11:01/property/description/Server_br1'
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

base_url1 = 'http://' + ip + ':' + port
server_addname2 = '/controller/nb/v2/switchmanager/default/node/OF/11:11:11:11:11:11:11:02/property/description/Server_br2'
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#client
base_url1 = 'http://' + ip + ':' + port
client_addname1 = '/controller/nb/v2/switchmanager/default/node/OF/22:22:22:22:22:22:22:01/property/description/Client_br1'
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

base_url1 = 'http://' + ip + ':' + port
client_addname2 = '/controller/nb/v2/switchmanager/default/node/OF/22:22:22:22:22:22:22:02/property/description/Client_br2'
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

############################################################################################################
#Adding flows Server br1:Input1 >> Output 2
print "Installing flow to Server br1"
base_url1 = 'http://' + ip + ':' + port
serverbr1_addflow1 = '/controller/nb/v2/flowprogrammer/default/node/OF/11:11:11:11:11:11:11:01/staticFlow/Server_br1_1'
serverbr1_payload1 = {"installInHw":"true",
                 "name":"Server_br1_1",
                 "node":{"id":"11:11:11:11:11:11:11:01","type":"OF"},
				 "ingressPort":"1",
				 "actions":["OUTPUT=2"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#Adding flows Server br1:Input2 >> Output 1
serverbr1_addflow2 = '/controller/nb/v2/flowprogrammer/default/node/OF/11:11:11:11:11:11:11:01/staticFlow/Server_br1_2'
serverbr1_payload2 = {"installInHw":"true",
                 "name":"Server_br1_2",
				 "node":{"id":"11:11:11:11:11:11:11:01","type":"OF"},
				 "ingressPort":"2",
				 "actions":["OUTPUT=1"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

############################################################################################################
print "Installing flow to Server br2"
#Adding flows Server br2:Input2 TH  >> Output 4 br2-br1
base_url1 = 'http://' + ip + ':' + port
serverbr2_addflow1 = '/controller/nb/v2/flowprogrammer/default/node/OF/11:11:11:11:11:11:11:02/staticFlow/Server_br2_1'
serverbr2_payload1 = {"installInHw":"true",
                 "name":"Server_br2_1",
                 "node":{"id":"11:11:11:11:11:11:11:02","type":"OF"},
				 "ingressPort":"2",
				 "actions":["OUTPUT=1"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#Adding flows Server br2:Input4 br2-br1 >> Output 2 TH
serverbr2_addflow2 = '/controller/nb/v2/flowprogrammer/default/node/OF/11:11:11:11:11:11:11:02/staticFlow/Server_br2_2'
serverbr2_payload2 = {"installInHw":"true",
                 "name":"Server_br2_2",
				 "node":{"id":"11:11:11:11:11:11:11:02","type":"OF"},
				 "ingressPort":"1",
				 "actions":["OUTPUT=2"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

############################################################################################################
#Adding flows Client br1:Input1 >> Output 2
print "Installing flow to Client br1"
base_url1 = 'http://' + ip + ':' + port
clientbr1_addflow1 = '/controller/nb/v2/flowprogrammer/default/node/OF/22:22:22:22:22:22:22:01/staticFlow/Client_br1_1'
clientbr1_payload1 = {"installInHw":"true",
                 "name":"Client_br1_1",
                 "node":{"id":"22:22:22:22:22:22:22:01","type":"OF"},
				 "ingressPort":"1",
				 "actions":["OUTPUT=2"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#Adding flows client br1:Input2 >> Output 1
clientbr1_addflow2 = '/controller/nb/v2/flowprogrammer/default/node/OF/22:22:22:22:22:22:22:01/staticFlow/Client_br1_2'
clientbr1_payload2 = {"installInHw":"true",
                 "name":"Client_br1_2",
				 "node":{"id":"22:22:22:22:22:22:22:01","type":"OF"},
				 "ingressPort":"2",
				 "actions":["OUTPUT=1"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
############################################################################################################
print "Installing flow to client br2"
#Adding flows client br2:Input2 server >> Output 1 br2-br1   
clientbr2_addflow1 = '/controller/nb/v2/flowprogrammer/default/node/OF/22:22:22:22:22:22:22:02/staticFlow/Client_br2_1'
clientbr2_payload1 = {"installInHw":"true",
                 "name":"Client_br2_1",
				 "node":{"id":"22:22:22:22:22:22:22:02","type":"OF"},
				 "ingressPort":"2",
				 "actions":["OUTPUT=1"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#Adding flows client br2:Input1 br2-br1  >> Output 2 server
clientbr2_addflow2 = '/controller/nb/v2/flowprogrammer/default/node/OF/22:22:22:22:22:22:22:02/staticFlow/Client_br2_2'
clientbr2_payload2 = {"installInHw":"true",
                 "name":"Client_br2_2",
				 "node":{"id":"22:22:22:22:22:22:22:02","type":"OF"},
				 "ingressPort":"1",
				 "actions":["OUTPUT=2"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}


#Add Name
#server
server1url = base_url1 + server_addname1
server2url = base_url1 + server_addname2

#client
client1url = base_url1 + client_addname1
client2url = base_url1 + client_addname2

#create addflows
#server
serverbr1_url1 = base_url1 + serverbr1_addflow1
serverbr1_url2 = base_url1 + serverbr1_addflow2

#server br2
serverbr2_url1 = base_url1 + serverbr2_addflow1
serverbr2_url2 = base_url1 + serverbr2_addflow2

#client br1
clientbr1_url1 = base_url1 + clientbr1_addflow1
clientbr1_url2 = base_url1 + clientbr1_addflow2

#client br2
clientbr2_url1 = base_url1 + clientbr2_addflow1
clientbr2_url2 = base_url1 + clientbr2_addflow2

print server1url
print server2url
print client1url
print client2url
print serverbr1_url1
print serverbr1_url2
print serverbr2_url1
print serverbr2_url2
print clientbr1_url1
print clientbr1_url2
print clientbr2_url1
print clientbr2_url2

#get a authorization object
auth = HTTPBasicAuth(user,passwd)

#send Name request
#Server
response = requests.put(server1url, auth=auth, headers=headers)
response = requests.put(server2url, auth=auth, headers=headers)

#Client
response = requests.put(client1url, auth=auth, headers=headers)
response = requests.put(client2url, auth=auth, headers=headers)

#send request
#server br1
response = requests.put(serverbr1_url1, auth=auth, data=json.dumps(serverbr1_payload1), headers=headers)
response = requests.put(serverbr1_url2, auth=auth, data=json.dumps(serverbr1_payload2), headers=headers)
#GIST br2
response = requests.put(serverbr2_url1, auth=auth, data=json.dumps(serverbr2_payload1), headers=headers)
response = requests.put(serverbr2_url2, auth=auth, data=json.dumps(serverbr2_payload2), headers=headers)
#TH br1
response = requests.put(clientbr1_url1, auth=auth, data=json.dumps(clientbr1_payload1), headers=headers)
response = requests.put(clientbr1_url2, auth=auth, data=json.dumps(clientbr1_payload2), headers=headers)
#TH br2
response = requests.put(clientbr2_url1, auth=auth, data=json.dumps(clientbr2_payload1), headers=headers)
response = requests.put(clientbr2_url2, auth=auth, data=json.dumps(clientbr2_payload2), headers=headers)

#print response
print response.status_code
print response.headers['content-type']
print response.content
