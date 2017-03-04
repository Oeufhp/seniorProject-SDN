$(document).ready(function(){
    var flowData={},flowData2={};
    var val;
    $('#switch-select').change(function(){
        $('#table-body tr').remove();
        val=$(this).find("option:selected").attr("value");
        console.log(val);
        var flow_url='http://localhost:8181/restconf/operational/opendaylight-inventory:nodes/node/'+val+'/table/0/';
        var flow_url2='http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/'+val+'/table/0/'
        $.ajax({
            url:flow_url,
            method:'GET',
            crossDomain: true,
            dataType:'json',
            headers: {
                "authorization": "Basic YWRtaW46YWRtaW4=",
                "content-type": "application/json",
                "accept": "application/json",
            },
            success:function(data){
                flowData=data;
                var flows=flowData['flow-node-inventory:table'][0]['flow'];
                console.log(flows);
                var tdflowID,tdtableID,tdmatch='',output,priority;
                var len=flows.length;
                var txt='';
                $.each(flows,function(i,sw){
                    tdflowID=sw['id'];
                    tdtableID=sw['table_id'];
                    priority=sw['priority'];
                    if(sw['match']['ethernet-match']!==undefined){
                        if(sw['match']['ethernet-match']['ethernet-type']!==undefined){
                            tdmatch+='ethernet type: '+sw['match']['ethernet-match']['ethernet-type']['type']+', ';    
                         }
                         else if(sw['match']['ethernet-match']['ethernet-source']===undefined || sw['match']['ethernet-match']['ethernet-destination']===undefined){
                              tdmatch+='<b>ethernet source H/W address:</b> NONE, '+
                                      '<b>ethernet destination H/W address:</b> NONE, ';
                         }
                    }   
                    if(sw['match']['in-port']!==undefined){
                           tdmatch+='in port: '+sw['match']['in-port'];
                    }
                    if(sw['instructions']!==undefined){
                           var arr1=flows[i]['instructions']['instruction'][0]['apply-actions']['action'];
                           $.each(arr1,function(j,sw1){
                                output='order: '+sw1['order']+', <br>'+
                                       'out port: '+sw1['output-action']['output-node-connector'];
                           });
                   }
                   txt+="<tr><th>"+tdflowID+"</th><td>"+tdtableID+"</td><td>"+priority+"</td><td>"+'NONE'+"</td><td>"+tdmatch+"</td><td>"+output+"</td></tr>";
                   $('#table-body').append(txt);
                 });
            }
        });
        $.ajax({
            url:flow_url2,
            method:'GET',
            crossDomain: true,
            dataType:'json',
            headers: {
                "authorization": "Basic YWRtaW46YWRtaW4=",
                "content-type": "application/json",
                "accept": "application/json",
            },
            success:function(data){
                flowData2=data['flow-node-inventory:table'][0]['flow'];
                console.log(flowData2);
                var tdflowID2,tdtableID2,flowName2,tdmatch2,output2,priority2;
                var txt='';
                // var len2=flowData2.length;
                $.each(flowData2,function(i,element){
                   tdflowID2=element['id'];
                   tdtableID2=element['table_id'];
                   priority2=element['priority'];
                   flowName2=element['flow-name'];
                   if(element['match']['in-port']!==undefined){
                       tdmatch2='in port: '+element['match']['in-port'];
                   }
                   output2='order: '+element['instructions']['instruction'][0]['apply-actions']['action'][0]['order']+', <br>'+
                           'OUTPUT ACTIONS: max length: '+element['instructions']['instruction'][0]['apply-actions']['action'][0]['output-action']['max-length']+', '+
                           ' out port: '+element['instructions']['instruction'][0]['apply-actions']['action'][0]['output-action']['output-node-connector'];

                  txt+="<tr><th>"+tdflowID2+"</th><td>"+tdtableID2+"</td><td>"+priority2+"</td><td>"+flowName2+"</td><td>"+tdmatch2+"</td><td>"+output2+"</td></tr>";
                  $('#table-body').append(txt);         
            });                

            }
        });
    });
});