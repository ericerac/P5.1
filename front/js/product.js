
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
    

    ProductQuantity(productSelect,quantity)

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
    console.log(result);

    for (let col of result) {
        colorsInsert += `<option value="${col}">${col}</option>`};
        color.innerHTML = colorsInsert;
    
 
    // recuperation  couleur selectionnée

     color.addEventListener(`change`, ()=> {
        let optionSelectValue = color.selectedIndex;
        return (optionSelectValue);
    })
// OBJET PRODUIT AVEC SELECTIONS " id OPTIONS  COULEUR "

console.log(productSelect);
// let name = `${productTitle}`;
// let prix = Number(`${productPrice}`);
// let prixTotal = total (prix , quantity);

    // console.log(prixTotal);
// Gestion Panier

    function saveCart(cart) {
        localStorage.setItem("panier" , JSON.stringify(cart));
    };
    
    
    function  getCart() {
    let cart = localStorage.getItem("panier");
      if ( cart == null){
          return [];
      }else{
      return JSON.parse(cart);
      }
   } ;
   let carts = {};
    
    carts = localStorage.getItem("panier");
      

   
   console.log(getCart())  ;
   console.log(carts.id)  ;
   
   
  
    function addCart(product){
      let cart = getCart();
        // si product present mettre a jour product 
       
    //   
      // if(product.id == cart.id && product.color == cart.color){
      //     quantity= (parseInt(product.quantity)  + parseInt(form.quantity) );
      //     console.log(quantity);
      //   }else{
      //             saveCart(cart);
      //        }
      //     
      //console.log(form);
      //console.log(productFind);
        
        cart.push(product);
       
        saveCart(cart);
    }

    function ProductQuantity(form,quantity){
        let cart = getCart();
        if(cart==undefined){
            cart = [];
        }
        
      //let productFind = cart.find(p => p.id == form.id && p.color == form.color);
      //console.log(form);
      //console.log(productFind);

      //if(productFind != undefined){
      //   quantity= (parseInt(productFind.quantity)  + parseInt(form.quantity) ) ;
      //   console.log(quantity);
      //    if(productFind <= 0){
      //        RemoveCart(productFind);
      //    }else{
      //        saveCart(cart);
      //   }
      //}
      }

    // Ajout de la selection dans le localStorage sous forme d'objet
    AddToCartBtn.addEventListener("click",(e) =>{
       // window.confirm
        e.preventDefault();
         cart = getCart();
      
      const form = {
        id:  productSelectId,
        color: color.value,
        quantity: document.querySelector("#quantity").value,
      }
      ProductQuantity(form);   
       addCart(form);
        
    });

    function QuantityCartProduct(){
        let cart = getCart();
        let number = 0;
        for(let product of cart){
            number= product.quantity;

        }
        return number;
      }
    console.log(QuantityCartProduct());
    
       
} 

)}
else {
    alert("Erreur lors de la requête")
}
});












