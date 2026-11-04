# Local SME — Static Demo

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=191919)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)

> **This is a static, front-end-only showcase** of the original **Local SME — Online Catalogue System**, a custom PHP MVC e-commerce platform built for local small and medium enterprises in Papua New Guinea.
>
> The original project's dynamic PHP logic, session handling, database connections, and server-side validation have been **replaced with hardcoded demo data and browser `localStorage`** so the entire experience can be explored without any backend.

🔗 **Original PHP + MySQL Repository:** [Klik-Maket (beta)](https://github.com/elcapitan-x-matis/Klik-Maket/tree/beta)

---

## 📋 Table of Contents

- [What This Demo Shows](#-what-this-demo-shows)
- [What's Different from the Original](#-whats-different-from-the-original)
- [Live Demo](#-live-demo)
- [Demo Accounts & Interactions](#-demo-accounts--interactions)
- [Design System Preserved](#-design-system-preserved)
- [Screenshots](#-screenshots)
- [Disclaimer](#-disclaimer)
- [Folder Structure](#-folder-structure)

---

## 🎯 What This Demo Shows

Every page of the original platform is reproduced 1:1 as a static HTML page, including:

### 🛍️ Customer Storefront
- **Home** — dark gradient hero, stats bar, category grid, featured products, CTA banners
- **Shop** — category filter sidebar, 8 product cards rendered from `data/products.json`
- **Product Detail** — image gallery, quantity stepper, add-to-cart / add-to-wishlist
- **Cart** — live quantity steppers, real-time subtotal recalculation, sticky order summary
- **Checkout** — delivery form with validation, order review table, "Place Order" demo flow
- **Wishlist** — saved items with remove + move-to-cart actions
- **Profile** — account details panel, order history with clickable receipt modals
- **Update Details / Change Password** — pre-filled forms with submit confirmation modals
- **About / Contact** — mission & vision, timeline, team, FAQ accordions, contact form
- **Login / Register** — themed auth cards with client-side validation

### 🛠️ Admin Panel
- **Admin Login** — gold accent variant of the customer login
- **Dashboard** — quick-action grid + session panel
- **Orders** — DataTable with 4 demo orders, colour-coded status pills
- **Order View** — customer & delivery info tiles, itemised receipt table, status update form
- **Customers** — DataTable of 4 registered users
- **Products** — DataTable of 8 catalogue items, Add / Edit / View routes
- **Categories** — DataTable of 4 categories, View shows linked products
- **Account & Change Password** — admin profile forms

---

## 🔄 What's Different from the Original

| Original (PHP MVC) | Static Demo |
| :--- | :--- |
| MySQL database | `data/products.json` + `localStorage` |
| PHP sessions for cart & wishlist | Browser `localStorage` via `js/demo-cart.js` |
| AJAX `$.post` to PHP controllers | Client-side modal feedback (`showSystemModal`) |
| Server-side form validation | HTML5 `required` + `checkValidity()` |
| `$_SESSION['customerID']` login gate | Hardcoded "logged in" state (Jane Doe) |
| PHP routing (`URLROOT/products/view/13`) | Pretty folder URLs (`product/index.html?id=13`) |
| Image uploads | Placeholder images + pre-loaded demo assets |
| Password hashing (SHA-1) | Not implemented — no real authentication |

Everything that *can* work client-side — cart badge counters, wishlist toggles, quantity steppers, category filters, modals, DataTables sorting/search, scroll-to-top, offcanvas navigation — **does work** exactly as it did on the original PHP platform.

---

## 🌐 Live Demo

**GitHub Pages:** `https://<your-username>.github.io/<repo-name>/`

> Add the live URL here after enabling GitHub Pages in your repository settings (Settings → Pages → Branch: `main` / `root`).

---

## 🧪 Demo Accounts & Interactions

| Feature | How to test |
| :--- | :--- |
| **Cart counter** | Click the green cart icon on any product card. Watch the badge in the offcanvas nav count up. |
| **Wishlist toggle** | Click the gold heart icon. Toggle again to remove. |
| **Category filter** | On `/shop/`, click any sidebar category (Food & Drink, Fashion, Home & Living, Services). |
| **Live cart totals** | On `/cart/`, adjust quantities with +/- or type a number — subtotal and grand total recalculate instantly. |
| **Checkout flow** | Add items → Cart → Checkout → enter city & address → Place Order → success modal → redirect to profile. |
| **Order modals** | On `/profile/`, click any "View" eye button on an order card. |
| **Admin DataTables** | On `/admin/products/`, `/admin/orders/`, `/admin/customers/`, `/admin/categories/` — try searching or sorting. |
| **Admin CRUD** | On `/admin/products/add/`, fill the form and submit → success modal → redirect. |
| **Admin login** | `/admin/login/` — any username + password works. |
| **Customer auth** | `/authentication/login/` or `/authentication/register/` — validation works client-side (register enforces matching passwords). |

> **Note:** Nothing you do in the demo is saved to a server. Cart and wishlist persist in your browser's `localStorage` across page loads, but clearing your browser data resets everything.

---

## 🎨 Design System Preserved

The static demo **reuses the original `custom.css` verbatim**. Nothing was re-themed — every class from the original PHP project still drives the same visual output:

| Token | Hex | Usage |
| :--- | :--- | :--- |
| Dark Charcoal | `#191919` | Navbars, footers, `.page-hero` backgrounds |
| Brand Gold | `#edb400` | Hero headlines, accent pills, primary highlights |
| Success Green | `#3fa33d` | Buttons, prices, positive states |
| Soft Blue | `#e8f2f9` | `.surface-card` surfaces |
| Danger Red | `#dc3545` | Delete buttons, error modals |

Typography (Quicksand), shadows, border radii (30px on cards, 40px on pill buttons), the circular icon buttons, the offcanvas nav, the DataTables overrides, and the `#systemAlertModal` — **all preserved**.

Full component reference is available in the original project's README.

---

## 📸 Screenshots

| Customer Storefront | Admin Dashboard |
| :--- | :--- |
| [Customs Home Page](screenshots/customer-home.png) | [Admin Dashboard](screenshots/admin-dashboard.png) |
| **Shop Catalogue** | **Product Management** |
| [Shop Landing Page](screenshots/customer-shop.png) | [Admin Products](screenshots/admin-products.png) |

---

## ⚠️ Disclaimer

This repository is a **read-only showcase** intended for portfolio purposes. It is **not a functioning store**. No orders are placed, no payments are processed, no user data is stored, and no products are actually for sale.

If you're interested in the real implementation — including the custom PHP MVC framework, PDO prepared statements, session-based authentication, and MySQL schema — see the [Klik-Maket (beta)](https://github.com/elcapitan-x-matis/Klik-Maket/tree/beta).

---

## 👤 Author

**Cytrus Kili**  
Original PHP MVC platform, design system, and static demo.

* Original repo: [Klik-Maket (beta)](https://github.com/elcapitan-x-matis/Klik-Maket/tree/beta)


## 📂 Folder Structure

```text
/
├── index.html                        # Home
├── data/
│   └── products.json                 # 8 demo products (single source of truth)
├── css/
│   └── custom.css                    # Original theme (unchanged)
├── js/
│   ├── custom.js                     # Modal handler + form demos
│   ├── demo-cart.js                  # localStorage cart/wishlist engine
│   ├── top-scroll.js                 # Scroll-to-top button
│   └── admin-nav.js                  # Shared admin navbar/footer injector
├── icon/
│   └── favicon.ico                   # Brand logo (green bag)
├── images/
│   ├── bg-texture.jpg                # Ambient texture
│   └── market.jpg                    # Shop hero + product photo
├── shop/index.html
├── product/index.html                # Template — use ?id=1…8
├── cart/index.html
├── checkout/index.html
├── wishlist/index.html
├── profile/
│   ├── index.html
│   ├── update/index.html
│   └── password/index.html
├── about/index.html
├── contact/index.html
├── authentication/
│   ├── login/index.html
│   └── register/index.html
└── admin/
    ├── index.html
    ├── login/index.html
    ├── orders/
    │   ├── index.html
    │   └── view/index.html
    ├── customers/index.html
    ├── products/
    │   ├── index.html
    │   ├── add/index.html
    │   ├── update/index.html
    │   └── view/index.html
    ├── categories/
    │   ├── index.html
    │   ├── add/index.html
    │   ├── update/index.html
    │   └── view/index.html
    ├── account/index.html
    └── passwordupdate/index.html

