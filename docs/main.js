const nameCountCookie = "nameCount";
const nameCookie = "name";
const formId = "nameForm";
const cookieExpDayCount = 90;
const inputbegin = "<input type=\"text\" placeholder=\"İsim\" oninput=\"updateForm()\" " 
const inputend = " ><br>";
/*
function draw(){
	let names = getNames();
	let drawList = getNames();

	let resultList = [];
	for(let i = 0; i < names.length; i++){
		let result = {name:names[i],possibleCandidates:names.toSpliced(i,1)};
		resultList.push(result);
	}

	for (let i = 0; i < resultList.length; i++){
		pickCandidate(resultList,i);
		for (let j = i+1; j < resultList.length; j++){
			if(resultList[j].possibleCandidates.length === 1){
				removeNameFromEveryone(resultList,resultList[j].possibleCandidates[0]);
			}
		}
	}

	
	for (let i = 0; i < names.length; i++){
		let pickerName = drawList.shift();
		let pickedIndex = getRndInteger(0,drawList.length);
		let pickedName = drawList.splice(pickedIndex, 1)[0];
		drawList.push(pickerName);
		let result = {pickerName:pickerName, pickedName:pickedName};
		resultList.push(result);
	}

	displayResult(resultList);

}

function pickCandidate(resultList,pickerIndex){
	let pickedIndex = getRndInteger(0,resultList[pickerIndex].possibleCandidates.length);
	let pickedName = resultList[pickerIndex].possibleCandidates[pickedIndex];
	removeNameFromEveryone(resultList,pickedName)
}

function removeNameFromEveryone(resultList,pickedName){
	for(let i = 0; i < resultList.length; i++){
		let x = resultList[i].possibleCandidates.indexOf(pickedName);
		if(x >= 0){
			resultList[i].possibleCandidates.splice(x,1);
		}
	}
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function shuffleList(listToShuffle){
	let tmpList = listToShuffle.slice();
	let resultList = [];
	let i = 0;
	while(i<tmpList.length){
		let pickedIndex = getRndInteger(0,tmpList.length);
		let pickedName = tmpList.splice(pickedIndex, 1)[0];
		if(listToShuffle[i] !== pickedName){

		}
	}

}
/*
function getNames(){
	let namesList = [];
	namesList.push(document.getElementById("name1").value);
	namesList.push(document.getElementById("name2").value);
	namesList.push(document.getElementById("name3").value);
	namesList.push(document.getElementById("name4").value);
	namesList.push(document.getElementById("name5").value);
	return namesList;
}
*/
/*
function displayResult(resultList){
	console.log(resultList);
	let result = "";
	for (let i = 0; i < resultList.length; i++){
		result += resultList[0].PickerName + " --> " + resultList[0].PickedName
	}
	document.getElementById("result").innerText = result;
}
*/

function updateForm(){
	let c = getCookie(nameCountCookie);
	let count = 0;
	for (let i = 0; i < c; i++){
		let name = document.getElementById(nameCookie||i).value;
		if (name !== null || name !== ""){
			setCookie(nameCookie||i,name,cookieExpDayCount);
			count++;
		}
	}
	if (count == c){
		addNewInput(count);
	}
	
}

function addNewInput(inputNo){
	let formHtml = document.getElementById(formId).innerHTML;
	formHtml = formHtml + "\n" + inputbegin + "id=\"name" + inputNo + "\"" + inputend;
	document.getElementById(formId).innerHTML = formHtml;
}

function init(){
	let c = getCookie("nameCount");
	if(c === 0 || c === "" || c === null){
		initNewForm();
	}
	else{
		initExistingForm();
	}
}

function initNewForm(){
	setCookie(nameCountCookie,"0",cookieExpDayCount);
	document.getElementById(formId).innerHTML = inputbegin + "id=\"name0\"" + inputend;
}

function initExistingForm(){
	let count = getCookie(nameCountCookie);
	let formHtml = "";
	for(let i = 0; i < count; i++){
		let name = getCookie(nameCookie+i);
		formHtml = formHtml + "\n" + inputbegin + "id=\"name" + i + "\" value=\"" + name + "\"" + inputend;
	}
	formHtml = formHtml + "\n" + inputbegin + "id=\"name" + i + "\"" + inputend;
	document.getElementById(formId).innerHTML = formHtml;
}

function setCookie(cname, cvalue, exdays = cookieExpDayCount) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}
