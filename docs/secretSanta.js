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

	console.log(graphNodes);
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

	console.log(minVertexSize);
	console.log(minVerticesIndex);
	return minVerticesIndex;
}

function finalizeSelection(){
	let nodes = generateGraph();
	let listSize = nodes.length;
	for(let i = 0; i < listSize; i++){
		let index = getNodeWithLeastVertices(nodes);
		let selectedIndex = randomInt(nodes[index].vertexList.length);
		let selectedNode = nodes[index].vertexList[selectedIndex];
		nodes[index].selectedNode = selectedNode;
		removeNodeFromEveryone(nodes,selectedNode);
	}
	console.log(nodes);
}
