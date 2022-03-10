
// grap the DOM item where to display the products
let cardsProductsIndex = document.getElementById("items");

// request GET to retrieve all products
   let getProduct= fetch("http://localhost:3000/api/products/#{productsId}")
    .then((res) => res.json()
    .then(data => {
        let product = "";
        for (let kanap of data) { // loop to display products
            
            
           product += 
           `
                <a href="./product.html?id=${kanap._id}">
                <article>
                <img src= "${kanap.imageUrl}" alt= "${kanap.altTxt}"/>
                <h3 class="productName"> ${kanap.name }</h3>
                <p class="productDescription">${kanap.description}</p>
                </article>
                </a>
            `;
                
                
            }
            cardsProductsIndex.innerHTML += product;
            }));
    
            
     