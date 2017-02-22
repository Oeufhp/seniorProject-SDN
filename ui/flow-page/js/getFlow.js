$(document).ready(function(){
    var flowData={};
    var val;
    $('#switch-select').change(function(){
        $('#table-body tr').remove();
        val=$(this).find("option:selected").attr("value");
        console.log(val);
        var flow_url='http://localhost:8181/restconf/operational/opendaylight-inventory:nodes/node/'+val+'/table/0/';
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
                var flowNodes='flow-node-inventory:table';
                var flows=flowData[flowNodes][0].flow;
                console.log(flows);
                var tdflowID,tdtableID,tdmatch,output;
                var len=flows.length;
                var txt='';
                if(len>0){
                    for(i=0;i<len;i++){
                        tdflowID=flows[i]['id'];
                        tdtableID=flows[i]['table_id'];
                        if(flows[i]['match']['ethernet-match']!==undefined){
                            // console.log('ethernet type: '+flows[i]['match']['ethernet-match']['ethernet-type']['type']);
                            tdmatch='ethernet type: '+flows[i]['match']['ethernet-match']['ethernet-type']['type'];
                        }
                        else if(flows[i]['match']['in-port']!==undefined){
                            tdmatch='in port: '+flows[i]['match']['in-port'];
                            // console.log(tdmatch);
                        }
                        if(flows[i]['instructions']!==undefined){
                            // console.log(flows[i]['instructions']['instruction'][0]['apply-actions']['action']);
                            var len1=flows[i]['instructions']['instruction'][0]['apply-actions']['action'].length;
                            // console.log(len1);
                            if(len1>0){
                                for(j=0;j<len1;j++){
                                    // console.log(flows[i]['instructions']['instruction'][0]['apply-actions']['action'][j]);
                                    output='order: '+flows[i]['instructions']['instruction'][0]['apply-actions']['action'][j]['order']+',\n'+
                                            'ACTIONS: '+'\n'+
                                            'out port: '+flows[i]['instructions']['instruction'][0]['apply-actions']['action'][j]['output-action']['output-node-connector'];
                                    // console.log(output);
                                }
                            }
                        }
                        // console.log(flows[i]['match']);
                        txt+="<tr><th>"+tdflowID+"</th><td>"+tdtableID+"</td><td>"+tdmatch+"</td><td>"+output+"</td></tr>";
                        $('#table-body').append(txt);
                    }
                }

            }
        });
    });
});