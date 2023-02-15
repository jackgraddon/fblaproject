const body = document.querySelector("body");

// Get the accessibility settings from a stored browser cookie, or set the default values
var accessibility = Cookies.get("accessibility");
if (accessibility == "") {
  accessibility = "0";
  Cookies.set("accessibility", accessibility);
}

// Create accessibility button and add it to the page
var accessibilityButton = document.createElement("div");
accessibilityButton.id = "accessibility";
accessibilityButton.innerHTML = '<i class="bi bi-universal-access-circle"></i>';
try {
  //   body.appendChild(accessibilityButton);
  body.insertBefore(accessibilityButton, body.firstChild);
} catch (e) {
  console.log("Accessibility button not added to page", e);
}

// Set the accessibility settings on page load
document.addEventListener("DOMContentLoaded", function () {
  if (accessibility == "2") {
    // Enable accessibility styles if the cookie is set to 2
    body.classList.add("accessibility");
    body.classList.add("high-contrast");
  } else if (accessibility == "1") {
    // Enable accessibility styles if the cookie is set to 1
    body.classList.add("accessibility");
  } else {
    // Disable accessibility styles if the cookie is set to 0
    body.classList.remove("accessibility");
  }
});

// Set the accessibility settings on click of the accessibility button
document.querySelector("#accessibility").addEventListener("click", function () {
  if (accessibility == "0") {
    // Enable accessibility styles if the cookie is set to 0, and set to 1
    accessibility = "1";
    Cookies.set("accessibility", accessibility);
    body.classList.add("accessibility");
  } else if (accessibility == "1") {
    // Enable high contrast accessibility styles if the cookie is set to 1, and set to 2
    accessibility = "2";
    Cookies.set("accessibility", accessibility);
    body.classList.add("accessibility");
    body.classList.add("high-contrast");
  } else if (accessibility == "2") {
    // Disable accessibility styles if the cookie is set to 2, and set to 0
    accessibility = "0";
    Cookies.set("accessibility", accessibility);
    body.classList.remove("accessibility");
    body.classList.remove("high-contrast");
  } else {
    // Disable accessibility styles if no accessibility value is set or if it is set to something else
    accessibility = "0";
    Cookies.set("accessibility", accessibility);
    body.classList.remove("accessibility");
    body.classList.remove("high-contrast");
  }
});
