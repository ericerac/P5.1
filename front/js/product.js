
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
 const urlParams = new URLSearchParams(urlData);

 const productSelectId = urlParams.get(`id`);

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
   
    console.log(productsTabData)
     productSelect = productsTabData.find((a)=> a._id === productSelectId);
    console.log(productSelect)
    

   // ProductQuantity(productSelect,quantity)

// recuperation des data dans des variables

    let productImage = productSelect.imageUrl;
    let imageAltText =  productSelect.altTxt;
    let productTitle = productSelect.name;
    let productPrice = productSelect.price;
    let productDescription = productSelect.description;
    let productColors = `${productSelect.colors}`;
    let colorsOptions = productColors; 
    let colorsInsert = "";
  
// insertion dans le html des contenus

    image.innerHTML = `<img src="${productImage}" alt = "${imageAltText}">` ;   
    price.textContent = productPrice;
    productName.textContent = productTitle;
    description.textContent = productDescription;

    let result =  colorsOptions.split(",");
    

    for (let col of result) {
        colorsInsert += `<option value="${col}">${col}</option>`};
        color.innerHTML = colorsInsert;
    
 
    // recuperation  couleur selectionnée

   //  color.addEventListener(`change`, ()=> {
   //     let optionSelectValue = color.selectedIndex;
   //     return (optionSelectValue);
   // })     
} 

)}
else {
    alert("Erreur lors de la requête")
}
});

color.addEventListener(`change`, ()=> {
    let optionSelectValue = color.selectedValue;
    console.log(optionSelectValue);
    return (optionSelectValue);
    
})     
console.log(productSelectId);
ProductSelectquantity = document.querySelector("#quantity").value;

// ---------------- Gestion Panier -------------------

// recuperation  des "couleur id et quantité" de selectionnées

function saveCart(cart) {
    localStorage.setItem("panier" , JSON.stringify(cart));
};

let itemQuantity2 = document.querySelectorAll(".itemQuantity");
//let cart =[];
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
        alert("Pour les commandes supèrieures a 100 unités, veuillez contactez notre service reservé aux proffessionnels afin de profiter de tarifs préférenciels.")
       // product.quantity = 0;
        return false
        //removeProduct(product);
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
   //ProductQuantity(form);   
    addCart(form);
     
 });

