function checkInfo() {
  // This function checks for the user's information
  var firstName = document.getElementById("fname").value;
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  var lastName = document.getElementById("lname").value;
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phone").value;

  // Validate fields
  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    phoneNumber === ""
  ) {
    alert("Please ensure all fields are filled out before submitting.");
    return false;
  } else if (firstName.length < 3) {
    alert("Your first name must contain 3 or more characters");
    return false;
  } else if (lastName.length < 3) {
    alert("Your last name must contain 3 or more characters");
    return false;
  } else if (phoneNumber.length !== 8) {
    alert("Your phone number should have exactly 8 digits");
    return false;
  } else {
    // store the first name to the local storage
    localStorage.setItem("firstName", firstName);
    // Call welcome function
    welcome(firstName, lastName);
    return true;
  }
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

//! fix this function later. make it looks better.
//   ! fix the links in the other pages - create a single css file.
window.onload = function () {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const firstName = localStorage.getItem("firstName");
      if (!firstName) {
        alert("Please register first before accessing this page.");
        event.preventDefault();
        window.location.href = "home.html";
      }
    });
  });

  const firstName = localStorage.getItem("firstName");
  if (firstName) {
    var div = document.getElementById("form-div");
    div.remove();
    document.getElementById("register").textContent = firstName;
    document.getElementById("register").href = "#";
  }
};

function logout() {
  //! delete this function later
  localStorage.removeItem("firstName");
  window.location.reload();
}
