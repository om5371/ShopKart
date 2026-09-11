/* ============================================================
   ShopKart — Data Layer
   Categories, Subcategories & Products (prices in INR ₹)
   All images are real product photographs (Unsplash), no
   cartoons / illustrations / logos.
   ============================================================ */

const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "fa-mobile-screen-button",
    banner: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=70",
    subcategories: ["Mobiles", "Laptops", "Audio", "Cameras"]
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "fa-shirt",
    banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=70",
    subcategories: ["Men", "Women", "Watches"]
  },
  {
    id: "footwear",
    name: "Footwear",
    icon: "fa-shoe-prints",
    banner: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=70",
    subcategories: ["Sneakers", "Formal", "Sandals"]
  },
  {
    id: "home",
    name: "Home & Kitchen",
    icon: "fa-couch",
    banner: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=70",
    subcategories: ["Furniture", "Appliances", "Decor"]
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "fa-bag-shopping",
    banner: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=70",
    subcategories: ["Bags", "Sunglasses", "Jewelry"]
  }
];

/* Helper to build an Unsplash URL at a given width */
function img(id, w = 600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
}

const PRODUCTS = [
  // ---------------- ELECTRONICS : Mobiles ----------------
  {
    id: "p001", name: "AuraX Pro Smartphone (128GB)", category: "electronics", subcategory: "Mobiles",
    price: 24999, oldPrice: 29999, rating: 4.5, stock: 18,
    image: img("photo-1511707171634-5f897ff02aa9"),
    images: [img("photo-1511707171634-5f897ff02aa9"), img("photo-1585060544812-6b45742d762f"), img("photo-1592286927505-1def25115558")],
    description: "6.5\" AMOLED display, 128GB storage, 5000mAh battery, triple rear camera setup. A dependable everyday smartphone built for speed and long battery life."
  },
  {
    id: "p002", name: "Nordic Slim Smartphone (256GB)", category: "electronics", subcategory: "Mobiles",
    price: 34999, oldPrice: 38999, rating: 4.3, stock: 12,
    image: img("photo-1592750475338-74b7b21085ab"),
    images: [img("photo-1592750475338-74b7b21085ab"), img("photo-1580910051074-3eb694886505")],
    description: "Ultra-slim aluminium body with 256GB storage and a 120Hz display for smooth scrolling and gaming."
  },
  // ---------------- ELECTRONICS : Laptops ----------------
  {
    id: "p003", name: "CoreBook 14\" Laptop (i5, 16GB RAM)", category: "electronics", subcategory: "Laptops",
    price: 54999, oldPrice: 62999, rating: 4.6, stock: 9,
    image: img("photo-1496181133206-80ce9b88a853"),
    images: [img("photo-1496181133206-80ce9b88a853"), img("photo-1517336714731-489689fd1ca8"), img("photo-1541807084-5c52b6b3adef")],
    description: "14-inch FHD display, Intel i5 processor, 16GB RAM, 512GB SSD. Lightweight design perfect for work and study."
  },
  {
    id: "p004", name: "PixelBook Air 13\" Laptop", category: "electronics", subcategory: "Laptops",
    price: 71999, oldPrice: 79999, rating: 4.7, stock: 7,
    image: img("photo-1517336714731-489689fd1ca8"),
    images: [img("photo-1517336714731-489689fd1ca8"), img("photo-1498050108023-c5249f4df085")],
    description: "Fanless design, all-day battery, Retina-class display — built for creators on the move."
  },
  // ---------------- ELECTRONICS : Audio ----------------
  {
    id: "p005", name: "EchoBeat Wireless Headphones", category: "electronics", subcategory: "Audio",
    price: 3499, oldPrice: 4999, rating: 4.4, stock: 40,
    image: img("photo-1505740420928-5e560c06d30e"),
    images: [img("photo-1505740420928-5e560c06d30e"), img("photo-1546435770-a3e426bf472b"), img("photo-1484704849700-f032a568e944")],
    description: "Over-ear wireless headphones with active noise cancellation and 30-hour battery life."
  },
  {
    id: "p006", name: "PulsePods True Wireless Earbuds", category: "electronics", subcategory: "Audio",
    price: 1999, oldPrice: 2799, rating: 4.2, stock: 55,
    image: img("photo-1590658268037-6bf12165a8df"),
    images: [img("photo-1590658268037-6bf12165a8df"), img("photo-1590658165737-15a047b7d3a5")],
    description: "Compact true wireless earbuds with touch controls and a pocket-friendly charging case."
  },
  // ---------------- ELECTRONICS : Cameras ----------------
  {
    id: "p007", name: "Vistara DSLR Camera + 18-55mm Lens", category: "electronics", subcategory: "Cameras",
    price: 42999, oldPrice: 47999, rating: 4.8, stock: 6,
    image: img("photo-1516035069371-29a1b244cc32"),
    images: [img("photo-1516035069371-29a1b244cc32"), img("photo-1502920917128-1aa500764cbd"), img("photo-1502982720700-bfff97f2ecac")],
    description: "24MP APS-C sensor DSLR with kit lens — ideal for enthusiasts stepping up from a phone camera."
  },
  // ---------------- FASHION : Men ----------------
  {
    id: "p008", name: "Men's Classic Cotton Shirt", category: "fashion", subcategory: "Men",
    price: 899, oldPrice: 1299, rating: 4.1, stock: 60,
    image: img("photo-1602810318383-e386cc2a3ccf"),
    images: [img("photo-1602810318383-e386cc2a3ccf"), img("photo-1596755094514-f87e34085b2c")],
    description: "100% cotton regular-fit shirt, breathable fabric, available in classic solid colours."
  },
  {
    id: "p009", name: "Men's Slim Fit Denim Jacket", category: "fashion", subcategory: "Men",
    price: 2199, oldPrice: 2999, rating: 4.3, stock: 25,
    image: img("photo-1544022613-e87ca75a784a"),
    images: [img("photo-1544022613-e87ca75a784a"), img("photo-1551028719-00167b16eac5")],
    description: "Rugged washed-denim jacket with a slim tailored cut, perfect for layering."
  },
  // ---------------- FASHION : Women ----------------
  {
    id: "p010", name: "Women's Floral Summer Dress", category: "fashion", subcategory: "Women",
    price: 1499, oldPrice: 1999, rating: 4.4, stock: 34,
    image: img("photo-1595777457583-95e059d581b8"),
    images: [img("photo-1595777457583-95e059d581b8"), img("photo-1568252542512-9fe8fe9c87bb")],
    description: "Lightweight floral-print dress with a flattering A-line silhouette, great for daywear."
  },
  {
    id: "p011", name: "Women's Wool Blend Coat", category: "fashion", subcategory: "Women",
    price: 3299, oldPrice: 4499, rating: 4.6, stock: 15,
    image: img("photo-1539533018447-63fcce2678e3"),
    images: [img("photo-1539533018447-63fcce2678e3"), img("photo-1521572163474-6864f9cf17ab")],
    description: "Warm wool-blend overcoat with a tailored fit — a wardrobe staple for the colder months."
  },
  // ---------------- FASHION : Watches ----------------
  {
    id: "p012", name: "Chronotime Steel Analog Watch", category: "fashion", subcategory: "Watches",
    price: 4999, oldPrice: 6499, rating: 4.5, stock: 22,
    image: img("photo-1524592094714-0f0654e20314"),
    images: [img("photo-1524592094714-0f0654e20314"), img("photo-1524805444758-089113d48a6d"), img("photo-1495856458515-0637185db551")],
    description: "Stainless-steel analog watch with sapphire-coated crystal glass and 5ATM water resistance."
  },
  // ---------------- FOOTWEAR : Sneakers ----------------
  {
    id: "p013", name: "AirStride Running Sneakers", category: "footwear", subcategory: "Sneakers",
    price: 2799, oldPrice: 3499, rating: 4.5, stock: 48,
    image: img("photo-1542291026-7eec264c27ff"),
    images: [img("photo-1542291026-7eec264c27ff"), img("photo-1595950653106-6c9ebd614d3a"), img("photo-1600185365483-26d7a4cc7519")],
    description: "Breathable knit-upper running sneakers with cushioned midsole for daily training."
  },
  {
    id: "p014", name: "UrbanFlex Casual Sneakers", category: "footwear", subcategory: "Sneakers",
    price: 1999, oldPrice: 2599, rating: 4.2, stock: 37,
    image: img("photo-1560769629-975ec94e6a86"),
    images: [img("photo-1560769629-975ec94e6a86"), img("photo-1549298916-b41d501d3772")],
    description: "Everyday casual sneakers with a minimalist design that pairs well with any outfit."
  },
  // ---------------- FOOTWEAR : Formal ----------------
  {
    id: "p015", name: "Men's Leather Formal Shoes", category: "footwear", subcategory: "Formal",
    price: 2999, oldPrice: 3799, rating: 4.4, stock: 20,
    image: img("photo-1614252369475-531eba835eb1"),
    images: [img("photo-1614252369475-531eba835eb1"), img("photo-1449505278894-297fdb3edbc1")],
    description: "Genuine leather oxford shoes with a cushioned footbed for all-day office comfort."
  },
  // ---------------- FOOTWEAR : Sandals ----------------
  {
    id: "p016", name: "ComfortWalk Everyday Sandals", category: "footwear", subcategory: "Sandals",
    price: 899, oldPrice: 1299, rating: 4.0, stock: 50,
    image: img("photo-1603487742131-4160ec999306"),
    images: [img("photo-1603487742131-4160ec999306"), img("photo-1603808033192-082d6919d3e1")],
    description: "Lightweight everyday sandals with soft footbed cushioning and a non-slip sole."
  },
  // ---------------- HOME : Furniture ----------------
  {
    id: "p017", name: "Lumen 3-Seater Fabric Sofa", category: "home", subcategory: "Furniture",
    price: 24999, oldPrice: 32999, rating: 4.6, stock: 5,
    image: img("photo-1555041469-a586c61ea9bc"),
    images: [img("photo-1555041469-a586c61ea9bc"), img("photo-1567016432779-094069958ea5")],
    description: "Plush 3-seater sofa with a sturdy hardwood frame and stain-resistant fabric upholstery."
  },
  {
    id: "p018", name: "Oakridge Wooden Study Table", category: "home", subcategory: "Furniture",
    price: 6999, oldPrice: 8999, rating: 4.3, stock: 14,
    image: img("photo-1518455027359-f3f8164ba6bd"),
    images: [img("photo-1518455027359-f3f8164ba6bd"), img("photo-1519947486511-46149fa0a254")],
    description: "Solid-wood study table with a spacious top and built-in drawer for storage."
  },
  // ---------------- HOME : Appliances ----------------
  {
    id: "p019", name: "BrewMax Stand Mixer", category: "home", subcategory: "Appliances",
    price: 8999, oldPrice: 10999, rating: 4.5, stock: 16,
    image: img("photo-1585515320310-259814833e62"),
    images: [img("photo-1585515320310-259814833e62"), img("photo-1556909212-d5b604d0c90d")],
    description: "600W stand mixer with multiple speed settings and a stainless-steel mixing bowl."
  },
  {
    id: "p020", name: "FrostAir Mini Refrigerator (50L)", category: "home", subcategory: "Appliances",
    price: 9499, oldPrice: 11499, rating: 4.2, stock: 11,
    image: img("photo-1571175443880-49e1d25b2bc5"),
    images: [img("photo-1571175443880-49e1d25b2bc5"), img("photo-1584568694244-14fbdf83bd30")],
    description: "Compact 50L mini fridge, ideal for personal spaces, dorm rooms and offices."
  },
  // ---------------- HOME : Decor ----------------
  {
    id: "p021", name: "Terra Ceramic Vase Set (3-pc)", category: "home", subcategory: "Decor",
    price: 1299, oldPrice: 1799, rating: 4.4, stock: 30,
    image: img("photo-1578500494198-246f612d3b3d"),
    images: [img("photo-1578500494198-246f612d3b3d"), img("photo-1578500351865-e378908ecb69")],
    description: "Set of 3 handcrafted ceramic vases in earthy tones to accent any tabletop or shelf."
  },
  // ---------------- ACCESSORIES : Bags ----------------
  {
    id: "p022", name: "Voyage Leather Handbag", category: "accessories", subcategory: "Bags",
    price: 2499, oldPrice: 3299, rating: 4.5, stock: 26,
    image: img("photo-1584917865442-de89df76afd3"),
    images: [img("photo-1584917865442-de89df76afd3"), img("photo-1548036328-c9fa89d128fa"), img("photo-1591561954557-26941169b49e")],
    description: "Genuine leather handbag with adjustable strap and multiple interior compartments."
  },
  {
    id: "p023", name: "TrailPack 30L Travel Backpack", category: "accessories", subcategory: "Bags",
    price: 1899, oldPrice: 2499, rating: 4.6, stock: 33,
    image: img("photo-1553062407-98eeb64c6a62"),
    images: [img("photo-1553062407-98eeb64c6a62"), img("photo-1622560480605-d83c853bc5c3")],
    description: "Water-resistant 30L backpack with padded laptop sleeve, ideal for travel and daily commute."
  },
  // ---------------- ACCESSORIES : Sunglasses ----------------
  {
    id: "p024", name: "Horizon Polarized Sunglasses", category: "accessories", subcategory: "Sunglasses",
    price: 1199, oldPrice: 1599, rating: 4.3, stock: 45,
    image: img("photo-1572635196237-14b3f281503f"),
    images: [img("photo-1572635196237-14b3f281503f"), img("photo-1511499767150-a48a237f0083")],
    description: "UV400 polarized lenses with a lightweight acetate frame for everyday sun protection."
  },
  // ---------------- ACCESSORIES : Jewelry ----------------
  {
    id: "p025", name: "Aurelia Sterling Silver Necklace", category: "accessories", subcategory: "Jewelry",
    price: 1799, oldPrice: 2399, rating: 4.7, stock: 19,
    image: img("photo-1599643478518-a784e5dc4c8f"),
    images: [img("photo-1599643478518-a784e5dc4c8f"), img("photo-1611591437281-460bfbe1220a")],
    description: "925 sterling silver pendant necklace with a delicate chain — a timeless everyday piece."
  }
];

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
function getCategory(catId) {
  return CATEGORIES.find(c => c.id === catId);
}
function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}
