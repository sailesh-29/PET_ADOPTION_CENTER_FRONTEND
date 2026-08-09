// login.js — validates the login form and toggles password visibility

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("loginForm");
  var message = document.getElementById("loginMessage");
  var showPassword = document.getElementById("showPassword");
  var passwordField = document.getElementById("loginPassword");

  // Show Password feature — toggles the input type between "password" and "text"
  showPassword.addEventListener("change", function () {
    passwordField.type = showPassword.checked ? "text" : "password";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent default submission until validation passes

    document.getElementById("loginEmailError").textContent = "";
    document.getElementById("loginPasswordError").textContent = "";
    message.className = "form-message";
    message.textContent = "";

    try {
      var email = document.getElementById("loginEmail").value.trim();
      var password = passwordField.value;

      if (email === "") {
        throw { field: "loginEmail", message: "Email address cannot be empty." };
      }
      if (password.length < 8) {
        throw { field: "loginPassword", message: "Password must be at least 8 characters long." };
      }

      message.textContent = "Login successful! Redirecting to your dashboard...";
      message.className = "form-message success show";
      form.reset();
    } catch (err) {
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
