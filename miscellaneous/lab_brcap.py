#Script for adding flows and naming with python in Opendaylight controller
#For adding admin flows brcap
#Check flows is adding or not and ping test
#To install requests module: sudo easy_install requests
#Phyo 22.12.2016 Modified from the script run for running on lab-OF@TEIN testbed
import requests
import json
from requests.auth import HTTPBasicAuth
from threading import Timer
import time
import math

ip = '10.20.0.2' #Change to IP address of Admin ODL controller
port = '8080'
user='admin'
passwd = 'admin'

#Adding Name of OVS
print "====================Adding Name to OVS======================"
#server
base_url1 = 'http://' + ip + ':' + port
server_addname = '/controller/nb/v2/switchmanager/default/node/OF/33:33:33:33:33:33:33:01/property/description/brcap_server'
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#client
base_url1 = 'http://' + ip + ':' + port
client_addname = '/controller/nb/v2/switchmanager/default/node/OF/33:33:33:33:33:33:33:02/property/description/brcap_client'
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}


############################################################################################################
#Adding flows server brcap:Input1 >> Output 2
print "Installing flow to Server brcap"
base_url1 = 'http://' + ip + ':' + port
server_addflow1 = '/controller/nb/v2/flowprogrammer/default/node/OF/33:33:33:33:33:33:33:01/staticFlow/brcap_1_1'
server_payload1 = {"installInHw":"true","name":"brcap_1_1",
                 "node":{"id":"33:33:33:33:33:33:33:01","type":"OF"},
				 "ingressPort":"1",
				 "actions":["OUTPUT=2"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#Adding flows server brcap:Input2 >> Output 1
server_addflow2 = '/controller/nb/v2/flowprogrammer/default/node/OF/33:33:33:33:33:33:33:01/staticFlow/brcap_1_2'
server_payload2 = {"installInHw":"true",
                 "name":"brcap_1_2",
				 "node":{"id":"33:33:33:33:33:33:33:01","type":"OF"},
				 "ingressPort":"2",
				 "actions":["OUTPUT=1"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

############################################################################################################
print "Installing flow to Client brcap"
#Adding flows Client brcap:Input1 >> Output 2 
base_url1 = 'http://' + ip + ':' + port
client_addflow1 = '/controller/nb/v2/flowprogrammer/default/node/OF/33:33:33:33:33:33:33:02/staticFlow/brcap_2_1'
client_payload1 = {"installInHw":"true","name":"brcap_2_1",
                 "node":{"id":"33:33:33:33:33:33:33:02","type":"OF"},
				 "ingressPort":"1",
				 "actions":["OUTPUT=2"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

#Adding flows Client brcap:Input2 >> Output 1 
client_addflow2 = '/controller/nb/v2/flowprogrammer/default/node/OF/33:33:33:33:33:33:33:02/staticFlow/brcap_2_2'
client_payload2 = {"installInHw":"true",
                 "name":"brcap_2_2",
				 "node":{"id":"33:33:33:33:33:33:33:02","type":"OF"},
				 "ingressPort":"2",
				 "actions":["OUTPUT=1"]}
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

############################################################################################################

#Add Name
#server
serverurl = base_url1 + server_addname

#client
clienturl = base_url1 + server_addname

#create addflows
#server brcap
server_url1 = base_url1 + server_addflow1
server_url2 = base_url1 + server_addflow2

#client brcap
client_url1 = base_url1 + client_addflow1
client_url2 = base_url1 + client_addflow2

print serverurl
print clienturl
print server_url1
print server_url2
print client_url1
print client_url2

#get a authorization object
auth = HTTPBasicAuth(user,passwd)

#send Name request
#server
response = requests.put(serverurl, auth=auth, headers=headers)
#client
response = requests.put(clienturl, auth=auth, headers=headers)

#send request
#server brcap
response = requests.put(server_url1, auth=auth, data=json.dumps(server_payload1), headers=headers)
response = requests.put(server_url2, auth=auth, data=json.dumps(server_payload2), headers=headers)

#client brcap
response = requests.put(client_url1, auth=auth, data=json.dumps(client_payload1), headers=headers)
response = requests.put(client_url2, auth=auth, data=json.dumps(client_payload2), headers=headers)

#print response
print response.status_code
print response.headers['content-type']
print response.content
