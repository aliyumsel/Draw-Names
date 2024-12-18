const NAME_COUNT = "nameCount";
const NAME = "name";
const FORM_ID = "nameForm";
const INPUT_TEMPLATE = "<br><input type=\"text\" placeholder=\"İsim\" oninput=\"updateForm()\" onblur=\"removeIfEmpty()\" id=\"name#\" value=\"#\">";

function updateForm(){
	let nameCount = Number(localStorage.getItem(NAME_COUNT));
	let count = 0;
	for (let i = 0; i < nameCount; i++){
		let name = document.getElementById(NAME+i).value;
		localStorage.setItem(NAME+i,name);
		if (name != ""){
			count++;
		}
	}
	if (count === nameCount){
		addNewInput(count);
	}
	
}

function removeIfEmpty(){
	let nameCount = Number(localStorage.getItem(NAME_COUNT));
	let changed = false;
	for (let i = 0; i < nameCount-1; i++){
		let val = localStorage.getItem(NAME+i);
		if(val == ""){
			localStorage.setItem(NAME+i, localStorage.getItem(NAME+(i+1)));
			localStorage.setItem(NAME+(i+1),"");
			changed = true;
		}
	}
	if(changed){
		nameCount--;
		localStorage.removeItem(NAME+nameCount);
		localStorage.setItem(NAME_COUNT,nameCount);
		initExistingForm(nameCount);
	}
}

function inputGenerator(id,value){
	if(value == null){
		value = "";
	}
	return INPUT_TEMPLATE.replace("#",id).replace("#",value) + "\n";
}

function addNewInput(inputNo){
	let nameInput = document.getElementById(NAME+(inputNo-1));
	nameInput.insertAdjacentHTML("afterend",inputGenerator(inputNo));
	localStorage.setItem(NAME_COUNT,inputNo+1);
}

function init(){
	let nameCount = localStorage.getItem(NAME_COUNT);
	if( nameCount == null){
		initNewForm();
	}
	else{
		initExistingForm(Number(nameCount));
	}
}

function initNewForm(){
	let nameCount = 0;
	document.getElementById(FORM_ID).innerHTML = "\n" + inputGenerator(nameCount);
	nameCount++;
	localStorage.setItem(NAME_COUNT,nameCount);
}

function initExistingForm(nameCount){
	let formHtml = "\n";
	for(let i = 0; i < nameCount; i++){
		let name = localStorage.getItem(NAME+i);
		formHtml = formHtml + inputGenerator(i,name);
	}
	document.getElementById(FORM_ID).innerHTML = formHtml;
}


