function createNode(name){
	return {name:name, vertexList:[]}
}

function addVertex(node,otherNode){
	node.vertexList.push(otherNode);
	otherNode.vertexList.push(node);
}

function generateGraph(){
	let namesList = getAllNames();
	let graphNodes = [];
	for(let i = 0; i < namesList.length; i++){
		graphNodes.push(createNode(namesList[i]));
		for(let j = 0; j < i; j++){
			graphNodes[j].vertexList.push(graphNodes[i]);
			graphNodes[i].vertexList.push(graphNodes[j]);
		}
	}

	console.log(graphNodes);

}
