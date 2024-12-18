function createNode(name){
	return {name:name, vertexList:[]}
}

function addVertex(node,otherNode){
	node.vertexList.push(otherNode);
	otherNode.vertexList.push(node);
}

function getNames(){
	let namesList = [];
	namesList.push(document.getElementById("name1").value);
	namesList.push(document.getElementById("name2").value);
	namesList.push(document.getElementById("name3").value);
	namesList.push(document.getElementById("name4").value);
	namesList.push(document.getElementById("name5").value);
	return namesList;
}
