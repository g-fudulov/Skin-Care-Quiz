// function fetchProducts() {
//   return fetch("GET", "https://jeval.com.au/collections/hair-care/products.json?page=1")
//   .then(promise => promise.json)
//   .then(data => data.products);
// }

async function fetchProducts() {
  const response = await fetch("https://jeval.com.au/collections/hair-care/products.json?page=1");
  const data = await response.json();
  return data.products // array with objects;
}

export default fetchProducts;