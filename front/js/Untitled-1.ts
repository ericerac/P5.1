
let productName = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let image = document.querySelector(".item__img");

 

//quantity = parseInt(quantity);
let color = document.querySelector("#colors");
let colorValue = color.options.value;

let AddToCartBtn = document.querySelector("#addToCart");



    

// Récupération de l'Id du produit contenu dans l'URL
 const urlData = window.location.search;
 const urlParams = new URLSearchParams(urlData);

 const productSelectId = urlParams.get(`id`);

 console.log(productSelectId);
//-----------

let productSelect=[];
// récupération par son l'id les données du produit sélectionné
// et intégration dans la page acceuil html
const productsTab = fetch("http://localhost:3000/api/products?id=${productSelectId}");
 
productsTab
.then(response => {
    if(response.ok){
        response.json()
.then(productsTabData => {
   
    console.log(productsTabData)
     productSelect = productsTabData.find((a)=> a._id === productSelectId);
    console.log(productSelect)
    

    

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
    
 
    // recuperation valeur couleur

     color.addEventListener(`change`, ()=> {
        let optionSelectValue = color.selectedIndex;
        return (optionSelectValue);
    })
// OBJET PRODUIT AVEC SELECTIONS " id OPTIONS  COULEUR "


let name = `${productTitle}`;
let prix = Number(`${productPrice}`);
//let Prixtotal = total (prix , quantity);

    
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
   } 
    
    function addCart(product){
        let cart = getCart();
        
        cart.push(product);
       
        saveCart(cart);
    }

    function ProductQuantity(pop,quantity){
        let cart = getCart();
        let productFind = cart.find(p => p.id == pop.id && p.color == pop.color);
        //console.log(productFind);
        if(productFind != undefined){
            productFind.quantity += quantity;
           
            if(productFind <= 0){
                RemoveCart(productFind);
            }else{
                saveCart(cart);
           }
        }
      }

    // Ajout de la selection dans le localStorage sous forme d'objet
    AddToCartBtn.addEventListener("click",(e) =>{
       // window.confirm
        e.preventDefault();
        let cart = getCart();
      
      const form = {
        id:  productSelectId,
        color: color.value,
        quantity: document.querySelector("#quantity").value,
      }
     
       
       ProductQuantity(quantity);
       addCart(form);
        
    });

    //console.log(productOptionsSelect);
    //function RemoveCart(product){
    //    let cart = getCart();
    //    cart = cart.filter(p => p.id != product.id);
    //    saveCart(cart);
    //  }

    

    function QuantityCartProduct(){
        let cart = getCart();
        let number = 0;
        for(let product of cart){
            number+= product.quantity;

        }
        return number;
      }
    console.log(QuantityCartProduct());
    //function CartPriceTotal(){
    //    let cart = getCart();
    //    let total = 0;
    //    for(let product of cart){
    //        total+= product.quantity * product.price;

    //    }
    //    return total;
    //  }
       
} 

)}
else {
    alert("Erreur lors de la requête")
}
});












