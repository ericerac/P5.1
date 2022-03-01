
"use strict"
// import { export } from "module-name";

// récupération nº commande dans l'URL de validation

 const urlData = window.location.search;
 const urlParams = new URLSearchParams(urlData);
 const productSelectId = urlParams.get(`id`);
  console.log(productSelectId);
 // Affichage Nº commande aprés validation
 if(productSelectId != null){
    let displayId = document.querySelector("#orderId");
    displayId.textContent = productSelectId;
  }

//-----------------------------

// retrieve cart content
 let cart = JSON.parse(localStorage.getItem("panier"));
console.log(cart);
console.log(JSON.parse(localStorage.getItem("panier")));
if ( cart == null){
  cart = [];
}
//-------------------------

// RECUPERATION DES ID COLOR QUANTITY DE CHAQUE PRODUIT DU PANIER
let totalQuantity = document.querySelector("#totalQuantity");

//Class de données produits au panier
let commande = class CartProductCommande {
	constructor(productName, id, color, quantity, price, total){
		this.productName = productName;
		this.id = id;
		this.color = color;
		this.quantity = quantity;
		this.price = price;
		this.total = total;
} }
// -----------------------------------
let cartArray = new Array;
console.log(cart);

 
 
// recuperation quantitée

// total products quantity
const cartTotalQuantity = ()=> {
    let total = 0;
    for ( let e of cartArray){
      total += e.quantity;
      totalQuantity.textContent = total;
     }
     console.log(cartArray);  
  };

// total prix des produits de la commande
let totalPrice = document.querySelector("#totalPrice");
let sommeTotal ="";

const prix = () => {  

  cartManagement();
  
  sommeTotal = cartArray.map(item => item.total).reduce((a, b) => a + b); // retourne la somme des totaux de cahque produit
  totalPrice.textContent = sommeTotal;     
  };
  
// Suppression du produit du panier 

let deleteBtn = document.getElementsByClassName('deleteItem');
  console.log(deleteBtn);

const delete_btn = () => {  

  for ( let b of deleteBtn){
      
    b.addEventListener("click", (d)=> {
      d.preventDefault();
      let confirm = window.confirm ("Voulez-vous vraiment supprimer cet article ?")

        if ( confirm == false){
          return false;
        }
          let parent = d.target.closest('.cart__item');
          let productFound = cart.find((p) => p.id == parent.dataset.id && p.color == parent.dataset.color);         
          removeProduct(productFound)
          parent.remove();
          console.log(cart);
          cartTotalQuantity ();
          prix();
    })
  }
}
// if cart empty
const cartManagement = () => {
  if(cart.length < 1){
cartArray =[0];
totalQuantity.textContent = "";
  } else {
    
  }
}
//--------------------------------

// -------FUNCTIONS CART----------

// Remove product of cart
function removeProduct(product){
  
  cart = cart.filter(p => p.color !== product.color ||  p.id !== product.id  );
  cartArray = cartArray.filter(e =>  e.color !== product.color || e.id !== product.id );
   
  saveCart(cart);
};

 // save cart ------
function saveCart(cart) {
  localStorage.setItem("panier" , JSON.stringify(cart));
};

 // add product to cart -----
function addCart(product){       
 
  let productFind = cart.find(p => p.id == product.id && p.color == product.color);
  console.log(productFind);
//   if (product.quantity > 100){
//      alert("Pour les commandes supèrieures a 100 unités, veuillez contactez notre service reservé aux proffessionnels afin de profiter de tarifs préférenciels.")
//      product.quantity = 0;
//      //removeProduct(product);
//      return false
//  }
  if(productFind != undefined){
     productFind.quantity = Number(product.quantity);
     console.log(productFind);
      } else{
         cart.push(product)
     }
  
   saveCart(cart);
}
// -------------------------------------------

// quantité totale de produit -----
const totalProductQuantity = (a,b)=> a+b;
//----------------------------

// Prix total de chaque produit -----
const totalPriceProduct = (a,b) => {
  for ( let e of cartArray){
     e.total = (e.quantity*e.price)
    }
    prix();
};
//------------------------------

// Retrieve new products quantity -----
const getItemQuantity = ()=> {
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  
    for (let e of itemQuantity) {
     
      // Listening inputs quantity -----
       e.addEventListener("change", (d) => {
        
        if ( d.target.value <= 0){
          alert("La quantité ne peut être égale à 0. Si vous ne souhaitez pas de ce produit veuillez le supprimer.");
          d.target.value = 1 ;
          return false
        } 
        if (d.target.value > 100){
          alert("Pour les commandes supèrieures a 100 unités, veuillez contactez notre service reservé aux proffessionnels afin de profiter de tarifs préférenciels.")
          d.target.value = 1 ;;
          return false
        }
          let productId = d.target.closest('.cart__item').dataset.id;
          let productCouleur = d.target.closest('.cart__item').dataset.color;

          const idProduct = cartArray.find(item => item.id == productId && item.color == productCouleur);

          idProduct.quantity =  Number(e.value);    // modification de la quantité

          let quantite = cartArray.map(item => item.quantity).reduce((a, b) => a + b, 0);
          totalQuantity.textContent = quantite;

          totalPriceProduct ();
          addCart(idProduct);
        
       
    }); totalPriceProduct ();
  }
};
// -------------------------------------


// retrieve products datas cart from API-----
let products = new Array;
 const productsTab =  () => {  fetch("http://localhost:3000/api/products?id=${listId}")

 .then(response => {
     if(response.ok){
         response.json()
         .then(productsTabData => {
           
            let productCartData ="";
        
            for (let i of cart){
              
                  productCartData = productsTabData.find((p) => p._id == i.id);               
                  //cartPrice.push(parseInt(productCartData.price))                
                  products.push(i.id) ;
                displayArticle(productCartData,i);
                //display(productCartData,i); //bon
                cartCommande (i,productCartData); 
            } ;
            getItemQuantity(); 
            cartTotalQuantity(); //  recupère et affiche la quantité de produits
            prix();
            delete_btn();
            totalPriceProduct();
         })
        }})
        .catch((e) =>{
              alert(e);
        });
               
      };
        
      productsTab();
//--------------------------------------------   

// récupération et saisie données produit dans l'array cartArray 
const cartCommande =  (i,productCartData) => {

  let object1 = new commande (productCartData.name,i.id,i.color,Number(i.quantity),productCartData.price);
  cartArray.push(object1);
  // console.log(object1);       
  // console.log(cartArray);       
}
//------------------------------------------------

// Insertion des données des produits du panier dans le html

const display = (productCartData,i)=>{
  
  let cartItem = document.querySelector("#cart__items");

  let article = document.createElement('article')
  article.setAttribute("class","cart__item");
  article.setAttribute("data-id" , productCartData._id);
  article.setAttribute("data-color" , i.color);
  cartItem.appendChild(article);


  let divCartImage = document.createElement('div')
  divCartImage.setAttribute( "class","cart__item__img");
  article.appendChild(divCartImage);

  let CartImage = document.createElement('img');
    CartImage.setAttribute("src", productCartData.imageUrl);
    CartImage.setAttribute("alt", "Photographie d'un canapé");
    divCartImage.appendChild(CartImage);

  let divCartContent = document.createElement('div');
  divCartContent.setAttribute("class","cart__item__content");
  divCartImage.after(divCartContent );

  let description = document.createElement("div");
  description.setAttribute("class","cart__item__content__description");
  divCartContent.appendChild(description);
  

  let h2 = document.createElement(`h2`);
  let txth2= document.createTextNode(productCartData.name);
  h2.appendChild(txth2);
  description.appendChild(h2);


  let pColor = document.createElement('p');
  let txtColor = document.createTextNode(i.color);
  pColor.appendChild(txtColor);
  h2.after(pColor);


  let pPrice = document.createElement('p');
  let pPriceTxt = document.createTextNode(productCartData.price);
  pPrice.appendChild(pPriceTxt);
  pColor.after(pPrice);
   

  let divContentSetting = document.createElement('div');
  divContentSetting.setAttribute("class","cart__item__content__settings");
  description.after(divContentSetting );


  let divContentQuantity = document.createElement('div');
  divContentQuantity.setAttribute("class","cart__item__content__settings__quantity");
  divContentSetting.appendChild(divContentQuantity);


  let pQuantity = document.createElement('p');
  let pQuantityTxt = document.createTextNode("Quantité");
  pQuantity.appendChild(pQuantityTxt);
  divContentQuantity.appendChild(pQuantity);


  let inputQuantity = document.createElement("input");
  inputQuantity.setAttribute("type","number");
  inputQuantity.setAttribute("class","itemQuantity");
  inputQuantity.setAttribute("name","itemQuantity");
  inputQuantity.setAttribute("min","1");
  inputQuantity.setAttribute("max","100");
  inputQuantity.setAttribute("value",i.quantity);
  pQuantity.after(inputQuantity);


  let divContentDelete = document.createElement('div');
  divContentDelete.setAttribute("class","cart__item__content__settings__delete");
  divContentQuantity.after(divContentDelete);
  let btnDelete  = document.createElement('p');
  btnDelete.setAttribute("class","deleteItem")
  let pDeleteTxt = document.createTextNode("Supprimer");
  btnDelete.appendChild(pDeleteTxt);
  divContentDelete.appendChild(btnDelete);

}
//------------------------------------------------------
 // New display Card
let cartItem = document.querySelector("#cart__items");

let article = "";
const displayArticle = (productCartData,i) => {
  article = document.createElement('article')
  article.setAttribute("class","cart__item");
  article.setAttribute("data-id" , productCartData._id);
  article.setAttribute("data-color" , i.color);
  cartItem.appendChild(article);
  displayCardImg(productCartData,i)
}
let divCartImage = "" ;
const displayCardImg = (productCartData,i) => {
  divCartImage = document.createElement('div')
    divCartImage.setAttribute( "class","cart__item__img");
    article.appendChild(divCartImage);
  let CartImage = document.createElement('img');
    CartImage.setAttribute("src", productCartData.imageUrl);
    CartImage.setAttribute("alt", "Photographie d'un canapé");
    divCartImage.appendChild(CartImage);
    displayCardContentDescription(productCartData,i);
}

let divCartContent = "";
let description ="";
const displayCardContentDescription = (productCartData,i) => {
  divCartContent = document.createElement('div');
  divCartContent.setAttribute("class","cart__item__content");
  divCartImage.after(divCartContent );
  description = document.createElement("div");
  description.setAttribute("class","cart__item__content__description");
  divCartContent.appendChild(description);
  displayCardContentName(productCartData,i);
}

let h2 = "";
const displayCardContentName = (productCartData,i) => {
  console.log(productCartData);
  h2 = document.createElement(`h2`);
  let txth2= document.createTextNode(productCartData.name);
  h2.appendChild(txth2);
  description.appendChild(h2);
  displayCardContentColor(productCartData,i);
}

let pColor = "";
const displayCardContentColor = (productCartData,i) => {
  pColor = document.createElement('p');
  let txtColor = document.createTextNode(i.color);
  pColor.appendChild(txtColor);
  h2.after(pColor);
  displayCardContentPrice(productCartData,i);
}

let pPrice = "";
 const displayCardContentPrice = (productCartData,i) => {
  pPrice = document.createElement('p');
  let pPriceTxt = document.createTextNode(productCartData.price);
  pPrice.appendChild(pPriceTxt);
  pColor.after(pPrice);
  displayCardContentSetting(productCartData,i);
 }

 let divContentSetting = "";
 const displayCardContentSetting = (productCartData,i) => {
  divContentSetting = document.createElement('div');
  divContentSetting.setAttribute("class","cart__item__content__settings");
  description.after(divContentSetting );
  displayCrdContentQuantity(productCartData,i);
 }
 let divContentQuantity = "";
const displayCrdContentQuantity = (productCartData,i) => {
 
  divContentQuantity = document.createElement('div');
  divContentQuantity.setAttribute("class","cart__item__content__settings__quantity");
  divContentSetting.appendChild(divContentQuantity);


  let pQuantity = document.createElement('p');
  let pQuantityTxt = document.createTextNode("Quantité");
  pQuantity.appendChild(pQuantityTxt);
  divContentQuantity.appendChild(pQuantity);


  let inputQuantity = document.createElement("input");
  inputQuantity.setAttribute("type","number");
  inputQuantity.setAttribute("class","itemQuantity");
  inputQuantity.setAttribute("name","itemQuantity");
  inputQuantity.setAttribute("min","1");
  inputQuantity.setAttribute("max","100");
  inputQuantity.setAttribute("value",i.quantity);
  pQuantity.after(inputQuantity);
  displayCardContentDeleteBtn(productCartData,i);
}

let divContentDelete ="";
const displayCardContentDeleteBtn = () => {
  divContentDelete = document.createElement('div');
  divContentDelete.setAttribute("class","cart__item__content__settings__delete");
  divContentQuantity.after(divContentDelete);
  let btnDelete  = document.createElement('p');
  btnDelete.setAttribute("class","deleteItem")
  let pDeleteTxt = document.createTextNode("Supprimer");
  btnDelete.appendChild(pDeleteTxt);
  divContentDelete.appendChild(btnDelete);
};


// FIN Insertion des produits du panier dans le html
// ---------------- --------------- ---------------

  

 // FORMULAIRE
// pointage Span Error Messages formulaire

    let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg"); 
    let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    let addressErrorMsg = document.querySelector("#addressErrorMsg");
    let cityErrorMsg = document.querySelector("#cityErrorMsg");
    let emailErrorMsg = document.querySelector("#emailErrorMsg");

    
// function de validation des imputs du formulaire

const firstNameCheck =(value)=>{ 
  if(!value.match(/^[a-zA-Z-._àâéèêô´` ñÑî'ùûïÏäëüöÖÄçÀÂÉÈÔÙÛÇ]*$/)){
    firstNameErrorMsg.textContent="veuillez saisir uniquement des lettres et tirets. (pas de chiffres ni caractères spéciaux).";
  }else{
    firstNameErrorMsg.textContent="";
  };
};

const lastNameCheck =(value)=>{
  if(!value.match(/^[a-zA-Z-._àâéèêô´`¨ ñÑî'ùûïÏäëüöÖÄçÀÂÉÈÔÙÛÇ]*$/)){
    lastNameErrorMsg.textContent="veuillez saisir uniquement des lettres et tirets (pas de chiffres ni caractères spéciaux).";
  }else{
    lastNameErrorMsg.textContent="";
  };
};

const addressCheck =(value)=>{
  if(!value.match(/^[a-zA-Z0-9 -._àâéèêô´` ñÑî'ùûïÏäÄçÀÂÉÈÔÙÛÇ]*$/)){
   addressErrorMsg.textContent="Veuillez ne pas saisir de caractères spéciaux.";
  }else{
   addressErrorMsg.textContent="";
  };
};

const cityCheck =(value)=> {
  if(!value.match(/^[a-zA-Zàâéèêô´` ñÑî'ùûïÏäÄçÀÂÉÈÔÙÛÇ]*$/)){
    cityErrorMsg.textContent="Veuillez saisir uniquement des letrres.";
  }else{
    cityErrorMsg.textContent="";
  };
};

const emailCheck =(value)=>{
  if(!value.match(/^([\w\.\-][\&\+)@([\w\-]+)((\.(\w){2,3})+)$/)){
    emailErrorMsg.textContent="veuillez saisir une adresse électronique valide.";
  }else{
  emailErrorMsg.textContent="";
  };
};

// pointage des inputs du formulaire

let inputs = document.querySelectorAll('input[type="text"],[type="email"]');


// Verification inputs form

  const inputForm = inputs.forEach((input) =>{
   input.addEventListener("input",(e)=>{
switch(e.target.id){
  case"firstName":
  firstNameCheck(e.target.value);
  break;

  case"lastName":
  lastNameCheck(e.target.value);
  break;

  case"address":
  addressCheck(e.target.value);
  break;

  case"city":
  cityCheck(e.target.value);
  break;

  case"email":
  emailCheck(e.target.value);
  break;
  default:null;
  return input;
};

   })
 });
 //---------------------------
 //  FIN FORMULAIRE
 
// converting object to string for display window.comfirn order
commande.prototype.toString = function commandeToString() {
  return `${this.productName}: ${this.color}, quantité ${this.quantity} , Total ${this.total} €./ `
};

let ordered = document.querySelector("#order"); // btn order
let contact =[];
let sendData = [];

// datas form recovery
ordered.addEventListener("click",(e) =>{
  e.preventDefault(); 

  contact = {
   firstName: firstName.value,
   lastName: lastName.value,
   address: address.value,
   city: city.value,
   email:email.value
 }
 
  sendData = {
  contact,
  products
}
getData();
 console.log(sendData); // Object { firstName: "jkjlkn", lastName: "mnnmn", address: "jnhjbjkb", city: "nnkjbm", email: "njnbjkb@ggg.cc" }
                         // Array [ "415b7cacb65d43b2b5c1ff70f3393ad1", "034707184e8e4eefb46400b5a3774b5f" ]
      
});  

const getData = ()=> {

  if(cart.length < 1){
    alert(" Votre panier est vide. ")

    return false
  }
  // vérification du remplissage de tout les champs du formulaire
  if(contact.firstName == "" || contact.lastName == "" ||  contact.address == "" ||  contact.city == "" || contact.email == ""){
    alert("Veuillez remplir tout les champs du formulaire");
    return false
  };
  let fenetreConfirm = window.confirm(("Confirmer votre commande"+ ":  " + cartArray.toString()+ " " + `Total commande: ${sommeTotal} €`));
  if (fenetreConfirm=== false) {
    return false;
  }   
  send(sendData);
};
     
 
// fonction d'envoi des données vers l'API.
let send = (sendData) =>{
  fetch("http://localhost:3000/api/products/order",{
    method:"POST",    
    body:JSON.stringify(sendData),
    
      headers:{
      "Accept":"application/json",
      "Content-Type":"application/json",
    },
    
  })
  .then(response => response.json())
   .then(data => {
     console.log(data);
    
       window.location = `../html/confirmation.html?id=${data.orderId}`;
       localStorage.clear();
       return false
   })
  .catch(err => alert("Il semble qu'il y ait l'erreur : " + err));
}


//--------------------------------------------------------------






 



