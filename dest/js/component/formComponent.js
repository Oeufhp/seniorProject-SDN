(function(nx){
    nx.define('formComponent',nx.ui.Component,{
        properties:{
            'switchName':'',
            'inPortValue':'',
            'outPortValue':''
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
                                                class:'form-group col-md-3',
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
                                                class:'form-group col-md-3',
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
                                                class:'form-group col-md-3',
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
                                                        class:'btn btn-default',
                                                        style:' width:120px;',
                                                        form:'addFlowForm'
                                                    },
                                                    events:{
                                                        'click':'{#addFlow}'
                                                    }
                                                }
                                            ],
                                            props:{
                                                class:'form-group col-md-3',
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
                var switchID=this.switchName;
                var i=1;
                var iport=this.inPortValue;
                var oport=this.outPortValue;
                var url='http://<controller-ip>:8181/restconf/config/opendaylight-inventory:nodes/node/'+switchID+'table/0/flow/'+i;
                var flowBody="<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>"+
                                "<flow xmlns=\"urn:opendaylight:flow:inventory\">";

                $.ajax({

                });
            }
        }
    });
})(nx);