function validateForm() {
    console.log("validating camera form");

    const alias = document.getElementById('alias');
    const errorAlias = document.getElementById('errorAlias');
    let valid = true;

    if (!checkRequired(alias.value)) {
        valid = false;
        alias.classList.add("error-input");
        errorAlias.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(alias.value, 2, 30)) {
        valid = false;
        alias.classList.add("error-input");
        errorAlias.innerText = "Pole powinno zawierać od 2 do 30 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummary);

