function createNode(index,name){
	return {index: index, name:name, vertexList:[]}
}

function addVertex(node,otherNode){
	node.vertexList.push(otherNode);
	otherNode.vertexList.push(node);
}

function removeVertex(nodeToRemove, vertexList){
	for(let i = 0; i < vertexList.length; i++){
		if(vertexList[i].index == nodeToRemove.index){
			vertexList.splice(i,1);
			break;
		}
	}
}

function generateGraph(){
	let namesList = getAllNames();
	let graphNodes = [];
	for(let i = 0; i < namesList.length; i++){
		graphNodes.push(createNode(i,namesList[i]));
		for(let j = 0; j < i; j++){
			addVertex(graphNodes[i],graphNodes[j]);
		}
	}

	return graphNodes;

}

function removeNodeFromEveryone(nodes, nodeToRemove){
	for(let i = 0; i < nodes.length;i++){
		removeVertex(nodeToRemove,nodes[i].vertexList);
	}
} 

function getNodeWithLeastVertices(nodes){
	let minVertexSize = -1;
	let minVerticesIndex;
	for(let i = 0; i < nodes.length; i++){
		if(isEmpty(nodes[i].selectedNode)){
			if(minVertexSize == -1 || nodes[i].vertexList.length < minVertexSize){
				minVertexSize = nodes[i].vertexList.length;
				minVerticesIndex = i;
			}
		} 
	}

	return minVerticesIndex;
}

function finalizeSelection(){
	let nodes = generateGraph();
	for(let i = 0; i < nodes.length; i++){
		let index = getNodeWithLeastVertices(nodes);
		let selectedIndex = randomInt(nodes[index].vertexList.length);
		let selectedNode = nodes[index].vertexList[selectedIndex];
		nodes[index].selectedNode = selectedNode;
		removeNodeFromEveryone(nodes,selectedNode);
	}
	document.getElementById("result").innerHTML = visualize(nodes);
}

function visualize(nodes){
	let result = "";
	for(let i = 0; i < nodes.length; i++){
		result = result + nodes[i].name + "-->" + nodes[i].selectedNode.name + "<br>\n";
	}
	return result;
}
