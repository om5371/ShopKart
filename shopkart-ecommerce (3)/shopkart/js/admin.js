/* ============================================================
   ShopKart — Admin Dashboard Logic
   ============================================================ */
requireAdmin();

document.querySelectorAll(".tab-link").forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".tab-link").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".tab-panel").forEach(p => p.style.display = "none");
    document.getElementById("tab-" + tab.dataset.tab).style.display = "block";
    if (tab.dataset.tab === "dashboard") renderDashboard();
    if (tab.dataset.tab === "orders") renderOrders();
    if (tab.dataset.tab === "products") renderProducts();
    if (tab.dataset.tab === "users") renderUsers();
  });
});

function renderDashboard() {
  const orders = getOrders();
  const users = getUsers().filter(u => u.role === "customer");
  const pending = orders.filter(o => o.status === "Pending").length;
  const revenue = orders.filter(o => o.status !== "Cancelled").reduce((s,o) => s + o.total, 0);

  document.getElementById("tab-dashboard").innerHTML = `
    <h2>Dashboard</h2>
    <p class="sub">Overview of your store's performance</p>
    <div class="stat-grid">
      <div class="stat-card"><div class="label"><i class="fa-solid fa-receipt"></i> Total Orders</div><div class="value">${orders.length}</div></div>
      <div class="stat-card"><div class="label"><i class="fa-solid fa-hourglass-half"></i> Pending Orders</div><div class="value">${pending}</div></div>
      <div class="stat-card"><div class="label"><i class="fa-solid fa-users"></i> Registered Users</div><div class="value">${users.length}</div></div>
      <div class="stat-card"><div class="label"><i class="fa-solid fa-indian-rupee-sign"></i> Total Revenue</div><div class="value">${formatINR(revenue)}</div></div>
    </div>
    <h3 style="font-size:16px;margin-bottom:12px;">Recent Orders</h3>
    <table class="data-table">
      <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
      <tbody>
        ${orders.slice(0,6).map(o => `
          <tr>
            <td>${o.id}</td>
            <td>${o.customerName}</td>
            <td>${o.items.reduce((s,i)=>s+i.qty,0)} item(s)</td>
            <td>${formatINR(o.total)}</td>
            <td>${o.payment.method.toUpperCase()}</td>
            <td><span class="badge ${o.status.toLowerCase()}">${o.status}</span></td>
          </tr>`).join("") || `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:24px;">No orders yet</td></tr>`}
      </tbody>
    </table>`;
}

function renderOrders() {
  const orders = getOrders();
  const panel = document.getElementById("tab-orders");
  panel.innerHTML = `
    <h2>Orders &amp; Payments</h2>
    <p class="sub">View incoming orders, payment details, and update fulfillment status</p>
    <input type="text" class="admin-search" id="orderSearch" placeholder="Search by Order ID or customer name...">
    <table class="data-table">
      <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Placed</th><th>Status</th></tr></thead>
      <tbody id="orderRows"></tbody>
    </table>`;

  function draw(list) {
    document.getElementById("orderRows").innerHTML = list.map(o => `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.customerName}<br><span style="color:var(--muted);font-size:11.5px;">${o.shipping.phone}</span></td>
        <td>
          ${o.items.map(i => `${i.name} × ${i.qty}`).join("<br>")}
        </td>
        <td>${formatINR(o.total)}</td>
        <td>${o.payment.method.toUpperCase()}${o.payment.last4 ? " •••• " + o.payment.last4 : ""}</td>
        <td style="font-size:12.5px;">${new Date(o.placedAt).toLocaleDateString("en-IN")}</td>
        <td>
          <select class="status-select" onchange="changeOrderStatus('${o.id}', this.value)">
            ${["Pending","Processing","Shipped","Delivered","Cancelled"].map(s => `<option value="${s}" ${o.status===s?"selected":""}>${s}</option>`).join("")}
          </select>
        </td>
      </tr>`).join("") || `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px;">No orders yet</td></tr>`;
  }
  draw(orders);

  document.getElementById("orderSearch").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    draw(orders.filter(o => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)));
  });
}
function changeOrderStatus(orderId, status) {
  updateOrderStatus(orderId, status);
  showToast(`Order ${orderId} marked as ${status}`, "fa-check");
}

function renderProducts() {
  const panel = document.getElementById("tab-products");
  panel.innerHTML = `
    <h2>Products</h2>
    <p class="sub">Catalog overview (products are managed in js/data.js for this demo)</p>
    <input type="text" class="admin-search" id="productSearch" placeholder="Search products...">
    <table class="data-table">
      <thead><tr><th>Image</th><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th></tr></thead>
      <tbody id="productRows"></tbody>
    </table>`;

  function draw(list) {
    document.getElementById("productRows").innerHTML = list.map(p => `
      <tr>
        <td><img src="${p.image}" style="width:44px;height:44px;object-fit:cover;border-radius:6px;"></td>
        <td>${p.name}</td>
        <td>${getCategory(p.category).name} / ${p.subcategory}</td>
        <td>${formatINR(p.price)}</td>
        <td>${p.stock > 10 ? `<span class="badge delivered">In Stock (${p.stock})</span>` : p.stock > 0 ? `<span class="badge pending">Low (${p.stock})</span>` : `<span class="badge cancelled">Out of Stock</span>`}</td>
        <td>${p.rating} <i class="fa-solid fa-star" style="color:var(--marigold-dark);font-size:11px;"></i></td>
      </tr>`).join("");
  }
  draw(PRODUCTS);
  document.getElementById("productSearch").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    draw(PRODUCTS.filter(p => p.name.toLowerCase().includes(q)));
  });
}

function renderUsers() {
  const panel = document.getElementById("tab-users");
  const users = getUsers().filter(u => u.role === "customer");
  panel.innerHTML = `
    <h2>Users</h2>
    <p class="sub">Registered customer accounts</p>
    <input type="text" class="admin-search" id="userSearch" placeholder="Search users...">
    <table class="data-table">
      <thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Phone</th><th>Address</th><th>Orders</th><th>Joined</th></tr></thead>
      <tbody id="userRows"></tbody>
    </table>`;

  function draw(list) {
    document.getElementById("userRows").innerHTML = list.map(u => `
      <tr>
        <td>${u.name}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
        <td style="max-width:220px;">${u.address}</td>
        <td>${getOrdersForUser(u.username).length}</td>
        <td style="font-size:12.5px;">${new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
      </tr>`).join("") || `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px;">No registered users yet</td></tr>`;
  }
  draw(users);
  document.getElementById("userSearch").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    draw(users.filter(u => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)));
  });
}

renderDashboard();
