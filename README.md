# ShopKart — Dynamic Online Shopping Website

A fully working front-end e-commerce site built with **plain HTML, CSS and JavaScript** (no framework, no build step). Prices are shown in **Indian Rupees (₹)** and all product photos are **real photographs** (via Unsplash), not illustrations or logos.

## How to run it
1. Unzip the folder.
2. Double-click `index.html` to open it in your browser — **or**, for the best experience (so image/font loading behaves like a real site), serve it locally:
   ```
   cd shopkart
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.
3. You need an internet connection the first time, since product images and fonts load from the web (Unsplash, Google Fonts, Font Awesome).

## What's included
| Page | Purpose |
|---|---|
| `index.html` | Home page — hero banner, categories, featured & new products |
| `category.html` | Category listing with subcategory + price filters, sorting, search |
| `product.html` | Product detail page — gallery, quantity selector, Add to Cart / Buy Now |
| `cart.html` | Shopping cart — update quantity, remove items, order summary |
| `checkout.html` | Shipping address form + payment method (Card / UPI / Cash on Delivery) |
| `order-success.html` | Order confirmation screen |
| `login.html` / `register.html` | User authentication |
| `account.html` | Logged-in user's profile and order history |
| `admin.html` | Admin dashboard — stats, all orders/payments, product catalog, registered users |

## Demo login
- **Admin:** username `admin`, password `admin123`
- **Customer:** register your own account from `register.html`

## How data is stored (important)
This is a **front-end only** deliverable (as requested), so there's no real server or database file. Instead, `js/db.js` uses the browser's `localStorage` as a stand-in "database" for:
- Users (`shopkart_users`)
- Orders / payments (`shopkart_orders`)
- Per-user cart (`shopkart_cart_<username>`)
- Login session (`shopkart_session`)

This means data persists in your browser between visits, but it is **local to that browser only** — it is not shared across devices, and payments are simulated (no real transaction is processed).

### Moving to a real database / backend
To make this production-ready, replace the functions in `js/db.js` (e.g. `registerUser`, `loginUser`, `placeOrder`, `getOrders`) with real `fetch()` calls to your own backend API, for example:
- **Node.js + Express + MongoDB/MySQL/PostgreSQL**
- **PHP + MySQL**
- **Firebase Authentication + Firestore**
- **Supabase (Postgres + Auth + Storage)**

You'd also want to add real payment gateway integration (Razorpay, PayU, Stripe, or CCAvenue for India) instead of the simulated card/UPI/COD form in `checkout.html`.

## Adding / editing products
All products and categories live in `js/data.js` — just add a new object to the `PRODUCTS` array (or a new entry in `CATEGORIES`) and it will automatically appear across the home page, category pages, and search.

## Suggested prompt to extend this project further
If you want to keep improving this site with an AI assistant, here's a ready-to-use prompt:

> "Using this ShopKart HTML/CSS/JS e-commerce project as the base, please: (1) connect it to a real backend (Node.js + Express + MongoDB) so user accounts, products, and orders are stored in an actual database instead of localStorage; (2) integrate a real Indian payment gateway (Razorpay) for card/UPI/net-banking payments; (3) add product image upload for the admin panel; (4) add order status email/SMS notifications; (5) add pagination and a product review/rating system; (6) make the admin panel able to add/edit/delete products directly from the UI instead of editing data.js."

## Notes
- Currency: all prices are stored and displayed directly in ₹ (INR).
- Images: all product/category photos are real stock photography from Unsplash — no cartoons, clip-art, or brand logos.
- This project is for learning/demo purposes; review security (password hashing, input sanitization, HTTPS, CSRF protection) before using any of this in production.
