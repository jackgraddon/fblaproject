// Create element on page
let wrapper = document.createElement("div"),
  meta = document.createElement("meta"),
  body = document.querySelector("body"),
  jqsrc = document.createElement("script"),
  topPad;

jqsrc.src = "https://code.jquery.com/jquery-3.6.0.min.js";
jqsrc.id = "jq-for-buynow";
meta.name = "theme-color";
meta.setAttribute("content", "rgb(18,28,36)");
wrapper.classList.add("buywrapper");
wrapper.onclick = closeBuy;

let modal = document.createElement("div");

let url = window.location.href.toString().slice(0, -1);
let slug = url.split("/").pop();
let src = url + "/" + slug + ".png";
modal.style.backgroundImage = `url(${src})`;
modal.classList.add("buyModal");

let container = document.createElement("div");
container.classList.add("textContainer");
let mheader = document.createElement("h1");
let mbody = document.createElement("div");
mbody.classList.add("textgroup");
mheader.innerHTML = "Buy Now";

modal.appendChild(container);
container.appendChild(mheader);
container.appendChild(mbody);

let scroller = function () {
  if (window.innerHeight > window.innerWidth) {
    return;
  } else {
    topPad = window.scrollY + 100;
    if (topPad >= window.outerHeight) {
      return;
    } else {
      modal.style.top = topPad + "px";
    }
  }
};

let completePurchase = function (address, price, size) {
  window.location.href = `../../../../cart/complete/?item=${slug}&price=${price}&size=${size}&address=${address}`;
};

function closeBuy() {
  window.removeEventListener("scroll", scroller);
  gsap.fromTo(
    wrapper,
    0.5,
    { display: "block", opacity: 1, ease: "power2.out" },
    { display: "none", opacity: 0 }
  );
  gsap.fromTo(
    modal,
    0.5,
    { top: topPad, opacity: 1, ease: "power2.out" },
    { top: topPad + 50, opacity: 0 }
  );
  setTimeout(() => {
    body.removeChild(meta);
    body.removeChild(wrapper);
    body.removeChild(modal);
  }, 500);
  body.removeEventListener("keypress", closeBuyKey);
}

var closeBuyKey = function (e) {
  if (e.key === "Escape") {
    closeBuy();
  }
};
function setup() {
  body.appendChild(jqsrc);
}

window.onload = setup();

function buyNow() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  scroller();
  body.appendChild(meta);
  body.appendChild(wrapper);
  body.appendChild(modal);
  body.addEventListener("keypress", closeBuyKey);
  $(function () {
    $(container).load("../../../js/buyNow.html");
  });
  gsap.fromTo(
    wrapper,
    0.5,
    { display: "none", opacity: 0, ease: "power2.out" },
    { display: "block", opacity: 1 }
  );
  gsap.fromTo(
    modal,
    0.5,
    { top: topPad + 50, opacity: 0, ease: "power2.out" },
    { top: topPad, opacity: 1 }
  );
  window.addEventListener("scroll", scroller);
}
