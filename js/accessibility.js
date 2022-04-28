const body = document.querySelector("body");

// Get the accessibility settings from a stored browser cookie, or set the default values
var accessibility = Cookies.get("accessibility");
if (accessibility == "") {
  accessibility = "0";
  Cookies.set("accessibility", accessibility);
}

// Create accessibility button and add it to the page
var accessibilityButton = document.createElement("p");
accessibilityButton.id = "accessibility";
accessibilityButton.innerHTML = '<i class="fa-solid fa-universal-access"></i>';
try {
  body.appendChild(accessibilityButton);
} catch (e) {
  console.log("Accessibility button not added to page", e);
}

// Set the accessibility settings on page load
document.addEventListener("DOMContentLoaded", function () {
  if (accessibility == "1") {
    // Enable accesibility styles if the cookie is set to 1
    body.classList.add("accessibility");
  } else {
    // Disable accessibility styles if the cookie is set to 0
    body.classList.remove("accessibility");
  }
});

// Toggle the accessibility settings on click of the accessibility button
document.querySelector("#accessibility").addEventListener("click", function () {
  if (accessibility == "1") {
    accessibility = "0";
    Cookies.set("accessibility", accessibility);
    body.classList.remove("accessibility");
  } else {
    accessibility = "1";
    Cookies.set("accessibility", accessibility);
    body.classList.add("accessibility");
  }
});
