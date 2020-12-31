function validateForm() {
    const registration = document.getElementById('registration');
    const type = document.getElementById('type');
    const color = document.getElementById('color');

    const errorRegistration = document.getElementById('errorRegistration');
    const errorType = document.getElementById('errorType');
    const errorColor = document.getElementById('errorColor');
    const errorsSummary = document.getElementById('errorsSummary');

    let valid = true;

    if (!checkRequired(registration.value)) {
        valid = false;
        registration.classList.add("error-input");
        errorRegistration.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(registration.value, 4, 10)) {
        valid = false;
        registration.classList.add("error-input");
        errorRegistration.innerText = "Pole powinno zawierać od 4 do 10 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummary);

