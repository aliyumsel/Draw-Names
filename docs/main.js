//const NAME_COUNT = "nameCount";
//const NAME = "name";
const FORM_ID = "nameForm";
const INPUT_TEMPLATE = "<input class=\"w3-input w3-border w3-round w3-margin\" type=\"text\" placeholder=\"İsim\" oninput=\"updateForm(#)\" onblur=\"removeIfEmpty(#)\" id=\"name#\" value=\"#\">";
const CHECKBOX_TEMPLATE = "<input class=\"w3-check\" type=\"checkbox\" id=\"#\" name=\"#\" value=\"#\"> <label for=\"#\">#</label>"

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
	showPage(0);
}

function checkboxGenerator(id,value){
	if(value == null){
		value = "";
	}
	return CHECKBOX_TEMPLATE.replace("#",id)
						 .replace("#",id)
						 .replace("#",id)
						 .replace("#",id)
						 .replace("#",value) + "\n";
}

function generateExclusionsForm(){
	let namesArr = getAllNames();
	let nameCount = namesArr.length;
	let formHtml = "";
	for(let i = 0; i < nameCount; i++){
		let name = namesArr[i];
		let otherNames = namesArr.toSpliced(i,1);
		if(i%4===0){
			formHtml = formHtml + "\n<div class=\"w3-row\">"
		}
		formHtml = formHtml +  "\n<div class=\"w3-col m6 l3\">\n<p>" + name + ": </p>";
		for(let j = 0; j < otherNames.length; j++){
			formHtml = formHtml + "\n<div class=\"w3-padding-small\">" + checkboxGenerator("name"+i+j, otherNames[j]) + "</div>" ;
		}
		formHtml = formHtml + "\n</div>"
		if(i%4===3){
			formHtml = formHtml + "\n</div>"
		}
	}
	formHtml = formHtml + "\n"
	document.getElementById("exclusionsForm").innerHTML = formHtml;
	showPage(1);
}

function showPage(number){
	if(number === 0) {
		document.getElementById("nameFormContainer").style = "display:block";
		document.getElementById("exclusionsFormContainer").style = "display:none";
		document.getElementById("results").style = "display:none";
	}
	else if(number === 1) {
		document.getElementById("nameFormContainer").style = "display:none";
		document.getElementById("exclusionsFormContainer").style = "display:block";
		document.getElementById("results").style = "display:none";
	}
	else if(number === 2) {
		document.getElementById("nameFormContainer").style = "display:none";
		document.getElementById("exclusionsFormContainer").style = "display:none";
		document.getElementById("results").style = "display:block";
	}
}

