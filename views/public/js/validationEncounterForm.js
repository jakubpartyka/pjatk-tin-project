function validateForm() {
    const time = document.getElementById('time');
    const errorTime = document.getElementById('errorTime');

    let valid = true;

    if (!checkRequired(time.value)) {
        valid = false;
        time.classList.add("error-input");
        errorTime.innerText = "Pole jest wymagane";
    } else if (!checkTimestamp(time.value)) {
        valid = false;
        time.classList.add("error-input");
        errorTime.innerText = "Pole powinno mieć format hh:mm:ss";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummary);

