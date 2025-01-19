function isEmpty(value){
    if (value === null || value === undefined || value === "" || value === NaN){
        return true;
    }
    return false;
}

function nvl(value, nullValue){
    if (isEmpty(value)){
        return nullValue;
    }
    return value;
}

function randomInt(listSize){
    if(listSize <= 0){
        return -1;
    }
    return Math.floor(listSize*Math.random());
}
