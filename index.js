import {productCard} from './templates/card.js';

const productList = document.querySelector('.items-container');
const filteredProducts = document.querySelector('.filtered-products');
const categoriesBtn = document.querySelector('.categories-btn');
const selectCategories = document.querySelector('.filtered-products');
const searchBar = document.querySelector('.search-bar');

// REQUESTS

// Get a list of all products 
const getAllProducts = async () => {
    const productsList = await fetch('http://localhost:42958/api/product')
        .then(res =>res.json())
        .catch(err => console.log(err));

    return productsList
};

// Get all categories 
const getCategories = async() => {
    const categoriesList = await fetch('http://localhost:42958/api/category')
    .then((res) => res.json())
    .catch(err => console.log(err))

    return categoriesList
};

// Get all products which belongs to a certain category
const getFilteredProducts = async(id) => {

    const filteredProducts = await fetch(`http://localhost:42958/api/product/category/${id}`)
    .then((res) => res.json())
    .catch(err => console.log(err))

    return filteredProducts
}

// Get all products filtered by words 
const getFilteredbySearch = async(search) => {

    const filteredBySearh = await fetch(`http://localhost:42958/api/product?search=${search}`)
    .then((res) => res.json())
    .catch(err => console.log(err))

    return filteredBySearh
}

// FUNCTIONS 

const renderProducts = (products) => {
    let html = '';
    products.map((product) =>  {
        html += productCard(product);
        productList.innerHTML = html;
    });
};

const renderCategories = (categories) => {
    const createOptions = categories.map((category) => {
        const option = document.createElement('option')
        option.value = category.id
        option.innerText = category.name
        filteredProducts.appendChild(option)
    })
    return createOptions;
}

selectCategories.addEventListener('change', (e) => {
    if (e.target.value === 'all') {

        getAllProducts().then((data)=> renderProducts(data));
        
    } else {
        getFilteredProducts(e.target.value).then((product) => {
            renderProducts(product);
        }) ;
    }

})

searchBar.addEventListener('keyup', (e) => {
    getFilteredbySearch(e.target.value).then((product) => {
        renderProducts(product);
    })
    console.log('ver valor', e.target.value );
})

// Render all products
getAllProducts().then((data)=> renderProducts(data));

// Render all categories

getCategories().then((data)=> renderCategories(data));
