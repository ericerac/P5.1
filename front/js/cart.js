

//("use strict");

let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
console.log(typeof(panier));

//let panier = "";
//function getpanier(){
//  let panier = JSON.parse(localStorage.getItem("panier"));
//  return panier;
//}

// RECUPERATION DES ID COLOR QUANTITY DE CHAQUE PRODUIT DU PANIER



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
   listId.push(i.id);
   listColor.push(i.color);
   listQuantity.push(i.quantity);
 };
 console.log(cart);
 console.log(listId);
 console.log(listColor);
 console.log(listQuantity);


// recup des donnees des produits selectionnés

let products = [];
let articles = [];
let cartPrice =[];
let productCartData=[];
let cartImg =[];
//let productQ =totalProductsCart ();
        let Pp ="";
 productsTab =  () => {  fetch("http://localhost:3000/api/products?id=${listId}")

 .then(response => {
     if(response.ok){
         response.json()
         .then(productsTabData => {
           articles.push(productsTabData);
        let i ="";
        let productCartData ="";
        // let productQ =totalProductsCart ();
        let Pp ="";

            for (i of panier){
                products.push(i);
                
                    productCartData = productsTabData.find((prod) => prod._id == i.id);
                  
                  productQ = parseInt(productCartData.price);


                //console.log(productCartData);
                cartPrice.push(parseInt(productCartData.price)) ;
                //console.log(cartPrice);

                cartImg.push(productCartData.imageUrl) ;
                //console.log(cartImg);

                //console.log(products.quantity);
                //console.log(i.price);
                
                //console.log(cartPrice);
                //console.log(typeof(cartPrice)); //
            
                console.log(i.quantity);
                console.log(productCartData.price);
                //Pp = totalProductPrice (i.quantity,productCartData.price) 
                console.log(Pp);
                
                

                displayCart(productCartData,i); //bon
               
            } ;
            // Total nombre de produits du panier

            

           
            // insertion du nombre d'article dans le html
            //let inputFornQuantity = document.querySelector(".itemQuantity").addEventListener("onchange",(value)=>{
            //  console.log(inputFornQuantity);
            //  return value;
            //})
            //let totalQuantity = document.querySelector("#totalQuantity").textContent= totalProductsCart ();

            //for(a of inputFornQuantity){
            //  totalProduct
            //}

            //t inputFornQuantity = document.querySelector(".itemQuantity").addEventListener("onchange",(value)=>{
            //console.log(inputFornQuantity);
            //return value;
            //
            
            function totalCartPrice(a,b){
              return a+=b;
            }
            // totalProductsCart();  
            // function  totalProductPrice (a,b)  {
            //   return(a*b);
            //   };
              

         })
        }}
        )};
        console.log(products);

 // Insertion des produits du panier dans le html

function displayCart(productCartData,i){
  
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
  let pDeleteTxt = document.createTextNode("Supprimer");
  btnDelete.appendChild(pDeleteTxt);
  divContentDelete.appendChild(btnDelete);

}
let quantityAdjust = "";
for(i of products){
  document.querySelector(".itemQuantity").value = i.quantity;
}

console.log(productCartData.name);

// let deleteItem = (e)=> {
//   
// 
// }
// let deleteButton = document.querySelector(".cart__item__content__settings__delete > p");
// 
// deleteButton.addEventListener("click",(e)=> {
//   e.preventDefault();
//   for(i of panier){
//     localStorage.removeItem(element.data-id);
//   }
//  
// })

    console.log(listId);
    console.log(typeof(listId));

 productsTab();
 



 // FORMULAIRE

    let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg"); 
    let  lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    let  addressErrorMsg = document.querySelector("#addressErrorMsg");
    let  cityErrorMsg = document.querySelector("#cityErrorMsg");
    let emailErrorMsg = document.querySelector("#emailErrorMsg");

    

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

let inputs = document.querySelectorAll('input[type="text"],[type="email"]');
let inputsValue = document.querySelectorAll('input[type="text"],[type="email"]').value;

console.log(inputs);



  inputForm = inputs.forEach((input) =>{
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
 
  

 // Recupération des données du formulaire
let dataForm ="";
let ordered = document.querySelector("#order");
ordered.addEventListener("click",(e) =>{
   e.preventDefault(); 
     dataForm = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email:email.value
    }
    console.log(dataForm);
    // envoi des données au vers l'API.
    fetch("http://localhost:3000/api/products/order",{
      method:"POST",
      
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data),
    })


    .then(response => response.json())
     .then(data => {
         window.location = `../html/confirmation.html?id=${data.orderId}`;
         localStorage.clear();
     })
    .catch(err => console.log('Erreur : ' + err));

    console.log(data);
}); 
console.log(listId);

// function totalProductsCart (q,quantity){
//   inputFormQuantity = document.querySelector(".itemQuantity");
//   let number = 0;
//   for(q of inputFormQuantity){
// number = q;
// console.log(number);
//   }
  



// //  for (let q of products){
// //    totalProduct += Number (q.quantity);
// //  }
// //return(totalProduct);
// };
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */