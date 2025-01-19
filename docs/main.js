//const NAME_COUNT = "nameCount";
//const NAME = "name";
const FORM_ID = "nameForm";
const INPUT_TEMPLATE = "<br><input type=\"text\" placeholder=\"İsim\" oninput=\"updateForm(#)\" onblur=\"removeIfEmpty(#)\" id=\"name#\" value=\"#\">";

function updateForm(index){
	let nameCount = getNameCount();
	let name = document.getElementById(NAME+index).value;

	if(index == nameCount){
		nameCount = addNewName(name);
		addNewInput(nameCount);
	}
	else{
		setName(index,name);
	}
}

function removeIfEmpty(index){
	let nameCount = getNameCount();
	let name = document.getElementById(NAME+index).value;
	if(isEmpty(name)){
		removeName(index);
		init();
	}
}

function inputGenerator(id,value){
	if(value == null){
		value = "";
	}
	return INPUT_TEMPLATE.replace("#",id)
						 .replace("#",id)
						 .replace("#",id)
						 .replace("#",value) + "\n";
}

function addNewInput(inputNo){
	let nameInput = document.getElementById(NAME+(inputNo-1));
	nameInput.insertAdjacentHTML("afterend",inputGenerator(inputNo));
}

function init(){
	let namesArr = getAllNames();
	let nameCount = namesArr.length;
	let formHtml = "\n";
	for(let i = 0; i < nameCount; i++){
		formHtml = formHtml + inputGenerator(i,namesArr[i]);
	}
	formHtml = formHtml + inputGenerator(nameCount,"");
	document.getElementById(FORM_ID).innerHTML = formHtml;
}
