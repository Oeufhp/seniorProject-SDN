$('#addFlow-btn1').click(function(e){
           console.log('add flow via in port and out port');
            var switchID1=$('#input-switch-id1').val().trim();
            var tableID1=$('#input-table-id1').val().trim();
            var flowID1=$('#input-flow-id1').val().trim();
            var flowName1=$('#input-flow-name1').val().trim();
            var inPort=$('#input-in-port').val().trim();
            var outPort=$('#input-out-port').val().trim();
            var installHw=$('#insHw-opt').find("option:selected").attr("value");
            var priority=$('#input-priority').val().trim();
            console.log('switchID: '+switchID1+' '+'tableID: '+tableID1+' '+'flowID: '+flowID1+' flowName: '+flowName1+' inPort: '+inPort+' outPort: '+outPort+' installHw: '+installHw+' priority: '+priority);
            if(switchID1==''|| tableID1==''||flowID1==''||flowName1==''||inPort==''||outPort==''||installHw==null||priority==''){
               toastr['warning']('Please fill all of the forms');
            }
            else if(inPort===outPort){
                toastr['warning']('In port and out port should not be the same');
            }
            else if(switchID1!==inPort.substring(0,inPort.length-2)&&switchID1!==outPort.substring(0,outPort.length-2)){
                toastr['error']('The port(s) are not belong to switch');
            }
            else{
            var putURL1='http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/'+switchID1+'/table/'+tableID1+'/flow/'+flowID1;
            var flowBody1="<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<flow xmlns=\"urn:opendaylight:flow:inventory\">\n  <priority>"+priority+"</priority>\n  <id>"+flowID1+"</id>\n  <table_id>"+tableID1+"</table_id>\n  <installHw>"+installHw+"</installHw>\n  <flow-name>"+flowName1+"</flow-name>\n  <match>\n    <in-port>"+inPort+"</in-port>\n  </match>\n  <instructions>\n    <instruction>\n      <order>0</order>\n      <apply-actions>\n        <action>\n          <order>0</order>\n          <output-action>\n            <output-node-connector>"+outPort+"</output-node-connector>\n            <max-length>60</max-length>\n          </output-action>\n        </action>\n      </apply-actions>\n    </instruction>\n  </instructions>\n</flow>";
               console.log(flowBody1);             
               $.ajax({
                    url:putURL1,
                    method:"PUT",
                    crossDomain: true,
                    dataType:'xml',
                    data:flowBody1,
                    headers: {
                       "authorization": "Basic YWRtaW46YWRtaW4=",
                       "content-type": "application/xml",
                       "accept": "application/json",
                    },
                    success:function(data){
                        console.log('add flow complete');
                        toastr['success']('Adding flow complete');
                        toastr.options = {
                            "closeButton": false,
                            "debug": false,
                            "newestOnTop": false,
                            "progressBar": false,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": false,
                            "onclick": null,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "3000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        }
                    },
                     error:function(xhr){
                        console.error(xhr.status);
                        if(xhr.status==400){
                            toastr['warning']('bad request');
                        }    
                     }
                });
            }  
});
// $('#addFlow-btn2').click(function(e){
//         console.log('add flow!!');
//         var switchID2=$('#input-switch-id2').val().trim();
//         var tableID2=$('#input-table-id2').val().trim();
//         var flowID2=$('#input-flow-id2').val().trim();
//         var flowName2=$('#input-flow-name2').val().trim();
//         var ipSrc=$('#input-ip-src').val().trim();
//         var ipDest=$('#input-ip-dest').val().trim();
//         console.log('switchID: '+switchID2+' '+'tableID: '+tableID2+' '+'flowID: '+flowID2+' flowName: '+flowName2+' ipSrc: '+ipSrc+' ipDest: '+ipDest);
//         var putURL2='http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/'+switchID2+'/table/'+tableID2+'/flow/'+flowID2;
//         var flowBody2="<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<flow xmlns=\"urn:opendaylight:flow:inventory\">\n    <strict>false</strict>\n    <instructions>\n        <instruction>\n            <order>0</order>\n            <apply-actions>\n                <action>\n                    <order>0</order>\n                    <dec-mpls-ttl/>\n                </action>\n            </apply-actions>\n        </instruction>\n    </instructions>\n    <table_id>"+tableID2+"</table_id>\n    <id>"+flowID2+"</id>\n    <cookie_mask>255</cookie_mask>\n    <match>\n        <ethernet-match>\n            <ethernet-type>\n                <type>34887</type>\n            </ethernet-type>\n        </ethernet-match>\n        <ipv4-source>192.168.40.0/24</ipv4-source>\n        <ipv4-destination>192.168.30.0/24</ipv4-destination>\n        <in-port>2</in-port>\n    </match>\n    <hard-timeout>12</hard-timeout>\n    <cookie>5</cookie>\n    <idle-timeout>34</idle-timeout>\n    <flow-name>test1</flow-name>\n    <priority>2</priority>\n    <barrier>false</barrier>\n</flow>";
//         console.log(flowBody2);             
//         $.ajax({
//             url:putURL2,
//             method:"PUT",
//             crossDomain: true,
//             dataType:'xml',
//             data:flowBody2,
//             headers: {
//                 "authorization": "Basic YWRtaW46YWRtaW4=",
//                 "content-type": "application/xml",
//                 "accept": "application/json",
//             },
//              success:function(data){
//                  console.log('add flow complete');
//              },
//              error:function(data){
//                   console.error(data.status);
//              }
//           });
// });
$('#delete-btn').click(function(){
                if($('#input-table-id3').val().trim()==='' || $('#switch-select').find("option:selected").attr("value")===''){
                    toastr['warning']('Please specify the table\'s ID and/or switch\'s ID','Warning');
                }
                else{
                    $('.modal').addClass('is-active');
                    $('#confirm-delete-btn').click(function(){
                        $('.modal').removeClass('is-active');
                        var did=$('#input-table-id3').val().trim();
                        var swid=$('#switch-select').find("option:selected").attr("value");
                        console.log('table id: '+ did+' '+'switch id: '+swid); 
                        var delete_url="http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/"+swid+"/table/"+did;
                        $.ajax({
                            url:delete_url,
                            method:'DELETE',
                            crossDomain:true,
                            headers:{
                                "authorization": "Basic YWRtaW46YWRtaW4=",
                                "content-type": "application/json",
                                "accept": "application/json",
                            },
                            success:function(data){
                                toastr['success']('delete flow from table'+did+' of switch '+swid+' complete');
                            },
                            error:function(xhr){
                                console.log(xhr.status);
                                if(xhr.status==404){
                                    toastr['error']('table '+did+' of switch '+swid+' has been deleted','Delete failed');
                                    toastr['warning']('You cannot delete flows that are generated from L2switch module from ODL','Warning');
                                }
                            }
                        });
                    });
                 }   
                $('#cancel-btn').click(function(){
                    $('.modal').removeClass('is-active');
                });
            });