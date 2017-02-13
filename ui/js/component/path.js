var pathHops=[
    "openflow:1",
    "openflow:2"
];

function getLinkList(topology, nodesDict, pathHops){

    var linkList = [];

    for(var i = 0; i < pathHops.length - 1; i++){

        var srcNode = nodesDict.getItem(pathHops[i]);
        var destNode = nodesDict.getItem(pathHops[i + 1]);

        var links = getLinksBetweenNodes(topology, srcNode, destNode);

        linkList.push(links[0]);
    }

    return linkList;
}

function getLinksBetweenNodes(topo, src, dest){

    var linkSet = topo.getLinkSet(src.id(), dest.id());
    if (linkSet !== null) {
        return nx.util.values(linkSet.links());
    }
    return false;
}