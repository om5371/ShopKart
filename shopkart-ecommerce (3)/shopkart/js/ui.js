/* ============================================================
   ShopKart — Shared UI helpers (toast, header state, search)
   ============================================================ */

function showToast(message, icon = "fa-circle-check") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function initHeader() {
  updateCartBadge();
  const session = getSession();
  const accountLink = document.getElementById("accountLink");
  const accountLabel = document.getElementById("accountLabel");
  if (accountLink) {
    if (session) {
      const user = getCurrentUser();
      accountLabel.textContent = user ? user.name.split(" ")[0] : "Account";
      accountLink.href = session.role === "admin" ? "admin.html" : "account.html";
    } else {
      accountLabel.textContent = "Login";
      accountLink.href = "login.html";
    }
  }
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const q = document.getElementById("searchInput").value.trim();
      window.location.href = "category.html?search=" + encodeURIComponent(q);
    });
  }
}

function starHtml(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fa-star ${i <= Math.round(rating) ? "fa-solid" : "fa-regular"}"></i>`;
  }
  return html;
}

function productCardHtml(p) {
  const discount = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : 0;
  return `
  <div class="product-card">
    ${discount > 0 ? `<span class="discount-flag">${discount}% OFF</span>` : ""}
    <a href="product.html?id=${p.id}" class="product-thumb">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
    </a>
    <div class="product-info">
      <span class="product-cat">${p.subcategory}</span>
      <a href="product.html?id=${p.id}"><h4 class="product-name">${p.name}</h4></a>
      <div class="product-rating">${starHtml(p.rating)} <span style="color:var(--muted)">(${p.rating})</span></div>
      <div class="price-row">
        <span class="price-now">${formatINR(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatINR(p.oldPrice)}</span>` : ""}
      </div>
      <div class="product-actions">
        <button class="btn btn-dark" onclick="quickAddToCart('${p.id}')"><i class="fa-solid fa-cart-plus"></i> Add</button>
        <a href="product.html?id=${p.id}" class="btn btn-outline-dark" style="border:1.5px solid var(--navy);color:var(--navy);">View</a>
      </div>
    </div>
  </div>`;
}

function quickAddToCart(productId) {
  addToCart(productId, 1);
  showToast("Added to cart", "fa-cart-plus");
}

document.addEventListener("DOMContentLoaded", initHeader);
