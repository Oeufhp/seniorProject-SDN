(function(nx){
    nx.define('formComponent',nx.ui.Component,{
        properties:{
            'switchName':'',
            'inPortValue':'',
            'outPortValue':'',
            'flowName':'',
            'tableID':'',
            'flowID':''
        },
        view:{
            content:[
                {
                    tag:'div',
                    content:[
                        {
                            tag:'form',
                            content:[
                                {
                                    tag:'div',
                                    content:[
                                        {
                                            tag:'div',
                                            content:[
                                                {
                                                    tag:'label',
                                                    content:'switch-ID',
                                                    props:{
                                                        for:'input-switch-name'
                                                    }
                                                },
                                                {
                                                    tag:'input',
                                                    props:{
                                                        value:'{#switchName}',
                                                        type:'text',
                                                        class:'form-control',
                                                        id:'input-switch-name'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-2',
                                                style:'margin-left:10px;'
                                            }
                                        },
                                        {
                                            tag:'div',
                                            content:[
                                                {
                                                    tag:'label',
                                                    content:'flow name',
                                                    props:{
                                                        for:'input-flow-name'
                                                    }
                                                },
                                                {
                                                    tag:'input',
                                                    props:{
                                                        value:'{#flowName}',
                                                        type:'text',
                                                        class:'form-control',
                                                        id:'input-flow-name'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-2',
                                                style:'margin-left:10px;'
                                            }
                                        },
                                        {
                                            tag:'div',
                                            content:[
                                                {
                                                    tag:'label',
                                                    content:'table-ID',
                                                    props:{
                                                        for:'input-table-ID'
                                                    }
                                                },
                                                {
                                                    tag:'input',
                                                    props:{
                                                        value:'{#tableID}',
                                                        type:'text',
                                                        class:'form-control',
                                                        id:'input-table-ID'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-2',
                                                style:'margin-left:10px;'
                                            }
                                        },
                                        {
                                            tag:'div',
                                            content:[
                                                {
                                                    tag:'label',
                                                    content:'flow-ID',
                                                    props:{
                                                        for:'input-flow-ID'
                                                    }
                                                },
                                                {
                                                    tag:'input',
                                                    props:{
                                                        value:'{#flowID}',
                                                        type:'text',
                                                        class:'form-control',
                                                        id:'input-flow-ID'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-2',
                                                style:'margin-left:10px;'
                                            }
                                        },
                                        {
                                            tag:'div',
                                            content:[
                                                {
                                                    tag:'label',
                                                    content:'in-port',
                                                    props:{
                                                        for:'input-inport'
                                                    }
                                                },
                                                {
                                                    tag:'input',
                                                    props:{
                                                        value:'{#inPortValue}',
                                                        type:'text',
                                                        class:'form-control',
                                                        id:'input-inport'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-2',
                                                style:'margin-left:10px;'
                                            }
                                        },
                                        {
                                            tag:'div',
                                            content:[
                                                {
                                                    tag:'label',
                                                    content:'out-port',
                                                    props:{
                                                        for:'input-output'
                                                    }
                                                },
                                                {
                                                    tag:'input',
                                                    props:{
                                                        value:'{#outPortValue}',
                                                        type:'text',
                                                        class:'form-control',
                                                        id:'input-outport'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-2',
                                                style:'margin-left:10px;'
                                            }
                                        },
                                        {
                                            tag:'div',
                                            content:[
                                                {
                                                    tag:'button',
                                                    content:'add flow',
                                                    props:{
                                                        type:'submit',
                                                        class:'btn btn-info',
                                                        style:' width:120px;',
                                                        form:'addFlowForm'
                                                    },
                                                    events:{
                                                        'click':'{#addFlow}'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-2',
                                                style:'margin-left:10px; margin-top:22px;'
                                            }
                                        },
                                    ],
                                    props:{
                                        class:'row',
                                        style:'width:100%;'
                                    }
                                }
                            ],
                            props:{
                                class:'form-horizontal',
                                id:'addFlowForm'
                            }
                        }
                    ],
                    props:{
                        class:'container',
                        style:'width:100%;'
                    }
                }   
            ]
        },
        props:{},
        method:{
            'addFlow':function(){
                console.log('add flow is clicked');
                var switchID=this.switchName;
                var flowname=this.flowName;
                var tableID=this.tableID;
                var flowID=this.flowID;
                var iport=this.inPortValue;
                var oport=this.outPortValue;
                console.log(switchID+' '+flowname+' '+' '+flowID+' '+iport+' '+oport);
                var putURL='http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/'+switchID+'table/'+tableID+'/flow/'+flowID;
                var flowBody="<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>"+
                                "<flow xmlns=\"urn:opendaylight:flow:inventory\">"+
                                    '<priority>700</priority>'+
                                    '<id>'+flowID+'</id>'+
                                    '<table_id>'+tableID+'</table_id'+
                                    '<installHw>true</installHw>'+
                                    '<flow-name>'+flowname+'</flow-name>'+
                                    '<match>'+
                                        '<in-port>'+iport+'</in-port>'+
                                    '</match>'+
                                    '<instructions>'+
                                        '<instruction>'+
                                            '<order>0</order>'+
                                            '<apply-action>'+
                                                    '<action>'+
                                                        '<order>0</order>'+
                                                        '<output-action>'+
                                                            '<output-node-connector>'+oport+'</output-node-connector>'+
                                                            '<max-length>60</max-length>'+
                                                        '</output-action>'+
                                                    '</action>'+
                                            '</apply-actions>'+
                                        '</instruction>'+
                                    '</instructions>'+
                                 '</flow>';

                // $.ajax({
                //     url:putURL,
                //     method:"POST",
                //     crossDomain: true,
                //     dataType:'json',
                //     data:flowBody,
                //     headers: {
                //         "authorization": "Basic YWRtaW46YWRtaW4=",
                //         "content-type": "application/xml",
                //         "accept": "application/json",
                //     },
                //     success:function(data){
                //         console.log('add flow complete');
                //     }
                // });
            }
        }
    });
})(nx);