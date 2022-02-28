
// Pointage des elements html

let productName = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let image = document.querySelector(".item__img");
let color = document.querySelector("#colors");
let colorValue = color.options.value;

// pointage  bouton Ajouter au panier
let AddToCartBtn = document.querySelector("#addToCart");



// Récupération de l'Id du produit contenu dans l'URL

 const urlData = window.location.search;
 
 const productSelectId = new URLSearchParams(urlData).get(`id`);

 console.log(productSelectId);
//-----------

let cart = [];
let productSelect=[];

// récupération dans l'API  des données du produit sélectionné
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
});

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
ProductSelectquantity = document.querySelector("#quantity").value;

// ---------------- Gestion Panier -------------------


function saveCart(cart) {
    localStorage.setItem("panier" , JSON.stringify(cart));
};

let itemQuantity2 = document.querySelectorAll(".itemQuantity");

console.log(cart);

function  getCart() {
 cart = localStorage.getItem("panier");
  if ( cart === null){
      return [];
  }else{
  return JSON.parse(cart);
  }
} ;

   console.log(getCart())  ;
   console.log(cart)  ;
 
//-----
   function addCart(product){
       
     let cart = getCart();
    
    console.log(cart)
     let productFind = cart.find(p => p.id == product.id && p.color == product.color);
     console.log(product);
     console.log(productFind);
     if (product.quantity > 100 ){
        alert("Pour les commandes supèrieures a 100 unités, veuillez contactez notre service reservé aux proffessionnels afin de profiter de tarifs préférenciels.");  
        return false
    }
     if(productFind != undefined){
        productFind.quantity = Number(productFind.quantity) + Number(product.quantity);
        console.log(productFind);        
         } else{
            cart.push(product)
        }    
      saveCart(cart);
  }

 
// Ajout de la selection dans le localStorage sous forme d'objet

 
 function removeProduct(product){
     let cart = getCart();
     cart = cart.filter(p => p.id != product.id && p.color != product.color);
     saveCart(cart);
 };
 

AddToCartBtn.addEventListener("click",(e) =>{
    let quantities = document.querySelector("#quantity").value;
     if ( quantities <= 0){
         alert("la quantité ne peut être infèrieure ou égale à 0")
         quantities = 0;
         return false
     }
   let windo =  window.confirm ("votre produit va être ajouté au panier ");
    if ( windo == false){
       
        return false
    }
     e.preventDefault();
      cart = getCart();
   
   const form = {
     id:  productSelectId,
     color: color.value,
     quantity: quantities,
   }
     
    addCart(form);
     
 });

