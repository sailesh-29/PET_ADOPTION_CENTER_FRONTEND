// register.js — validates the adopter registration form on submit

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("registerForm");
  var message = document.getElementById("formMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop default submission so validation runs first

    // clear old errors
    ["name", "adopterId", "email", "phone", "dob", "password", "petType"].forEach(function (id) {
      var el = document.getElementById(id + "Error");
      if (el) el.textContent = "";
    });
    message.className = "form-message";
    message.textContent = "";

    try {
      var name = document.getElementById("name").value.trim();
      var adopterId = document.getElementById("adopterId").value.trim();
      var email = document.getElementById("email").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var dob = document.getElementById("dob").value;
      var password = document.getElementById("password").value;
      var petType = document.getElementById("petType").value;
      var gender = document.querySelector('input[name="gender"]:checked');
      var agreeTerms = document.getElementById("agreeTerms").checked;

      if (name === "") {
        throw { field: "name", message: "Full name is required." };
      }
      if (adopterId === "") {
        throw { field: "adopterId", message: "Adopter ID is required." };
      }
      if (email === "" || !email.includes("@")) {
        throw { field: "email", message: "A valid email address is required." };
      }
      if (!/^[0-9]{10}$/.test(phone)) {
        throw { field: "phone", message: "Phone number must be exactly 10 digits." };
      }
      if (dob === "") {
        throw { field: "dob", message: "Date of birth is required." };
      }
      if (password.length < 8) {
        throw { field: "password", message: "Password must be at least 8 characters long." };
      }
      if (petType === "") {
        throw { field: "petType", message: "Please select a preferred pet type." };
      }
      if (!gender) {
        throw { field: "gender", message: "Please select a gender." };
      }
      if (!agreeTerms) {
        throw { field: "agreeTerms", message: "You must agree to the terms to register." };
      }

      // If we reach here, all fields passed validation
      var formData = {
        name: name,
        adopterId: adopterId,
        email: email,
        phone: phone,
        dob: dob,
        petType: petType,
        gender: gender.value,
      };

      console.log("Registration data ready to submit:", JSON.stringify(formData, null, 2));

      message.textContent = "Registration successful! Welcome to Paw & Ledger, " + name + ".";
      message.className = "form-message success show";
      form.reset();
    } catch (err) {
      // report the validation error next to the relevant field
      var errorEl = document.getElementById(err.field + "Error");
      if (errorEl) {
        errorEl.textContent = err.message;
      } else {
        message.textContent = err.message;
        message.className = "form-message error show";
      }
    }
  });
});
