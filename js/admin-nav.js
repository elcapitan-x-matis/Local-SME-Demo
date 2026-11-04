/* =============================================================
   Local SME — Shared Admin Navbar & Footer (demo)
   Injects the admin top navigation and footer into any page
   that has <body data-admin="true" data-root="../"> etc.
   ============================================================= */
(function () {
    'use strict';
    const root = document.body.dataset.root || '';

    const navHTML = `
<nav class="navbar sticky-top navbar-expand-md navbar-dark admin-nav">
  <div class="container-fluid px-3 px-md-5">
    <a class="navbar-brand" href="${root}admin/index.html">
      <img src="${root}icon/favicon.ico" width="40" height="40" alt="Logo">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavMenu" aria-controls="mainNavMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="mainNavMenu">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="${root}admin/index.html">
            <i class="bi bi-speedometer"></i>&nbsp;Dashboard
          </a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-shop"></i>&nbsp;Manage Store
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="${root}admin/customers/index.html"><i class="bi bi-people"></i>&nbsp;Customers</a>
            <a class="dropdown-item" href="${root}admin/orders/index.html"><i class="bi bi-box-seam"></i>&nbsp;Orders</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-table"></i>&nbsp;Manage Inventory
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="${root}admin/categories/index.html"><i class="bi bi-bookmark"></i>&nbsp;Category</a>
            <a class="dropdown-item" href="${root}admin/products/index.html"><i class="bi bi-bag"></i>&nbsp;Products</a>
            <hr class="dropdown-divider">
            <a class="dropdown-item" href="${root}admin/categories/add/index.html"><i class="bi bi-bookmark-plus"></i>&nbsp;New Category</a>
            <a class="dropdown-item" href="${root}admin/products/add/index.html"><i class="bi bi-bag-plus"></i>&nbsp;New Product</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person"></i>&nbsp;Admin User
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="${root}admin/account/index.html"><i class="bi bi-person-circle"></i>&nbsp;Account Details</a>
            <a class="dropdown-item" href="${root}admin/passwordupdate/index.html"><i class="bi bi-key"></i>&nbsp;Change Password</a>
          </div>
        </li>
      </ul>

      <form class="d-flex mt-3 mt-md-0" method="post" action="#">
        <a class="btn btn-pill-gold btn-block py-2" href="${root}admin/login/index.html" id="logout">
          <i class="bi bi-box-arrow-left me-1"></i>Sign Out
        </a>
      </form>
    </div>
  </div>
</nav>`;

    const footerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4 mb-4 mb-md-0">
        <h5 class="footer-heading">Quick Links</h5>
        <ul class="list-unstyled footer-links">
          <li><a href="${root}about/index.html"><i class="bi bi-info-circle"></i>About Us</a></li>
          <li><a href="${root}contact/index.html"><i class="bi bi-telephone"></i>Contact Us</a></li>
          <li><a href="mailto:onlinecatalgoue@email.com"><i class="bi bi-envelope"></i>onlinecatalgoue@email.com</a></li>
        </ul>
      </div>
      <div class="col-md-4 text-center mb-4 mb-md-0 d-flex flex-column justify-content-center">
        <img src="${root}icon/favicon.ico" width="40" height="40" class="mb-2 mx-auto" alt="Logo">
        <p class="footer-brand mb-1">LOCAL SME <span style="color:#edb400;">|</span> PNG</p>
        <p class="footer-copy mb-0">All Rights Reserved &copy; 2026</p>
      </div>
      <div class="col-md-4 text-md-end">
        <h5 class="footer-heading">Follow Us</h5>
        <ul class="list-unstyled footer-links">
          <li><a href="#"><i class="bi bi-facebook"></i>Facebook</a></li>
          <li><a href="#"><i class="bi bi-instagram"></i>Instagram</a></li>
          <li><a href="#"><i class="bi bi-twitter"></i>Twitter</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

<button onclick="topFunction()" id="scroll-btn" class="btn btn-circle scroll-btn" title="Go to top">
  <i class="bi bi-arrow-up-short"></i>
</button>

<div class="modal fade" id="systemAlertModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content order-modal-content" style="border:2px solid #edb400;">
      <div class="modal-header order-modal-header">
        <h5 class="modal-title" id="alertModalTitle"><i class="bi bi-info-circle me-2"></i>System Notice</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-center p-4">
        <div id="alertModalIcon" class="mb-3">
          <i class="bi bi-info-circle-fill" style="font-size:4rem;color:#3fa33d;"></i>
        </div>
        <h4 id="alertMsg" class="mb-0" style="color:#191919;font-weight:600;"></h4>
      </div>
      <div class="modal-footer justify-content-center border-0 pb-4">
        <button type="button" class="btn btn-pill-green px-5" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>`;

    // Inject nav before the container-fluid
    const container = document.querySelector('.container-fluid');
    if (container && document.body.dataset.admin === 'true') {
        container.insertAdjacentHTML('beforebegin', navHTML);
    }
    // Inject footer + modal at end of body
    if (document.body.dataset.admin === 'true') {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
})();