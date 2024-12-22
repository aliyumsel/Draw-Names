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
