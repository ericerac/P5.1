
"use strict"

//const { stringify } = require("querystring");

// import { export } from "module-name";
const urlData = window.location.search;
 const urlParams = new URLSearchParams(urlData);

 const productSelectId = urlParams.get(`id`);

 console.log(productSelectId);
 
 if(productSelectId != null){
   let displayId = document.querySelector("#orderId");
   displayId.textContent = productSelectId;
 }

// recuperation du panier
 let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
console.log(JSON.parse(localStorage.getItem("panier")));
if ( panier == null){
  panier = [];
}
//-------------------------

// RECUPERATION DES ID COLOR QUANTITY DE CHAQUE PRODUIT DU PANIER
let totalQuantity = document.querySelector("#totalQuantity");

let commande = class CartProductCommande {
	constructor(productName, id, color, quantity, price, total){
		this.productName = productName;
		this.id = id;
		this.color = color;
		this.quantity = quantity;
		this.price = price;
		this.total = total;
} }

//let productName = "";
let id = "";
let listId = [];
let listColor = [];
let listQuantity= [];
let cart = [];
let colorInsert ="";
let idInsert ="";
let QuantityInsert ="";

 
  for ( let i of panier)
 {
   cart.push(i);
   id = (i.id);
   listColor.push(i.color);
   listQuantity.push(i.quantity);
 };
console.log(cart);




 let quantite ="";
 let quantity ="";
 
let quant = [];

let cartProductPrice = [];
const totalCartProduct = "";

// recuperation quantitée

const itemQuantity2 = document.getElementsByClassName(".itemQuantity");
// total quantité de produits
const cartTotalQuantity = ()=> {
    let total = 0;
    for ( let e of myArray){
      total += e.quantity;
      totalQuantity.textContent = total;
     }
     console.log(myArray);
     
  };



let totalPrice = document.querySelector("#totalPrice");
let sommeTotal ="";
const prix = () => {  
  console.log(totalPrice);
  sommeTotal = myArray.map(item => item.total).reduce((prev, curr) => prev + curr);
  console.log(sommeTotal); // retourne la somme des prix de tout les elements
  totalPrice.textContent = sommeTotal;     
  };
  
// Suppression du produit du panier 

let deleteBtn = document.getElementsByClassName('deleteItem');
  console.log(deleteBtn);

const delete_btn = () => {
  let ite = myArray.keys();
  for (let key of ite) {
    console.log(key);
  }
  
  for ( let b of deleteBtn){
      
    b.addEventListener("click", (d)=> {
      let confirm = window.confirm ("Voulez-vous vraiment supprimer cet article ?")
  if ( confirm == false){
    return false;
  }
      let parent = d.target.closest('.cart__item');
      let prodFound = panier.find((p) => p.id == parent.dataset.id && p.color == parent.dataset.color);
      console.log(prodFound);
      removeProduct(prodFound)
      console.log(myArray);
      parent.remove();
      cartTotalQuantity ();
    })
  }
}
//--------------------------

// FONCTION PANIER
function removeProduct(product){
  
  cart = panier.filter(p => p.id != product.id && p.color != product.color);
  myArray = myArray.filter(e => e.id !=product.id && e.color != product.color);
console.log(myArray);
  saveCart(cart);
};

function saveCart(cart) {
  localStorage.setItem("panier" , JSON.stringify(cart));
};

function addCart(product){       
 console.log(cart)
  let productFind = cart.find(p => p.id == product.id && p.color == product.color);
  console.log(product);
  console.log(productFind);
  if (product.quantity > 100){
     alert("Pour les commandes supèrieures a 100 unités, veuillez contactez notre service reservé aux proffessionnels afin de profiter de tarifs préférenciels.")
     product.quantity = 0;
     removeProduct(product);
     return false
 }
  if(productFind != undefined){
     productFind.quantity = Number(product.quantity);
     console.log(productFind);
     
      } else{
         cart.push(product)
     }
  
   saveCart(cart);
}
// -------------------------------------------

// quantité totale de produit
const totalProductQuantity = (a,b)=> a+b;
//----------------------------

// Prix total de chaque produit
const totalPriceP = (a,b) => {
  for ( let e of myArray){
     e.total = (e.quantity*e.price)
    }
    console.log(myArray);
    prix();
};
//------------------------------
// recuperation des modification de quntité  des produit
const autre = ()=> {
  let itemQuantity2 = document.querySelectorAll(".itemQuantity");
    for (let e of itemQuantity2) {
     
       e.addEventListener("change", (d) => {
        if ( d.target.value <= 0){
          alert("la quantité ne peut être infèrieure ou égale à 0");
          d.target.value = 0;
          return false
      }
        console.log(e);
        let blocAncetre = d.target.closest('.cart__item');
        console.log(blocAncetre);
        let grandId = blocAncetre.dataset.id;
        console.log(grandId);
       
        //let itemParent = d.target.closest('.itemQuantity');
        //console.log(itemParent);
       
        console.log(e.value);
        console.log(d.target);   
         
        
        
        const changementQ = myArray.map(item => item.id == grandId) ; 
        console.log(changementQ); // retourne true  sur l'element modifié et false sur les autres

        
        const idd = myArray.find(item => item.id == grandId);
        console.log(idd); // retourne l'objet du produit dont l'element a été  modifié
        

        console.log(myArray); 
        idd.quantity =  Number(e.value);   
        console.log(grandId);
       
        let nouvelleValeur = (d.target.value);
        //d.target.value = Number(itemParent.value);
        //itemParent.setAttribute("value",nouvelleValeur);
        //console.log(itemParent);

        let itemPadre = d.target.closest('.cart__item__content');
        console.log(itemPadre);

        let prix = Number(itemPadre.childNodes[0].lastChild.textContent);
        console.log(prix);
        console.log(nouvelleValeur); 
        let quannn = myArray.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0);
        console.log(quannn);
        
        console.log(idd);

        //const sommeTotal = myArray.map(item => item.total).reduce((prev, curr) => prev + curr, 0);
        
        
       
        console.log(myArray);
        
        totalPriceP ();
        addCart(idd);
       totalQuantity.textContent = quannn;
      
        return nouvelleValeur 
     });
    }  totalPriceP ();
  }
 
  
  //console.table(object);

// recup via l'api des donnees des produits selectionnés

//let products = [];
let productId = new Array;
let cartPrice =[];
let productCartData=[];
let cartImg =[];
let object1 = "";

let myArray = new Array;

 const productsTab =  () => {  fetch("http://localhost:3000/api/products?id=${listId}")

 .then(response => {
     if(response.ok){
         response.json()
         .then(productsTabData => {
           
        
            let productCartData ="";
        
            for (let i of panier){
              
                
              
                  productCartData = productsTabData.find((p) => p._id == i.id);               
                  cartPrice.push(parseInt(productCartData.price))                
                  productId.push(i.id) ;
                
                  console.log(i.quantity);
                  console.log(productCartData.id);
                  console.log(productId);
                 
                 
                display(productCartData,i); //bon
                cartCommande (i,productCartData); 
            } ;
            autre();
            cartTotalQuantity(); // bon recupère et affiche la quantité de produits
            prix();
            
            delete_btn();
            totalPriceP();
         })
        }})
        .then( () => {
         console.log(productId);
        }).catch((e) =>{
              alert(e);
        });
               
      };
        
      productsTab();
      
const cartCommande =  (i,productCartData) => {

  let object1 = new commande (productCartData.name,i.id,i.color,Number(i.quantity),productCartData.price);
  myArray.push(object1);
  console.log(myArray);       

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

// FIN Insertion des produits du panier dans le html
// ---------------- --------------- ---------------

  

 // FORMULAIRE
// pointage Span Error Messages formulaire

    let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg"); 
    let  lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    let  addressErrorMsg = document.querySelector("#addressErrorMsg");
    let  cityErrorMsg = document.querySelector("#cityErrorMsg");
    let emailErrorMsg = document.querySelector("#emailErrorMsg");

    
// function de validation des imputs du formulaire

const firstNameCheck =(value)=>{ 
  if(!value.match(/^[a-zA-Z-._àâéèêô´` ñÑî'ùûïÏäÄçÀÂÉÈÔÙÛÇ]*$/)){
    firstNameErrorMsg.textContent="veuillez saisir uniquement des lettres et tirets. (pas de chiffres ni caractères spéciaux).";
  }else{
    firstNameErrorMsg.textContent="";
  };
};

const lastNameCheck =(value)=>{
  if(!value.match(/^[a-zA-Z-._àâéèêô´` ñÑî'ùûïÏäÄçÀÂÉÈÔÙÛÇ]*$/)){
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
  if(!value.match(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)){
    emailErrorMsg.textContent="veuillez saisir une adresse électronique valide.";
  }else{
  emailErrorMsg.textContent="";
  };
};

// pointage des inputs du formulaire

let inputs = document.querySelectorAll('input[type="text"],[type="email"]');


// Verification du formulaire

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
 

commande.prototype.toString = function commandeToString() {
  return `${this.productName}: ${this.color}, quantité ${this.quantity} , Total ${this.total} €.`
};

 // Recupération des données du formulaire
 
let contact =[];
let products = productId;

// fonction d'envoi des données vers l'API.
let send = (sendData) =>{
  fetch("http://localhost:3000/api/products/order",{
    method:"POST",    
    body:JSON.stringify(sendData),
    
    headers:{
     // "Accept":"application/json",
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



let ordered = document.querySelector("#order"); // btn commander
let form = document.querySelector(".card__order__form__submit")
ordered.addEventListener("click",(e) =>{
  e.preventDefault(); 
  contact = {
   firstName: firstName.value,
   lastName: lastName.value,
   address: address.value,
   city: city.value,
   email:email.value
 }
 let sendData = {
  contact,
  products
}
 console.log(contact,products); // Object { firstName: "jkjlkn", lastName: "mnnmn", address: "jnhjbjkb", city: "nnkjbm", email: "njnbjkb@ggg.cc" }
 console.log(sendData); // Object { firstName: "jkjlkn", lastName: "mnnmn", address: "jnhjbjkb", city: "nnkjbm", email: "njnbjkb@ggg.cc" }
 
                               // Array [ "415b7cacb65d43b2b5c1ff70f3393ad1", "034707184e8e4eefb46400b5a3774b5f" ]

if(cart.length < 1){
  alert(" Votre panier est vide. ")
  return false
}
 // vérification du remplissage de tout les champs du formulaire
  if(contact.firstName == "" || contact.lastName == "" ||  contact.address == "" ||  contact.city == "" || contact.email == ""){
    alert("Veuillez remplir tout les champs du formulaire");
    return false
  };
  let fenetreConfirm = window.confirm(("Confirmer votre commande"+ " " + myArray.toString()+ " " + `Total commande: ${sommeTotal} €`));
  if (fenetreConfirm=== false) {
   return false;
  }   
  
   send(sendData);
     //console.log(data);
}); 


//---------------------


//--------------------------------------------------------------






 



