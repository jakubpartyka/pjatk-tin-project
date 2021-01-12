const specialCharacters = new RegExp(/^.*[@#?`!';<>{}$].*$/s);


function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    return !(value === "" || value === "type");

}

function checkCharacters(value){
    if (!value)
        return false;
    value = value.toString().trim();
    return !value.match(specialCharacters);
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    return !(min && length < min);
}


function checkDateIfAfter(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    if (!pattern.test(compareTo)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() < compareToDate.getTime()) {
        return false;
    }
    return true;
}


function checkTimestamp(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    return pattern.test(value);
}




