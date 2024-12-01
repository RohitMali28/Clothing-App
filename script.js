// Placeholder data (simulating CSV files)
const users = [
    { username: 'Rohit', password: '12345' },
    { username: 'Rohit123', password: 'r12345' }
];

// Simulating in-memory product data with updated image paths
const products = [
    { name: 'T-Shirt', category: 'Clothing', price: 20, imageUrl: 'images/t-shirt.jpg' },
    { name: 'Sneakers', category: 'Footwear', price: 50, imageUrl: 'images/sneakers.jpg' },
    { name: 'Hoodie', category: 'Clothing', price: 30, imageUrl: 'images/hoddie.jpg' },
    { name: 'Hat', category: 'Accessories', price: 15, imageUrl: 'images/hat.jpg' },
    { name: 'Jacket', category: 'Clothing', price: 60, imageUrl: 'images/jacket.jpg' },
    { name: 'Boots', category: 'Footwear', price: 80, imageUrl: 'images/boot.jpg' }
];

// Load purchase history from localStorage (if available)
let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

// Handle user login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // On successful login, show products
        displayProducts(user);
    } else {
        alert('Invalid credentials');
    }
}

// Display products based on the user's purchase history
function displayProducts(user) {
    // Hide the login form after successful login
    document.getElementById('login-form').style.display = 'none';
    
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear any previous products

    // Get categories the user has purchased from
    const purchasedProducts = purchaseHistory.filter(p => p.username === user.username).map(p => p.productName);
    
    // Separate products into purchased and non-purchased categories
    const nonPurchasedProducts = products.filter(p => !purchasedProducts.includes(p.name)).sort((a, b) => a.name.localeCompare(b.name));
    const purchasedList = products.filter(p => purchasedProducts.includes(p.name)).sort((a, b) => a.name.localeCompare(b.name));

    // Display Unpurchased Products First
    displayProductCategory('Unpurchased Products', nonPurchasedProducts);
    // Display Purchased Products Second
    displayProductCategory('Purchased Products', purchasedList, true);  // Added 'true' to show Remove button
}

// Display a category of products
function displayProductCategory(categoryTitle, products, isPurchased = false) {
    const productList = document.getElementById('product-list');
    
    if (products.length > 0) {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        
        const categoryTitleElem = document.createElement('h3');
        categoryTitleElem.textContent = categoryTitle;
        categoryContainer.appendChild(categoryTitleElem);
        
        // Loop through each product and create a product card
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
    
            productItem.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.category}</p>
                <p class="price">$${product.price}</p>
                ${isPurchased ? 
                    `<button class="remove-btn" onclick="removeProduct('${product.name}')">Remove</button>` : 
                    `<button class="buy-btn" onclick="purchaseProduct('${product.name}')">Buy</button>`
                }
                <span class="confirmation" id="confirmation-${product.name}" style="color: green; display: none;">Purchased!</span>
            `;
    
            categoryContainer.appendChild(productItem);
        });

        productList.appendChild(categoryContainer);
    }
}

// Purchase a product
function purchaseProduct(productName) {
    const username = document.getElementById('username').value;  // Assuming the username is available

    // Check if the product has already been purchased by this user
    const alreadyPurchased = purchaseHistory.some(p => p.username === username && p.productName === productName);
    
    if (!alreadyPurchased) {
        // Add the product to the purchase history
        purchaseHistory.push({ username, productName });

        // Update purchase history in localStorage
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

        // Find the product card and show confirmation
        const confirmationElement = document.getElementById(`confirmation-${productName}`);
        confirmationElement.style.display = 'inline';  // Show "Purchased!" message

        // Optionally, update the UI to reflect the purchase immediately (disable Buy button)
        setTimeout(() => {
            // Disable the Buy button and change it to "Purchased"
            const productItems = document.querySelectorAll('.product-item');
            productItems.forEach(item => {
                if (item.querySelector('h4').innerText === productName) {
                    item.querySelector('.buy-btn').disabled = true; // Disable Buy button
                    item.querySelector('.buy-btn').innerText = 'Purchased'; // Change button text
                }
            });
        }, 500); // Delay the update to show the confirmation message for a moment
    } else {
        alert('You have already purchased this product!');
    }
}

// Remove a product from purchase history
function removeProduct(productName) {
    const username = document.getElementById('username').value;  // Get the username of the logged-in user

    // Remove the product from the purchase history
    purchaseHistory = purchaseHistory.filter(p => !(p.username === username && p.productName === productName));

    // Update purchase history in localStorage
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    // After removal, refresh the product display to reflect the change
    const user = users.find(u => u.username === username);  // Retrieve the user object again
    displayProducts(user);  // Re-render the product list for the user
}

// On page load, load purchase history and display products
document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('username')?.value; // Retrieve username if available
    if (username) {
        // Display products for the user if logged in
        const user = users.find(u => u.username === username);
        if (user) {
            displayProducts(user);
        }
    }
});