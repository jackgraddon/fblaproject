// Create element on page
let wrapper = document.createElement("div"),
  meta = document.createElement("meta"),
  body = document.querySelector("body"),
  topPad;

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
let form = document.createElement("form");
form.innerHTML =
  '<form>     <h3>Billing Address</h3>     <label for="fname">Full Name</label>     <input class="form-input" type="text" id="fname" name="firstname" placeholder="John M. Doe">     <label for="adr">Address</label>     <input class="form-input" type="text" id="adr" name="address" placeholder="542 W. 15th Street">     <label for="city">City</label>     <input class="form-input" type="text" id="city" name="city" placeholder="New York">     <div class="">         <div class="col-50"> <label for="state">State</label> <input type="text" id="state" name="state"                 placeholder="NY"> </div>         <div class="col-50"> <label for="zip">Zip</label> <input type="text" id="zip" name="zip" placeholder="10001">         </div>     </div>     <h3>Payment</h3>     <label for="cname">Name on Card</label>     <input class="form-input" type="text" id="cname" name="cardname" placeholder="John More Doe">     <label for="ccnum">Credit card number</label>     <input class="form-input" type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">     <div class="row">         <label for="expmonth">Exp Month</label>         <input class="form-input" type="text" id="expmonth" name="expmonth" placeholder="September">         <label for="expyear">Exp Year</label>         <input type="text" id="expyear" name="expyear" placeholder="2077">         <label for="cvv">CVV</label>         <input type="text" id="cvv" name="cvv" placeholder="352">     </div>     </div> </form>';
modal.appendChild(container);
container.appendChild(mheader);
container.appendChild(mbody);
mbody.appendChild(form);

let scroller = function () {
  topPad = window.scrollY + 100;
  modal.style.top = topPad + "px";
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
    body.removeChild(modal);
  }, 500);
  body.removeEventListener("keypress", closeBuyKey);
}

var closeBuyKey = function (e) {
  if (e.key === "Escape") {
    closeBuy();
  }
};

function buyNow() {
  body.appendChild(meta);
  body.appendChild(wrapper);
  body.appendChild(modal);
  body.addEventListener("keypress", closeBuyKey);
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
}

window.addEventListener("scroll", scroller);
