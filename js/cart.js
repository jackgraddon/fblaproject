let data;
let cart = {
  cart: 0,
  items: {},
};

// function emptyCart(file) {
//   let i;
//   return i;
// }

function setup(url) {
  data = JSON.parse(localStorage.getItem("cart"));
  console.log("Data", data);
  if (data == null) {
    data = cart;
  } else if (JSON.stringify(data) == JSON.stringify(cart)) {
    data = cart;
  }
  console.log("Cart", JSON.stringify(cart), cart);
  console.log("Data", JSON.stringify(data), data);
  localStorage.setItem("cart", JSON.stringify(data));
}
