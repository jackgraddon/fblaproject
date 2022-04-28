function getAccessibility() {
  // Get the accessibility settings from a stored browser cookie
  var accessibility = getCookie("accessibility");
  if (accessibility == "") {
    accessibility = "0";
  }
  return accessibility;
}
