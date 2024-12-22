const NAME_COUNT = "nameCount";
const NAME = "name";

function setNameCount(nameCount){
    localStorage.setItem(NAME_COUNT, nameCount);
}

function getNameCount(){
    let nameCount = nvl(Number(localStorage.getItem(NAME_COUNT)),0);
    if(nameCount === 0){
        setNameCount(nameCount);
    }
    return nameCount;
}

function getName(index){
    return localStorage.getItem(String(NAME+index));
}

function setName(index,name){
    localStorage.setItem(String(NAME+index), name);
}


function getAllNames(){
    let nameCount = getNameCount();
    let resArr = [];
    for (let i = 0; i < nameCount; i++){
        resArr.push(getName(i));
    }
    return resArr;
}

function addNewName(name){
    let nameCount = getNameCount();
    setName(nameCount,name);
    nameCount++;
    setNameCount(nameCount);
    return nameCount;
}

function removeName(index){
    let nameCount = getNameCount();
    if(index >= 0 && index < nameCount){
        nameCount--;
        for(let i = index; i < nameCount; i++){
            setName(i,getName(i+1));
        }
        localStorage.removeItem(NAME+nameCount);
        setNameCount(nameCount);
    }
    return nameCount;
}