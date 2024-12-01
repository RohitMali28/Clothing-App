THRD Clothing Store

This is a simple online clothing store project that simulates an e-commerce experience. It allows users to log in, view products, and purchase items. The store features product categories (Clothing, Footwear, Accessories), user authentication (username and password), and maintains a purchase history for each user, which is saved in the browser's localStorage.

Features

*User Login: Users can log in using predefined credentials.

*Product Listing: Products are displayed in categories: Clothing, Footwear, and Accessories.

*Purchase History: Users can purchase items and keep track of their purchase history.

*Purchase Confirmation: Upon successful purchase, a "Purchased!" confirmation message is displayed.

*Remove Purchased Items: Users can remove items from their purchase history.
Project Structure

thrd-clothing-store/


├── index.html         # The main HTML page

├── styles.css         # The CSS stylesheet for styling the page

├── script.js          # JavaScript file for functionality (login, display products, purchase history, etc.)

├── images/            # Folder containing product images (e.g., t-shirt.jpg, sneakers.jpg)

└── README.md          # Project documentation

How it Works
1. Login Form
Users can log in using predefined credentials:
Rohit / 12345
Rohit123 / r12345
2. Product Display
Upon successful login, products are displayed in the form of cards.
Products are categorized by type: Clothing, Footwear, Accessories.
Each product has a "Buy" button, which adds the item to the user's purchase history.
3. Purchase Functionality
Once a user purchases a product, the "Buy" button is replaced with a "Purchased" button.
A confirmation message appears after a successful purchase.
Purchased products are displayed under the "Purchased Products" category.
4. Remove Purchased Items
Users can remove a product from their purchase history by clicking a "Remove" button next to the product in the "Purchased Products" section.
Removing a product from the purchase history updates the localStorage and re-renders the product list.
Local Storage
Purchase history is stored in localStorage to persist data across page reloads. This allows users to see their purchase history even after refreshing the page.

Technologies Used
HTML: For the structure of the page.
CSS: For styling and layout.
JavaScript: For handling user interactions, such as login, displaying products, and managing purchase history.
localStorage: To persist purchase history data across sessions.
Future Improvements
Implement user registration (sign-up) and authentication.
Add product descriptions and ratings.
Include a shopping cart for users to add multiple products before checking out.

