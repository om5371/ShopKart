/* ============================================================
   ShopKart — "Database" Layer
   Uses browser localStorage as a stand-in for a real database.
   Swap these functions for real fetch()/API calls when you
   connect a backend (Node/PHP/Firebase/etc). See README.
   ============================================================ */

const DB_KEYS = {
  USERS: "shopkart_users",
  ORDERS: "shopkart_orders",
  CART: "shopkart_cart_",       // + username
  SESSION: "shopkart_session"
};

function seedDatabase() {
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    const users = [
      {
        username: "admin",
        password: "admin123",
        name: "Site Administrator",
        email: "admin@shopkart.in",
        phone: "9999999999",
        address: "ShopKart HQ, Ahmedabad, Gujarat",
        role: "admin",
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  }
  if (!localStorage.getItem(DB_KEYS.ORDERS)) {
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify([]));
  }
}

/* ---------- Users ---------- */
function getUsers() {
  return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || "[]");
}
function saveUsers(users) {
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
}
function findUser(username) {
  return getUsers().find(u => u.username.toLowerCase() === username.toLowerCase());
}
function registerUser({ username, password, name, email, phone, address }) {
  const users = getUsers();
  if (findUser(username)) return { ok: false, error: "Username already exists." };
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "Email already registered." };
  }
  users.push({
    username, password, name, email, phone, address,
    role: "customer",
    createdAt: new Date().toISOString()
  });
  saveUsers(users);
  return { ok: true };
}

/* ---------- Session ---------- */
function loginUser(username, password) {
  const user = findUser(username);
  if (!user || user.password !== password) {
    return { ok: false, error: "Invalid username or password." };
  }
  localStorage.setItem(DB_KEYS.SESSION, JSON.stringify({ username: user.username, role: user.role }));
  return { ok: true, user };
}
function logoutUser() {
  localStorage.removeItem(DB_KEYS.SESSION);
}
function getSession() {
  return JSON.parse(localStorage.getItem(DB_KEYS.SESSION) || "null");
}
function getCurrentUser() {
  const s = getSession();
  if (!s) return null;
  return findUser(s.username);
}
function requireLogin(redirectTo = "login.html") {
  if (!getSession()) window.location.href = redirectTo;
}
function requireAdmin() {
  const s = getSession();
  if (!s || s.role !== "admin") window.location.href = "login.html";
}

/* ---------- Cart (per logged-in user, falls back to "guest") ---------- */
function cartKey() {
  const s = getSession();
  return DB_KEYS.CART + (s ? s.username : "guest");
}
function getCart() {
  return JSON.parse(localStorage.getItem(cartKey()) || "[]");
}
function saveCart(cart) {
  localStorage.setItem(cartKey(), JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ productId, qty });
  saveCart(cart);
}
function updateCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(i => i.productId !== productId);
  } else {
    const item = cart.find(i => i.productId === productId);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}
function removeFromCart(productId) {
  const cart = getCart().filter(i => i.productId !== productId);
  saveCart(cart);
}
function clearCart() {
  saveCart([]);
}
function cartWithDetails() {
  return getCart().map(i => ({ ...i, product: getProductById(i.productId) })).filter(i => i.product);
}
function cartTotal() {
  return cartWithDetails().reduce((sum, i) => sum + i.product.price * i.qty, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach(el => {
    const c = cartCount();
    el.textContent = c;
    el.style.display = c > 0 ? "inline-flex" : "none";
  });
}

/* ---------- Orders ---------- */
function getOrders() {
  return JSON.parse(localStorage.getItem(DB_KEYS.ORDERS) || "[]");
}
function saveOrders(orders) {
  localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
}
function placeOrder({ shipping, payment }) {
  const user = getCurrentUser();
  const items = cartWithDetails().map(i => ({
    productId: i.productId,
    name: i.product.name,
    price: i.product.price,
    qty: i.qty,
    image: i.product.image
  }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const order = {
    id: "ORD" + Date.now(),
    username: user ? user.username : "guest",
    customerName: shipping.fullName,
    items,
    total,
    shipping,
    payment: { method: payment.method, last4: payment.last4 || null },
    status: "Pending",
    placedAt: new Date().toISOString()
  };
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  clearCart();
  return order;
}
function getOrdersForUser(username) {
  return getOrders().filter(o => o.username === username);
}
function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const o = orders.find(o => o.id === orderId);
  if (o) o.status = status;
  saveOrders(orders);
}

seedDatabase();
