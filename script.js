document.addEventListener("DOMContentLoaded", () => {
  const rootStyle = getComputedStyle(document.documentElement);
  const radioBgColor = rootStyle.getPropertyValue("--Green-200-lighter");
  const borderColor = rootStyle.getPropertyValue("--Green-600-medium");
  const radioLabelColor = rootStyle.getPropertyValue("--radio-checked-label");

  const radios = document.querySelectorAll("input[name='query-type']");
  const nameInputs = document.querySelectorAll("input[type='text']");
  const emailInput = document.querySelector("input[type='email']");
  const messageInput = document.querySelector("textarea");
  const checkConsent = document.querySelector("input[type='checkbox']");
  const formContainer = document.querySelector("#contact-form");
  const errors = {
    firstNameError: document.getElementById("first-name-error"),
    lastNameError: document.getElementById("last-name-error"),
    emailError: document.getElementById("email-error"),
    queryError: document.getElementById("query-error"),
    messageError: document.getElementById("message-error"),
    consentError: document.getElementById("consent-error"),
  };
  const successMessage = document.querySelector(".success-message");
  // Function to display error message
  const displayError = (element, message) => {
    element.classList.add("show");
    element.textContent = message;
  };
  // Funtion to remove error message
  const clearError = (element) => {
    element.classList.add("show");
    element.textContent = "";
  };
  //Function to add class for duration
  const addTemporaryClass = (element, className, duration) => {
    element.classList.add(className);

    setTimeout(() => {
      element.classList.remove(className);
    }, duration);
  };
  // Function to rest form
  const resetForm = () => {
    formContainer.reset();
    clearRadioBackgrounds();
  };
  // Funtion to remove backgroung color from the radio's label
  const clearRadioBackgrounds = () => {
    radios.forEach((radio) => {
      radio.parentElement.style.backgroundColor = "";
      radio.parentElement.style.border = "";
      radio.parentElement.style.color = "";
    });
  };
  // Change radio label's background color when checked
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      clearRadioBackgrounds();
      if (radio.checked) {
        radio.parentElement.style.backgroundColor = radioBgColor;
        radio.parentElement.style.border = `solid 2px ${borderColor}`;
        radio.parentElement.style.color = radioLabelColor;
      }
    });
  });
  // Funtion to validate name and handle real-time name validation
  const validateName = (input, errorElement) => {
    const namePattern = /^[A-Za-z]+(['-][A-Za-z]+)*$/;
    const name = input.value.trim();

    if (name.length < 2) {
      displayError(errorElement, "This field is required");
      input.classList.add("invalid");
      return false;
    } else if (!namePattern.test(name) || name.length > 50) {
      displayError(errorElement, "Please input a valid name");
      input.classList.add("invalid");
      return false;
    }
    clearError(errorElement);
    input.classList.remove("invalid");
    return true;
  };
  // Function to handle reall-time email validtion
  const validateEmail = () => {
    const emailPattern =
      /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:\\[\x01-\x09\x0b\x0c\x0e-\x7f]|\\[\x01-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]))$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      displayError(errors.emailError, "Please enter a valid email address");
      emailInput.classList.add("invalid");
      return false;
    }
    clearError(errors.emailError);
    emailInput.classList.remove("invalid");
    return true;
  };
  // Funtion to handle query type radio buttons
  const validateQueryType = () => {
    const isSlected = Array.from(radios).some((radio) => radio.checked);
    if (!isSlected) {
      displayError(errors.queryError, "This field is required");
      return false;
    }
    clearError(errors.queryError);
    return true;
  };
  // Function to validate message
  const validateMessage = () => {
    const message = messageInput.value.trim();
    if (message.length < 5 || message.length > 500) {
      displayError(errors.messageError, "Input a valid message");
      return false;
    }
    clearError(errors.messageError);
    return true;
  };
  // Funtion to validate consent checkbox
  const validateConsent = () => {
    const isChecked = checkConsent.checked;
    if (!isChecked) {
      displayError(errors.consentError, "This field is required");
      return false;
    }
    clearError(errors.consentError);
    return true;
  };

  // Function to handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isFormValid = [
      validateName(nameInputs[0], errors.firstNameError),
      validateName(nameInputs[1], errors.lastNameError),
      validateEmail(),
      validateQueryType(),
      validateMessage(),
      validateConsent(),
    ].every(Boolean);

    if (isFormValid) {
      addTemporaryClass(successMessage, "success", 5000);
      resetForm();
    }
  };

  nameInputs.forEach((input, index) => {
    const errorElement =
      index === 0 ? errors.firstNameError : errors.lastNameError;
    input.addEventListener("input", () => {
      validateName(input, errorElement);
    });
  });
  radios.forEach((radio) => {
    radio.addEventListener("change", validateQueryType);
  });
  formContainer.addEventListener("submit", handleFormSubmit);

  emailInput.addEventListener("input", validateEmail);
});
