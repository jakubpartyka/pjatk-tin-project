function validateForm() {
    const time = document.getElementById('time');
    const registration = document.getElementById('Car_registration');
    const cameraId = document.getElementById('Camera_id');

    const errorTime = document.getElementById('errorTime');
    const errorRegistration = document.getElementById('errorRegistration');
    const errorCamera = document.getElementById('errorCamera');

    let valid = true;


    if (!checkRequired(registration.value)) {
        valid = false;
        registration.classList.add("error-input");
        errorRegistration.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(registration.value,2,10)) {
        valid = false;
        registration.classList.add("error-input");
        errorRegistration.innerText = "Pole powinno mieć zawierać od 4 do 10 znaków";
    }

    if (!checkRequired(cameraId.value)) {
        valid = false;
        cameraId.classList.add("error-input");
        errorCamera.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(time.value)) {
        valid = false;
        time.classList.add("error-input");
        errorTime.innerText = "Pole jest wymagane";
    } else if (!checkTimestamp(time.value)) {
        valid = false;
        time.classList.add("error-input");
        errorTime.innerText = "Pole powinno mieć format yyyy-mm-dd hh:mm:ss";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorsSummary);

