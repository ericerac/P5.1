
// Grap the DOM items
let productName = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let image = document.querySelector(".item__img");
let color = document.querySelector("#colors");
let colorValue = color.options.value;

// grap the button "ajouter"
let AddToCartBtn = document.querySelector("#addToCart");

// Retrieve the product Id from URL

 const urlData = window.location.search;
 
 const productSelectId = new URLSearchParams(urlData).get(`id`);

 console.log(productSelectId);
//-----------

let cart = [];
let productSelect=[];

// Request Get to retireve the data product selected from API
const productsTab = fetch("http://localhost:3000/api/products?id=${productSelectId}");
 
productsTab
.then(response => {
    if(response.ok){
        response.json()
    .then(productsTabData => {
    
        console.log(productsTabData);
         productSelect = productsTabData.find((a)=> a._id === productSelectId);
        console.log(productSelect);
        
       display(productSelect)
    } 

)}
else {
    alert("Erreur lors de la requête")
}
}).catch((e) =>{
    alert(e)
});
// Display the product in the DOM
const display = (productSelect) => {
    image.innerHTML = `<img src="${productSelect.imageUrl}" alt = "${productSelect.altTxt}">` ;   
    price.textContent = productSelect.price;
    productName.textContent = productSelect.name;
    description.textContent = productSelect.description;

    let colorsInsert = "";
    for (let col of productSelect.colors) {
        colorsInsert += `<option value="${col}">${col}</option>`
    };
    color.innerHTML = colorsInsert;

}

console.log(productSelectId);
// Retrieve value quantity
ProductSelectquantity = document.querySelector("#quantity").value;

// ---------------- Management Cart -------------------

// add the product to the localStorage ( Id, Color, Quantity)
function saveCart(cart) {
    localStorage.setItem("panier" , JSON.stringify(cart));
};
console.log(cart);

    // function get cart 
function  getCart() {
 cart = localStorage.getItem("panier");
  if ( cart === null){
      return [];
  }else{
  return JSON.parse(cart);
  }
};

    // function add to cart
function addCart(product){
       
     let cart = getCart();
    
    console.log(cart)
     let productFind = cart.find(p => p.id == product.id && p.color == product.color);
     console.log(product);
     console.log(productFind);
     if (product.quantity > 100 ){
        alert("Pour les commandes supèrieures a 100 unités, veuillez contactez notre service reservé aux proffessionnels afin de profiter de tarifs préférenciels."); 
        return  false; 
    }
     // Verification if the product exists, if true, taking only the quantity
     if(productFind != undefined){
        productFind.quantity = Number(productFind.quantity) + Number(product.quantity);
        console.log(productFind);        
         } else{
            cart.push(product)
        }    
      saveCart(cart);
}

    // remove the product of cart.
function removeProduct(product){
     let cart = getCart();
     cart = cart.filter(p => p.id != product.id && p.color != product.color);
     saveCart(cart);
};
 
// Add product to cart wiyh Id, color, quantity
AddToCartBtn.addEventListener("click",(e) =>{
    e.preventDefault();
    let quantity = document.querySelector("#quantity");
    let quantities = document.querySelector("#quantity").value;
     if ( quantity.value <= 0){
         alert("La quantité ne peut être égale à 0")
         quantity.value = 1
         return false
     }
   let avis =  window.confirm ("votre produit va être ajouté au panier ");
    if ( avis == false){
       
        return false
    }
    
      cart = getCart();
   
   const form = {
     id:  productSelectId,
     color: color.value,
     quantity: quantity.value,
   }
     
    addCart(form);
     
 });
