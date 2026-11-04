/* =============================================================
   Local SME — Floating Quick Links (demo)
   Adds a floating "Admin Panel" button to customer pages
   and a "Back to Storefront" button to admin pages.
   ============================================================= */
(function () {
    'use strict';

    const root = document.body.dataset.root || '';
    const isAdmin = document.body.dataset.admin === 'true';

    // ---------- Customer pages → floating Admin shortcut ----------
    if (!isAdmin) {
        // Avoid double-injection
        if (document.getElementById('adminQuickLink')) return;

        const btn = document.createElement('a');
        btn.id = 'adminQuickLink';
        btn.href = root + 'admin/index.html';
        btn.className = 'quick-link-btn quick-link-admin';
        btn.title = 'Open Admin Panel (demo)';
        btn.setAttribute('aria-label', 'Open Admin Panel');
        btn.innerHTML = '<i class="bi bi-shield-lock-fill"></i>';
        document.body.appendChild(btn);
    }

    // ---------- Admin pages → floating Storefront shortcut ----------
    if (isAdmin) {
        if (document.getElementById('storeQuickLink')) return;

        const btn = document.createElement('a');
        btn.id = 'storeQuickLink';
        btn.href = root + 'index.html';
        btn.className = 'quick-link-btn quick-link-store';
        btn.title = 'Back to Storefront';
        btn.setAttribute('aria-label', 'Back to Storefront');
        btn.innerHTML = '<i class="bi bi-shop"></i>';
        document.body.appendChild(btn);
    }
})();