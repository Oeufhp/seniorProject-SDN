var topologyData={};
var url_topo='http://localhost:8181/restconf/operational/network-topology:network-topology/topology/flow:1/';
$.ajax({
      url:url_topo,
      method:'GET',
      crossDomain:true,
      dataType:'json',
      headers:{
          "authorization": "Basic YWRtaW46YWRtaW4=",
          "content-type": "application/json",
          "accept": "application/json",
      },
       success:function(data){
           topologyData=jsonToCTM(data);
            // console.log(topologyData);
            for(i=0;i<topologyData.nodes.length;i++){
                  if(topologyData.nodes[i].name.substring(0,4)==='open'){
                     var opt='<option value="'+topologyData.nodes[i].name+'">'+topologyData.nodes[i].name+'</option>';
                  }    
                  $('#switch-select1').append(opt);
             }
       }
 });
 $(document).ready(function(){
    var deviceData={};
    var val;
    var txt='';
    $('#switch-select1').change(function(){
    $('#table-device tr').remove();
    val=$(this).find("option:selected").attr("value");
    // console.log(val);
    var data_url="http://localhost:8181/restconf/operational/opendaylight-inventory:nodes/node/"+val;
    $.ajax({
        url: data_url,
        method:'GET',
        crossDomain: true,
        dataType:'json',
        headers: {
               "authorization": "Basic YWRtaW46YWRtaW4=",
               "content-type": "application/json",
               "accept": "application/json",
        },
        success:function(data){
            deviceData=data['node'][0]['node-connector'];
            console.log(data['node'][0]['flow-node-inventory:ip-address']);
            var devID,devName,devType, portInf='',otherInf,txt,conHost;
            devID=deviceData['id'];
            devType='<img src="./img/switch.svg" class="image" style="width:20%; text-align:center;">'+
                    '<figcaption>switch</figcaption>';
            // var len=deviceData['node-connector'].length;
            // for(i=0;i<len;i++){
            $.each(deviceData,function(i,element){    
                console.log(element);
                if(element['id'].substring(element['id'].length,element['id'].length-5)!=='LOCAL'){
                    portInf+='<strong>port ID:</strong> '                    +element['id']+'<br>'+
                            '<strong>port number:</strong> '                 +element['flow-node-inventory:port-number']+'<br>'+
                            '<strong>port name:</strong> '                   +element['flow-node-inventory:name']+'<br>'+
                            '<strong>current feature of LAN cable:</strong> '+element['flow-node-inventory:current-feature']+'<br>'+
                            '<strong>MAC address:</strong> '                 +element['flow-node-inventory:hardware-address']+'<br>'+
                            '<strong>packet received:</strong> '             +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['packets']['received']+'<br>'+
                            '<strong>packet transmitted:</strong> '          +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['packets']['transmitted']+'<br>'+
                            '<strong>number of collision:</strong> '         +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['collision-count']+'<br>'+
                            '<strong>bytes received: </strong> '             +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['bytes']['received']+'<br>'+
                            '<strong>bytes transmitted: </strong> '          +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['bytes']['transmitted']+'<br>'+
                            '<strong>duration(sec): </strong> '              +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['duration']['second']+'<br>';
                }
                else{
                    portInf+='<strong>port ID:</strong> '                    +element['id']+'<br>'+
                        '<strong>port number:</strong> '                     +element['flow-node-inventory:port-number']+'<br>'+
                        '<strong>bridge name:</strong> '                     +element['flow-node-inventory:name']+'<br>'+
                        '<strong>current feature of LAN cable:</strong> '    +element['flow-node-inventory:current-feature']+'<br>'+
                        '<strong>MAC address:</strong> '                     +element['flow-node-inventory:hardware-address']+'<br>'+
                        '<strong>packet received:</strong> '                 +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['packets']['received']+'<br>'+
                        '<strong>packet transmitted:</strong> '              +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['packets']['transmitted']+'<br>'+
                        '<strong>number of collision:</strong> '             +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['collision-count']+'<br>'+
                        '<strong>bytes received: </strong> '                 +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['bytes']['received']+'<br>'+
                        '<strong>bytes transmitted: </strong> '              +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['bytes']['transmitted']+'<br>'+
                        '<strong>duration(sec): </strong> '                  +element['opendaylight-port-statistics:flow-capable-node-connector-statistics']['duration']['second']+'<br>';
                }
                if(element['address-tracker:addresses']!==undefined){
                    for(j=0;j<element['address-tracker:addresses'].length;j++){
                        portInf+='<strong>host\'s MAC address: </strong> '   +element['address-tracker:addresses'][j]['mac']+'<br>'+
                              '<strong>host\'s IP address: </strong> '   +element['address-tracker:addresses'][j]['ip']+'<br>';
                    }          
                 }
                 else{
                     portInf+='<strong>host\'s MAC address: </strong> NONE <br>'+
                              '<strong>host\'s IP address: </strong> NONE <br>';
                 }          
                 if(!element['flow-node-inventory:state']['link-down']){
                    portInf+='<strong>link state:</strong> '+'link up<hr>';
                 }
                 else{
                     portInf+='<strong>link state:</strong> '+'link down<hr>';
                 }            
        //    }
            });
            otherInf='hardware type: '+data['node'][0]['flow-node-inventory:hardware']+'<br>'+
                      'IP address of switch '+data['node'][0]['flow-node-inventory:ip-address']+'<br>';      
            txt+='<tr><th>'+devID+'</th><td>'+devType+'</td><td>'+portInf+'</td><td>'+otherInf+'</td></tr>';
            $('#table-device').append(txt);     
         }
       });
     });
   });