/* =============================================================
   Local SME — Demo Cart & Wishlist Engine (localStorage)
   Replaces all PHP/AJAX cart & wishlist calls for the static demo.
   ============================================================= */
(function () {
    'use strict';

    const CART_KEY = 'localSme_cart';
    const WISH_KEY = 'localSme_wishlist';

    // ---------- Storage helpers ----------
    function readCart() {
        try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
        catch (e) { return {}; }
    }
    function writeCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadge();
    }
    function readWish() {
        try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
        catch (e) { return []; }
    }
    function writeWish(list) {
        localStorage.setItem(WISH_KEY, JSON.stringify(list));
        updateWishlistBadge();
    }

    // ---------- Counters ----------
    function totalCartItems() {
        const cart = readCart();
        return Object.values(cart).reduce((sum, q) => sum + Number(q), 0);
    }

    function updateCartBadge() {
        const count = totalCartItems();
        document.querySelectorAll('[data-cart-badge]').forEach(function (el) {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    function updateWishlistBadge() {
        const count = readWish().length;
        document.querySelectorAll('[data-wish-badge]').forEach(function (el) {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    // ---------- Public API (used by custom.js) ----------
    window.DemoCart = {
        add: function (productId, qty) {
            qty = Number(qty) || 1;
            const cart = readCart();
            cart[productId] = (cart[productId] || 0) + qty;
            writeCart(cart);
        },
        remove: function (productId) {
            const cart = readCart();
            delete cart[productId];
            writeCart(cart);
        },
        setQty: function (productId, qty) {
            const cart = readCart();
            qty = Number(qty);
            if (qty <= 0) { delete cart[productId]; }
            else { cart[productId] = qty; }
            writeCart(cart);
        },
        get: function (productId) { return readCart()[productId] || 0; },
        all: readCart,
        count: totalCartItems,
        clear: function () { writeCart({}); },

        wishAdd: function (productId) {
            const list = readWish();
            const id = Number(productId);
            if (!list.includes(id)) {
                list.push(id);
                writeWish(list);
                return true;   // newly added
            }
            return false;      // already there
        },
        wishRemove: function (productId) {
            const id = Number(productId);
            const list = readWish().filter(x => x !== id);
            writeWish(list);
        },
        wishToggle: function (productId) {
            const id = Number(productId);
            const list = readWish();
            if (list.includes(id)) { this.wishRemove(id); return false; }
            this.wishAdd(id); return true;
        },
        wishHas: function (productId) { return readWish().includes(Number(productId)); },
        wishAll: readWish,
        wishCount: function () { return readWish().length; },
    };

    // ---------- Auto-refresh badges on load ----------
    document.addEventListener('DOMContentLoaded', function () {
        updateCartBadge();
        updateWishlistBadge();
    });
})();