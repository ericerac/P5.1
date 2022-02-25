
let cardsProductsIndex = document.getElementById("items");

   let getProduct= fetch("http://localhost:3000/api/products/#{productsId}")
    .then((res) => res.json()
    .then(data => {
        let product = "";
        for (let kanap of data) {
            
            
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
       getProduct();
            
     