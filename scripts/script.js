function checkInfo() {
  // This function checks for the user's information
  let firstName = document.getElementById("fname").value;
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1); // Capitalize the first name
  let lastName = document.getElementById("lname").value;
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1); // Capitalize the last name
  let email = document.getElementById("email").value;
  let validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  let phoneNumber = document.getElementById("phone").value;
  let validPhone = /^\d{8}$/.test(phoneNumber);

  // Get the error divs
  let firstNameError = document.getElementById("fname-error");
  let lastNameError = document.getElementById("lname-error");
  let emailError = document.getElementById("email-error");
  let phoneError = document.getElementById("phone-error");

  // Clear previous error messages
  firstNameError.innerHTML = "";
  lastNameError.innerHTML = "";
  emailError.innerHTML = "";
  phoneError.innerHTML = "";

  let valid = true; //To check if the suer enters right information 
  // Validate fields
  if (firstName === "" || lastName === "" || email === "" || phoneNumber === "") {
    alert("Please ensure all fields are filled out before submitting.");
    return false;
  }
  if (firstName.length < 3) {
    firstNameError.innerHTML = "Your first name must contain 3 or more characters.";
    valid = false;
  }
  if (lastName.length < 3) {
    lastNameError.innerHTML = "Your last name must contain 3 or more characters.";
    valid = false;
  }
  if (!validPhone) {
    phoneError.innerHTML = "Your phone number should have exactly 8 digits.";
    valid = false;
  }
  if (!validEmail) {
    emailError.innerHTML = "Please enter a valid email address.";
    valid = false;
  }

  if (valid) {
    // Store the first name to localStorage
    localStorage.setItem("firstName", firstName);
    // Call welcome function
    welcome(firstName, lastName);
    return true;
  }
  return false; //Prevent form submission if the user did not enters correct information 
}

function welcome(first, last) {
  // This function is used to welcome the user after successful registration.
  alert(
    "Welcome, " +
      first +
      " " +
      last +
      "!" +
      "\nYou have successfully completed your registration."
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const firsName = localStorage.getItem("firstName");
  //If the user is not registered and he is not in home page, redirect it to home page.
  if (!firsName && document.title != "Home") {
    window.location.href = "home.html";
  }

  // Check if the user is registered before navigating
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const firstName = localStorage.getItem("firstName");
      if (!firstName) {
        alert("Please register first before accessing this page.");
        event.preventDefault(); // Prevent navigation
        window.location.href = "home.html"; // Redirect to home page
      }
    });
  });

  const firstName = localStorage.getItem("firstName");
  if (firstName) {
    // If the first name exists
    const div = document.getElementById("form-div");
    if (div) {
      div.remove();
    } // Only remove form-div if it exists

    const registerElement = document.getElementById("register");
    if (registerElement) {
      registerElement.textContent = firstName; // Set the text to firstName
      registerElement.href = "#"; // Disable the link (optional)
    }
  }
});

function logout() {
  // This function logs the uer out
  const confirmation = window.confirm("Are you sure you want to log out?"); //Ask the user for confirmation
  // If true
  if (confirmation) {
    localStorage.removeItem("firstName");
    window.location.reload();
  }
}

function feedbackThanks() {
  var feedback = document.getElementById("feedback").value.trim();

  // Check if the feedback is empty
  if (feedback === "") {
    alert("Please enter your feedback first.");
    return;
  }

  // Thank the user for their feedback
  alert("Thank you for your feedback!");
  window.location.reload();
}
