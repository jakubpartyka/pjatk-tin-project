function validateForm() {
    const time = document.getElementById('time');
    const registration = document.getElementById('Car_registration');

    const errorTime = document.getElementById('errorTime');
    const errorRegistration = document.getElementById('errorRegistration');

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

    if (!checkRequired(registration.value)) {
        valid = false;
        time.classList.add("error-input");
        errorTime.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(registration.value,4,10)) {
        valid = false;
        time.classList.add("error-input");
        errorRegistration.innerText = "Pole powinno mieć zawierać od 4 do 10 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummary);

